// Elliptic cryptography
const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
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

  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  static verifySignature(publicKey, signature, dataHash) {
    // Elliptic has a built in verification, returning boolean
    return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
  }
}

module.exports = ChainUtil;
