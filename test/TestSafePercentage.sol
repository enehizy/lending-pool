pragma solidity ^0.6.0;
import '../contracts/libraries/SafePercentage.sol';
import 'truffle/Assert.sol';

contract TestSafePercentage{
  using SafePercentage for uint;
  uint[] numArr =[100,2000,25000,1000000,17500,4400,125000,uint(10 ** 18)];


  // function testPercentMultiplication50Percent() public{
  //     for(uint i =0;i < numArr.length;i++){
  //         Assert.equal(numArr[i].percentMul(50),numArr[i] /2);
  //     }
  // }

  


  



}