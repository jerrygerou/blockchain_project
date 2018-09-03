class { INITIAL_BALANCE } = require('../config');

class Wallet {
  constructor() {
    // for the sake of testing, give an itial balance
    this.balance = INITIAL_BALANCE;
    this.keyPair = null;
    this.publicKey = null;
  }

  toString() {
    return `Wallet -
      publicKey: ${this.publicKey.toString()}
      balance  : ${this.balance}`
  }
}

module.exports = Wallet;
