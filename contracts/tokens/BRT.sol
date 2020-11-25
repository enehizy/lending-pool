pragma solidity ^0.6.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';


contract BRT is ERC20{
    
    constructor(address brtPoolAddr) public ERC20('Borrowed Token','BRT'){
      _mint(brtPoolAddr,1000000000 * uint(10 ** 18));
    }
    function approveAndCall(address spender, uint256 amount,string memory signature,bytes memory params) public returns (bool) {
       approve(spender,amount);
       bytes memory payload=abi.encodeWithSignature(signature,params,msg.sender);
       (bool sent,bytes memory results)= spender.call(payload);
       require(sent,'Error:contract call failed');
      return sent;
    }


    


  

}