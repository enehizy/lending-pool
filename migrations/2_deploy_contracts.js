const BRTPOOL = artifacts.require("BRTPOOL");
const EBT=artifacts.require('EBT');

module.exports =async function(deployer) {
  await deployer.deploy(BRTPOOL);
  

};
