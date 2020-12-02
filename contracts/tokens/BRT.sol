pragma solidity ^0.6.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './ERC827PROXY.sol';

contract BRT is ERC20{
    ERC827PROXY proxy;
    constructor(address addr) public ERC20('Borrowed Token','BRT'){
      _mint(addr,1000000000 * uint(10 ** 18));
      ERC827PROXY _proxy=new ERC827PROXY();
      proxy =  ERC827PROXY(address(_proxy));
    }
    event ApprovalAndCall(address spender,bool success);

    function approveAndCall(address spender, uint256 amount,string memory signature,bytes memory params) public
     returns(bool) {
      
       approve(spender,amount);
       bool sent=proxy.call(spender,signature,params);
       require(sent,'Error contract call failed');
      //  bytes memory payload=abi.encodeWithSignature(signature,params,msg.sender);
      
      //  (bool sent,)= address(spender).call(payload);
      //  require(sent,'Error:contract call failed');
       emit ApprovalAndCall(spender,sent);
       return sent;
    }


    


  

}