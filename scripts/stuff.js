module.exports=()=>{

  const encoded=web3.eth.abi.encodeParameters(['uint256','string'],['10' ,'hello']);
  console.log(encoded);
}