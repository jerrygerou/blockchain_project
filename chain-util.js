// Elliptic cryptography
const EC = require('elliptic').ec;
// Creates instance using implementation bitcoin uses, secp256k1
const ec = new EC('secp256k1');

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }
}

module.exports = ChainUtil;
