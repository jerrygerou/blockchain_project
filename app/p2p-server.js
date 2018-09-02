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
// $ HHTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  // listen() starts up server and creates Websocket
  listen() {
    const server = new.Websocket.Server({ port: P2P_PORT });
    // listening for a connection event
    server.on('connection', server => this.connectSocket(socket));
    console.log(`Listening for peer-to-perr connections on: ${P2P_PORT}`);
  }

  // pushes socket ot the array of sockets
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected. Socket to me.');
  }
}
