
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//abi = JSON.parse('[ { constant: true,inputs: [Array],name: \'totalVotesFor\',outputs: [Array],payable: false,stateMutability: \'view\',type: \'function\' },{ constant: true,inputs: [Array],name: \'validCandidate\',outputs: [Array],payable: false,stateMutability: \'view\',type: \'function\' },{ constant: true,inputs: [Array],name: \'votesReceived\',outputs: [Array],payable: false,stateMutability: \'view\',type: \'function\' },{ constant: true,inputs: [Array],name: \'candidateList\',outputs: [Array],payable: false,stateMutability: \'view\',type: \'function\' },{ constant: false,inputs: [Array],name: \'voteForCandidate\',outputs: [],payable: false,stateMutability: \'nonpayable\',type: \'function\' },{ inputs: [Array],payable: false,stateMutability: \'nonpayable\',type: \'constructor\' } ],totalVotesFor:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],bytes32: [Circular] },validCandidate:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],bytes32: [Circular] },votesReceived:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],bytes32: [Circular] },candidateList:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],uint256: [Circular] },voteForCandidate:{ [Function: bound ]request: [Function: bound ],call: [Function: bound ],sendTransaction: [Function: bound ],estimateGas: [Function: bound ],getData: [Function: bound ],bytes32: [Circular] },allEvents: [Function: bound ]')


abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')

var votedOrNot=[]

VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x0c45546523fd43693e91a83ef60529a2ac2e559f');
candidates = {"Bill": "candidate-1", "Tom": "candidate-2", "Janice": "candidate-3"}

function voteForCandidate() {
  var account = prompt("Please enter your registered number");
  //var account = 0;
  if(account in votedOrNot){
	  alert("You have already voted");
  }else{
	  votedOrNot.push(account);
	  var e = document.getElementById("candidate").value;
	  candidateName = e;
	  //candidateName = $("#candidate").val();
	contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[account]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
  }
  
 console.log(votedOrNot)
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];	
	let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});
/*

(() => {
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const interface = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]');
const VotingContract = web3.eth.contract(interface);
const contractInstance = VotingContract.at('0x2f8ab4c0be9cf788891afc42aca978e970d409a2');

// Default account is used if you don't specify from in function call.
//web3.eth.defaultAccount = web3.eth.accounts[0];
web3.personal.unlockAccount(web3.eth.accounts[0], '0x6f59064197812aee1ba001f7d49304c259594b0a1c02e8c2fa2f1d0ad0bf6297', 0);

const tableElem = document.getElementById("table-body");
const candidateOptions = document.getElementById("candidate-options");
const voteForm = document.getElementById("vote-form");

function handleVoteForCandidate(evt) {
  const candidate = new FormData(evt.target).get("candidate");
  contractInstance.voteForCandidate(candidate, {from: web3.eth.accounts[0]}, function() {
    const votes = contractInstance.totalVotesFor.call(candidate);

    // Updates the vote element.
    document.getElementById("vote-" + candidate).innerText = votes;
  });
}

voteForm.addEventListener("submit", handleVoteForCandidate, false);

function populateCandidates() {
  const candidateList = contractInstance.getCandidateList.call(); // call() is used for sync read only calls.
  candidateList.forEach((candidate) => {
    const candidateName = web3.toUtf8(candidate);
    const votes = contractInstance.totalVotesFor.call(candidate);
    
    // Creates a row element.
    const rowElem = document.createElement("tr");

    // Creates a cell element for the name.
    const nameCell = document.createElement("td");
    nameCell.innerText = candidateName;
    rowElem.appendChild(nameCell);

    // Creates a cell element for the votes.
    const voteCell = document.createElement("td");
    voteCell.id = "vote-" + candidate; 
    voteCell.innerText = votes;
    rowElem.appendChild(voteCell);

    // Adds the new row to the voting table.
    tableElem.appendChild(rowElem);

    // Creates an option for each candidate
    const candidateOption = document.createElement("option");
    candidateOption.value = candidate;
    candidateOption.innerText = candidateName;
    candidateOptions.appendChild(candidateOption);
  });
}

populateCandidates();
})();*/