const SHA256 = require('crypto-js/sha256');

class Block {
	constructor(timestamp, data, previousHash = '') {
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		// Required for proof of work
		// this.nonce = 0;
	}

	calculateHash() {
		return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
		// Required for proof of work
		// return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();
	}

	// Required for proof of work
	// mineBlock(difficulty) {
	// 	while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
	// 		this.nonce++;
	// 		this.hash = this.calculateHash();
	// 	}

	// 	console.log('Block mined:::', this.hash);
	// }
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		// Required for proof of work
		// this.difficulty = 2;
	}

	createGenesisBlock() {
		const genesisBlock = new Block('01/01/2019', 'Genesis block', "0");
		return genesisBlock;
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		// Required for proof of work
		// newBlock.mineBlock(this.difficulty);
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid() {
		for(let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;		
	}
}

const rajdeepCoin = new Blockchain();

console.log('Mining block 1:::');
rajdeepCoin.addBlock(new Block(new Date(), { amount: 25 }));

console.log('Mining block 2:::');
rajdeepCoin.addBlock(new Block(new Date(), { amount: 100 }));

// Block chain holding the ledger for rajdeepCoin
console.log(JSON.stringify(rajdeepCoin, null, 4));

console.log('Block chain valid?', rajdeepCoin.isChainValid());
rajdeepCoin.chain[1].data = { amount: 250 };
rajdeepCoin.chain[1].hash = rajdeepCoin.chain[1].calculateHash();
console.log('Block chain valid?', rajdeepCoin.isChainValid());