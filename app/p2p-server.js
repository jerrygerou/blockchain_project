// Peer to Peer server
// Installed web sockets module with `npm i ws --save`

const Websocket = require('ws');

// Peer to peer port
// If process has an environment variable for P2P_PORT, use that.
// Otherwise, use 5001.
const P2P_PORT = process.env.P2P_PORT || 5001;

// Has the peer defined environment variable?
// If so split up peers in an array, separated by commas.
// If not, sets empty array.
const peers =process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGE_TYPES = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
  clear_transactions: 'CLEAR_TRANSACTIONS'
};

// Combines all peers environment variables with string
// This will define a new port, a peer port and the peer location already open
// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

// [nodemon] starting `node ./app`
// Listening for peer-to-perr connections on: 5002
// Listening on port 3002
// Socket connected. Socket to me.

// Can then open a new tab and create another peer, giving new ports
// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
// [nodemon] starting `node ./app`
// Listening for peer-to-perr connections on: 5003
// Listening on port 3003
// Socket connected. Socket to me.
// Socket connected. Socket to me.

class P2pServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.sockets = [];
  }

  // listen() starts up server and creates Websocket
  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    // listening for a connection event
    server.on('connection', socket => this.connectSocket(socket));

    this.connectToPeers();

    console.log(`Listening for peer-to-perr connections on: ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach(peer => {
      // Address of peer
      // ws://localhost:5001
      // creates new socket object
      const socket = new Websocket(peer);

      // Can run even if someone else is on first
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  // pushes socket ot the array of sockets
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected. Socket to me.');

    this.messageHandler(socket);

    this.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on('message', message => {
      // Transform stringified JSON to javascript object
      const data = JSON.parse(message);
      switch(data.type) {
        case MESSAGE_TYPES.chain:
          // Sync chains from peers
          this.blockchain.replaceChain(data.chain);
          break;
        case MESSAGE_TYPES.transaction:
          this.transactionPool.updateOrAddTransaction(data.transaction);
          break;
        case CLEAR_TRANSACTIONS.clear_transactions:
          this.transactionPool.clear();
          break;
      }
    });
  }

  // helper function
  sendChain(socket) {
    socket.send(JSON.stringify({
      type: MESSAGE_TYPES.chain,
      chain: this.blockchain.chain
    }));
  }

  sendTransaction(socket, transaction) {
    socket.send(JSON.stringify({
      type: MESSAGE_TYPES.transaction,
      transaction
    }));
  }

  // Send updated blockchain to all peers
  syncChains() {
    this.sockets.forEach(socket => this.sendChain(socket));
  }

  // Sends one transaction to everyone
  broadcastTransaction(transaction) {
    this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
  }

  broadcastClearTransactions() {
    this.sockets.forEach(socket => socket.send(JSON.stringify({
      type: MESSAGE_TYPES.clear_transactions
    })));
  }
}

module.exports = P2pServer;
