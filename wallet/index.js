const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const { INITIAL_BALANCE } = require('../config');

class Wallet {
  constructor() {
    // for the sake of testing, give an itial balance
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    // ChainUtil creates the public key, then encode with hexi-decimal
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet -
      publicKey: ${this.publicKey.toString()}
      balance  : ${this.balance}`
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recipient, amount, blockchain, transactionPool) {
    this.balance = this.calculateBalance(blockchain);

    if (amount > this.balance) {
      console.log(`Amount: ${amount} exceeds the current balance: &{this.balance}`);
        return;
    }

    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this, recipient, amount)
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }

  calculateBalance(blockchain) {
    // needs to look at most recent transaction and compare to wallet balance
    let balance = this.balance;
    let transactions = [];

    // need to look through each block and also each transaction
    blockchain.chain.forEach(block => block.data.forEach(transaction => {
      transactions.push(transaction);
    }));

    const walletInputTs = transactions
      .filter(transaction => transaction.input.address === this.publicKey);

    let startTime = 0;

    if (walletInputTs.length > 0) {
      const recentInputT = walletInputTs.reduce(
        // looks at timestamp of each transaction to return the one that is higher, most recent
        (prev, current) => prev.input.timestamp > current.input.timestamp ? prev : current
      );

      balance = recentInputT.outputs.find(output => output.address === this.publicKey).amount;
      startTime = recentInputT.input.timestamp;
    }

    transactions.forEach(transaction => {
      if (transaction.input.timestamp > startTime) {
        transaction.outputs.find(output => {
          if (output.address === this.publicKey) {
            balance += output.amount;
          }
        })
      }
    });

    return balance
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }
}

module.exports = Wallet;
