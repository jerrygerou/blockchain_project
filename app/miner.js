class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  // Mine method will:
    // - grab transactions from pool
    // - take transactions and make block
    // - then tells p2pServer to sync
    // - then clears transaction pool
  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    // include a reward for the miner
    // creeate a block consisting of valid transactions
    // synchronize the chains in peer-to-peer server
    // clear transaction pool
    // broadcast to every miner to clear their transactions pools
  }
}

module.exports = Miner;
