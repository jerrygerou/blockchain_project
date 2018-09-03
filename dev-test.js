// TEST BLOCK STRINGS
// const Block = require('./block');

// const block = new Block('foo', 'bar', 'zoo', 'baz');
// console.log(block.toString());
// console.log(Block.genesis().toString());

// const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
// console.log(fooBlock.toString());

///_____________________________________________________

// TEST BLOCKCHAIN DIFFICULTY ADJUSTMENTS
// const Blockchain = require('./blockchain');
//
// const bc = new Blockchain()
//
// // Adding 10 blocks to the chain
// // Proof of work to see difficulty changing, etc
// for (let i=+1; i<10; i++) {
//   console.log(bc.addBlock(`foo ${i}`).toString());
// }

///_____________________________________________________

// TEST WALLET CONTENTS
const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());
