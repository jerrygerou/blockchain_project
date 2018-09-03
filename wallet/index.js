const ChainUtil = require('../chain-util');
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
}

module.exports = Wallet;
