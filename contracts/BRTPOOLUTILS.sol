pragma solidity ^ 0.6.0;
import '@openzeppelin/contracts/math/SafeMath.sol';
import './libraries/SafePercentage.sol';
contract BRTPOOLUTILS{
     uint8 internal _ethBrtExchangeRate =125;
     uint8 public collaterizationRatio =150;
     uint8 public feePercent=5;
     using SafeMath for uint;
     using SafePercentage for uint;

      function convertToBrtFromEth(uint priceInEth) public view
    returns(uint)
    {   
        uint priceInBrt = priceInEth.mul(uint(_ethBrtExchangeRate));
        return  priceInBrt;
    }

    function convertToEthFromBrt(uint priceInBrt) public view 
    returns(uint)
    {
        uint priceInEth =priceInBrt.div(uint(_ethBrtExchangeRate));
        return priceInEth;
    }


    function calculateCollateral(uint _loanInBrt) public view
    returns(uint)
    {
       uint _loan = convertToEthFromBrt(_loanInBrt);
       uint collateral = _loan.percentMul(collaterizationRatio);
       return collateral;
    }

    function calculateLoan(uint _collateralInEth) public view
    returns(uint)
    {

        uint _collateral = convertToBrtFromEth(_collateralInEth); 
        uint loan =_collateral.percentDiv(collaterizationRatio);
        return loan;

    }


}