const BRTPOOL = artifacts.require("BRTPOOL");


module.exports =async function(deployer) {
  await deployer.deploy(BRTPOOL);
  

};
