pragma solidity ^0.6.6;

import '@openzeppelin/contracts/access/Ownable.sol';

contract ERC827PROXY is Ownable{
  
  function call(address callee,string memory signature,bytes memory params) public onlyOwner
  returns(bool)
  {
       require(callee != owner() && callee != address(this) ,'Error: recursive call ,contract cant call itself');
       bytes memory payload=abi.encodeWithSignature(signature,params);
       (bool sent,)= address(callee).call(payload);
       return sent;
  }
}