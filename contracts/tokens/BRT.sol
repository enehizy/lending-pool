pragma solidity ^0.6.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';


contract BRT is ERC20{
    
    constructor(address brtPoolAddr) public ERC20('Borrowed Token','BRT'){
      _mint(brtPoolAddr,1000000000 * uint(10 ** 18));
    }

   

}