// Elliptic cryptography
const EC = require('elliptic').ec;
// Ability to gernate unique IDs for transactions
const uuidV1 = require('uuid/v1');
// Creates instance using implementation bitcoin uses, secp256k1
const ec = new EC('secp256k1');

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }
  static id() {
    return uuidV1();
  }
}

module.exports = ChainUtil;
