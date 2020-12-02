const BRTPOOL = artifacts.require("BRTPOOL");
const BRT=artifacts.require("BRT");

module.exports =async function(deployer,network,accounts) {
  await deployer.deploy(BRT,accounts[0]);
  const token=await BRT.deployed();
  const tokenAddr=token.address;
  await deployer.deploy(BRTPOOL,`${tokenAddr}`);
  const pool=await BRTPOOL.deployed();
  const poolAddr=pool.address;
  const bal=await token.balanceOf(accounts[0]);
  await token.transfer(poolAddr,bal.toString());
 
  
};
