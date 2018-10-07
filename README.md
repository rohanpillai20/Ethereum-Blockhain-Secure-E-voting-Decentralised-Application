# Ethereum-Blockhain-Secure-E-voting-Decentralised-Application

The project aims at developing a decentralized voting system where people can vote for their representative candidates. The project has been developed using the fundamentals of ethereum smart contract and blockchain. A voting smart contract is the foundation of the project and combined with blockchain, the voting system is more secure than any current voting mechanisms.
Technology Used: Ethereum Smart Contract, Blockchain, Ganache, MetaMask, Remix IDE 

The project is currently under development. It will be regularly updated.

## Requirements
To be updated soon.


## Implementation
1. Save this directory somewhere and remeber to open the below cmd prompts in this folder only.
2. Open a cmd prompt and type `ganache-cli` to activate [Ganache] with 10 unlocked free preloaded accounts.
3. Open another cmd prompt and type `node` to activate Node.js.
4. Type the following commands in the `node` prompt:
```
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('Voting.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
```
5. This will have compiled your code, to run and deploy your contraxct, execute the following commands linearly in the same prompt:
```
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':voting'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':voting'].bytecode
deployedContract = VotingContract.new(['Bill','Tom','Janice'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
contractInstance = VotingContract.at(deployedContract.address)
```
6. To know the votes for a particular candidate, use
```
contractInstance.totalVotesFor.call('Bill').toLocaleString()
```
7. To vote for a candidate, use
```
contractInstance.voteForCandidate('Tom', {from: web3.eth.accounts[0]})
```
[Ganache]: https://github.com/trufflesuite/ganache
