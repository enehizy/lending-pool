pragma solidity ^0.6.0;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';







contract CollateralRedemptionToken is ERC721{
    struct Collateral{
        uint redemptionPrice;
        uint collateral;
        uint expires;
    }
    Collateral[] internal _collaterals;
    uint public borrowTime= 1 minutes;
    constructor() ERC721('Collateral Redemption Token','CRT')public{

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