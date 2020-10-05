pragma solidity ^0.6.0;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';





//sorry for the confusing name
//this is an ERC721 token that represents the loan and its parameters ,
// it is an expiring token that can be used to recliam collateral used to,secure loan

contract EtherBackedCollateral is ERC721{
    struct Collateral{
        uint redemptionPrice;
        uint collateral;
        uint expires;
    }
    Collateral[] internal _collaterals;
    uint internal borrowTime= 2 minutes;
    constructor() ERC721('Ether Backed Collateral','EBC')public{
      
    }
   


   function _issueCollateralToken(uint redemptionPrice,uint collateral,uint expires) internal
   returns(uint)
   {
      _collaterals.push(Collateral(redemptionPrice,collateral,expires));
      uint tokenId=_collaterals.length -1;
      _mint(msg.sender, tokenId);
      return tokenId;
     
   }

   
    
}