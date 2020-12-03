import BrtToken from '../abis/BRT.json';
import BrtPoolJson from '../abis/BRTPOOL.json';
import BrtPool from './BrtPool';
export default class Brt{

    constructor(web3){
        this.web3=web3;

    }

    async getContract(){
        const network=  await this.web3.eth.net.getId();
        const contract=new this.web3.eth.Contract(BrtToken.abi,BrtToken.networks[`${network}`].address);
        this.contract=contract;
  
    }

    
    async approveAndCall(spender, amount,signature,params,options){
        await this.getContract();
        await this.contract.methods.approveAndCall(`${spender}`,`${amount}`,signature,`${params}`).send({...options});
    }

    async _approveAndPayback(spender,loanId,options){
        await this.getContract();
        const pool=new BrtPool(this.web3);
        const loanInfo=await pool.loanInfo(loanId);
        const signature='payback(bytes)';
        const params=this.web3.eth.abi.encodeParameters(['uint256','address'],[`${loanId}`,`${options.from}`]);
        await this.approveAndCall(spender,loanInfo.redemptionPrice,signature,params,{...options});
    }
    


}