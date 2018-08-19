const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length-1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    // checks to see if the first block in incoming chain is genesis block
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    // checks to see if last blocks are the same
    for (let i=1; i<chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1];

      if (block.lastHash !== lastBlock.hash ||
          block.hash !== Block.blockHash(block)) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
