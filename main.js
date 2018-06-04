const SHA256 = require('crypto-js/sha256');
class Block {
	constructor(timestamp, data, previousHash = '') {
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
	}
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		const genesisBlock = new Block('01/01/2017', 'Genesis block', "0");
		return genesisBlock;
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
}

let coin = new Blockchain();

coin.addBlock(new Block(new Date(), { amount: 4 }));
coin.addBlock(new Block(new Date(), { amount: 10 }));

console.log(JSON.stringify(coin, null, 4));