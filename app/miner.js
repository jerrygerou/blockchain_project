const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

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
    validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
    // creeate a block consisting of valid transactions
    const block = this.blockchain.addBlock(validTransactions);
    // synchronize the chains in peer-to-peer server
    this.p2pServer.syncChains();
    // clear transaction pool
    this.transactionPool.clear();
    // broadcast to every miner to clear their transactions pools
    this.p2pServer.broadcastClearTransactions();

    return block;
  }
}

module.exports = Miner;
