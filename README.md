# blockchain_project
Blockchain Cryptocurrency Project for Practice

# Purpose
To create blockchain functionality and tests in order to understand functionality and behavior of blockchain.

# Notes on Proof of Work System
- A system that requires miners to do computational work to add blocks.
- Any peer can replace the blockchain.
- The proof-of-work makes it expensive to generate corrupt chains.
- Manageable to submit one block, unproductive to generate an entire chain.

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
