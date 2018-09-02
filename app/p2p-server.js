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

// Combines all peers environment variables with string
// This will define a new port, a peer port and the peer location already open
// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

// [nodemon] starting `node ./app`
// Listening for peer-to-perr connections on: 5002
// Listening on port 3002
// Socket connected. Socket to me.

// Can then open a new tab and create another peer
// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
// [nodemon] starting `node ./app`
// Listening for peer-to-perr connections on: 5003
// Listening on port 3003
// Socket connected. Socket to me.
// Socket connected. Socket to me.

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
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

    socket.send(JSON.stringify(this.blockchain.chain));
  }

  messageHandler(socket) {
    socket.on('message', message => {
      // Transform stringified JSON to javascript object
      const data = JSON.parse(message);
      console.log('data', data);
    });
  }
}

module.exports = P2pServer;
