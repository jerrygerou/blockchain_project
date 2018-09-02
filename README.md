# blockchain_project
Blockchain Cryptocurrency Project for Practice

# Purpose
To create blockchain functionality and tests in order to understand functionality and behavior of blockchain.

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

# Running the tests
```
npm run test
```
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
