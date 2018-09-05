# blockchain_project
Blockchain Cryptocurrency Project for Practice

# Purpose/Understanding
To create blockchain functionality and tests in order to understand functionality and behavior of blockchain.

Blockchain is a digital ledger without centralization and is distributed across connected nodes in a network. Public peers have the capability to add on to ledger, keeping all peers updated with most recent blocks. When adding new blocks, longest chain wins.

Cryptocurrency! Step over, bitcoin. Three main components:
- wallet objects
- keys for digital signatures and verification (private and public)
- transaction objects to represent currency exchange

# Running the code
First instance:
 ```
 npm run dev
 ```
Second instance (adding a peer server, referencing existing peer):
```
HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
```
Third instance (you get the gist):
```
HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
```

# Things to Install

JavaScript library of crypto standards
```
npm i crypto-js --save
```
Testing
```
npm i jest --save-dev
```
Express framework
```
npm i express --save
```
Node.js body parsing middleware
```
npm i body-parser --save
```
Web Sockets
```
npm i ws --save
```
Elliptic (provides private, public key generation for cryptocurrency)
```
npm i elliptic --save
```
UUID for unique transaction ID creation
```
npm i uuid --save
```

# Running the tests
```
npm run test
```
```
npm run dev-test
```

# Accomplishments/Tasks Completed
- Unit tests for each new function or class
- Block class with constructor containing, timestamp, lastHash, current hash, data and (later) nonce
- Blockchain class allowing new blocks to be added, but validated (checks to ensure genesis block, if last blocks are the same), allows chain to be replaced if the received chain is not longer than the current chain
- Set up API for GET and POST for new blocks (using Postman as interface)
- Set up peer-to-peer servers, allowing peers to contribute to the decentralized blockchain (given the classes in place)
- Add in Difficulty and nonce (number only used once) attribute for mining purposes - keeping the blockchain safe from being hacked
- Added ability for difficulty to adjust to number of miners (comparing time between blocks added timestamps)

- Create Wallet class for cryptocurrency
- Create a Transaction class for... transactions
- Allow transactions to have multiple outputs/be updated
- Create transaction pool for multiple users to submit new blocks
- Calculate accurate wallet balances after transactions take place

# Notes on Proof of Work System
- A system that requires miners to do computational work to add blocks.
- Any peer can replace the blockchain.
- The proof-of-work makes it expensive to generate corrupt chains.
- Manageable to submit one block, unproductive to generate an entire chain.

# Glossary of common terms
- **chain linking**: Chain linking is the process of connecting two blockchains with each other, thus allowing transactions between the chains to take place. This will allow blockchains like Bitcoin to communicate with other sidechains, allowing the exchange of assets between them
- **mining**: Mining is the process of adding transaction records to the cryptocurrency's public ledger of past transactions or blockchain. This ledger of past transactions is called the blockchain as it is a chain of blocks. The blockchain serves to confirm transactions to the rest of the network as having taken place. Cryptocurrency nodes use the blockchain to distinguish legitimate Bitcoin transactions from attempts to re-spend coins that have already been spent elsewhere. Mining is intentionally designed to be resource-intensive and challenging so that the number of blocks found each day by miners remains steady
- **mining difficulty**: Measures how hard it would be to find the next block. (Proof of work difficulty is defined by leading zeros)
- **nonce**: A nonce ("number only used once") is a number added to a hashed block that, when rehashed, meets the difficulty level restrictions. The nonce is the number that blockchain miners are solving for.
- **51% Attack**: If a dishonest miner has more than at least 51% of the network's power, thus adding its own dirty block. But it's really difficult/expensive to do so.
- **wallet**: As it relates to cryptocurrency, wallets store the balance of an individual with a private key (used to generate signatures) and public key (used to verify signatures and the public address).
- **transactions**: Includes input (timestamp, balance, signature, public key), output (amount, address), another output (amount, address sent to SELF with resulting balance after transaction)
- **digital signatures**: Based on private and public keys. Private key uses hash values to create new signature, which can be checked against public key.
