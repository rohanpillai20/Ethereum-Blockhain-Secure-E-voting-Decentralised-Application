# Ethereum-Blockhain-Secure-E-voting-Decentralised-Application

The project aims at developing a decentralized voting system where people can vote for their representative candidates. The project has been developed using the fundamentals of ethereum smart contract and blockchain. A voting smart contract is the foundation of the project and combined with blockchain, the voting system is more secure than any current voting mechanisms.<br>
Technology Used: Ethereum Smart Contract, Blockchain<br>
Tools Used: Ganache CLI, Node.js, Web3.js, Solidity<br>


## Requirements
Ganache<br>
Geth<br>
Node.js<br>
Web3.js<br>

## Working
[![Working.png](https://i.postimg.cc/VL1WSpy8/1.png)](https://postimg.cc/3WSvVLJS)<br>
Source: https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2

## Implementation
1. Save this directory somewhere and remember to open the below cmd prompts in this folder only.
2. Open a cmd prompt and type `ganache-cli` to activate [Ganache] with 10 unlocked free preloaded accounts.
3. Open another cmd prompt and type `node` to activate Node.js.
4. Type the following commands in the `node` prompt:
```
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('Election.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)
```
5. This will have compiled your code, to run and deploy your contract, execute the following commands linearly in the same prompt:
```
abiDefinition = JSON.parse(compiledCode.contracts[':Election'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Election'].bytecode
deployedContract = VotingContract.new({data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
contractInstance = VotingContract.at(deployedContract.address)
```
6. To know the address of the deployed contract, use
```
contractInstance.address
```
and put the result in index.js (Line 9)

7. To vote for a candidate using Command Line, use
```
contractInstance.vote('Tom', {from: web3.eth.accounts[0]})
```

8. In order to vote for a candidate using a Web Browser, open index.html
9. Choose a candidate.
10. A prompt will appear asking you your account index (out of the 10 preloaded Ganache accounts).
11. You have voted successfully. Check the Ganache CLI cmd to view the added block in the blockchain.
12. In order to view the count of the candidates change the date (Line 12) in index.js, refresh the browser and press count. The vote button will disable itself and the winner button will be enabled. Currently, the program does not handle a tie between candidates and displays the first candidate out of the tied ones. Later some functionality can be added to deal with the same.

[Ganache]: https://github.com/trufflesuite/ganache
