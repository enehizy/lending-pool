
import BrtPoolJson from '../abis/BRTPOOL.json';



export default class BrtPool{
    
   constructor(web3){
       this.web3=web3;
      
    }

    
    

    async getContract(){
        const network=  await this.web3.eth.net.getId();
        const contract=new this.web3.eth.Contract(BrtPoolJson.abi,BrtPoolJson.networks[`${network}`].address);
        this.contract=contract;
    }

    


  async   convertToBrtFromEth(amount){
        /**
         * converts from Brt from Eth
         */


        // const {web3 ,contract}=this;
        await this.getContract();
        const brtAmout=this.web3.utils.toWei(`${amount}`,'ether');
        const brt=await this.contract.methods.convertToBrtFromEth(`${brtAmout}`).call();
        return brt;

    }



    async convertToEthFromBrt(amount){
        await this.getContract();
        const EthAmout=this.web3.utils.toWei(`${amount}`,'ether');
        const eth=await this.contract.methods.convertToEthFromBrt(EthAmout).call();
        return eth;
    }


   


    async calculateCollateral(loanInBrt){
       await this.getContract();
       const brtAmout=this.web3.utils.toWei(`${loanInBrt}`,'ether');
       const collateral =await this.contract.methods.calculateCollateral(brtAmout).call();
       return collateral;
    }

    
    async calculateLoan(collateralInEth){
        await this.getContract();
        const EthAmout=this.web3.utils.toWei(`${collateralInEth}`,'ether');
        const loan =await this.contract.methods.calculateLoan(EthAmout).call();
        return loan;
     }


    async borrow(options){
        await this.getContract();
        await this.contract.methods.borrow().send({...options});
    }


    // async approveBrtToken(addr,id,options){
    //     await this.getContract();
    //     const tokenAddr=await this.contract.methods.brtAddr().call()
    //     const brtToken=new this.web3.eth.Contract(BrtToken.abi,tokenAddr);
    //     await brtToken.methods.approve(addr,id).send({...options});

    // }
    // async approveAndCall(addr,amount,signature,params,options){
    //     await this.getContract();
    //     const tokenAddr=await this.contract.methods.brtAddr().call();
    //     console.log(tokenAddr);
    //     const brtToken=new this.web3.eth.Contract(BrtToken.abi,tokenAddr);
    //     await brtToken.methods.approveAndCall(`${addr}`,`${amount}`,signature,`${params}`).send({...options});

    // }

    async payback(loanId,options){
        await this.getContract();
        await this.contract.methods.payback(loanId).send({...options});
    } 
    
    


    async getActiveLoans(addr) 
 
    {  
        await this.getContract();
        const time =Math.round(Date.now() /1000);
        const result=  await this.contract.methods.getActiveLoans(addr,time).call();
        return result;

        // return activeLoans;
    }
    

    async getExpiredLoanIds()
    { 
        await this.getContract();
        const time =Math.round(Date.now() /1000);
        const expiredLoans=  await this.contract.methods.getExpiredLoanIds(time).call();
         
        return expiredLoans;

    }
    async liquidate(loanId,options){
        await this.getContract();
        await this.contract.methods.liquidate(loanId).send({...options});
    }
 
     
 
    async loanInfo(loanId){  
        await this.getContract();
        const loan=  await this.contract.methods.loanInfo(loanId).call();
        return loan;
     }


    async transferFrom(from,to,tokenId,options){
        await this.getContract();
        const loan=  await this.contract.methods.transferFrom(from,to,tokenId).send({...options});
    }
   
    
    async borrowTime()
    {
        await this.getContract();
        const time=  await this.contract.methods.borrowTime().call();
        return time;
    
    }
    async isExpired(loanId){
        await this.getContract();
        const time =Math.round(Date.now() /1000);
        const expired=  await this.contract.methods.isExpired(loanId,time).call();
        console.log(expired)
    }

    async _getLoanValues(collateral){
        await this.getContract();
        const EthAmout=this.web3.utils.toWei(`${collateral}`,'ether');
       
        const values=await Promise.all({
            loan: this.contract.methods.calculateLoan(EthAmout).call(),
            borrowTime:this.contract.methods.borrowTime().call()
          }
        )
        return values;
    }
    async _getActiveLoans(addr){
        await this.getContract();
        let acLoans=await this.getActiveLoans(addr);
        console.log(acLoans)
        const activeLoans=[];
        if(acLoans.length < 1){
            return [];
        }
        
        let info;
        let id;
        for(var i=0;i < acLoans.length;i++){
            
            id =acLoans[i];
          
             const {redemptionPrice,collateral,expires}= await this.loanInfo(id);
            
            activeLoans.push({
               id,
               redemptionPrice,
               collateral,
               expires
            })

        }
        return activeLoans;

    }

    async _getExpiredLoans(){
        // await this.getContract();
        const exLoans= await this.getExpiredLoanIds();
        
        const loans =[];
       
      
       
    if(exLoans.length < 1){
        return [];
    }
    let loan;
    let marketPrice;
        for(let i=0;i < exLoans.length;i++){
          
            loan =await this.loanInfo(exLoans[i]);

            marketPrice = await this.convertToBrtFromEth(loan.collateral / (10 ** 18))
            loans.push({
                id:exLoans[i],
                collateral:loan.collateral,
                redemptionPrice:loan.redemptionPrice,
                marketPrice,
                expires:loan.expires
            })
        }
       return loans;

    }


    

}