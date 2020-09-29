pragma solidity ^0.6.0;
import '@openzeppelin/contracts/math/SafeMath.sol';
library SafePercentage{
    using SafeMath for uint;
    
    function percentMul(uint _value,uint _percent) internal pure
    returns(uint)
    {
        return _value.mul(_percent).div(100);
        
    }
    
    
    function percentDiv(uint _value,uint _percent) internal pure
    returns(uint)
    
    {
     
      return _value.div(_percent).mul(100);
    }
    
}