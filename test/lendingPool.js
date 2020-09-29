

const BrtPool =artifacts.require('BRTPOOL');
const erc20abi= [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const $=(unit)=>{
    return web3.utils.toWei(`${unit}`,'ether');
}
const brt =$.bind($);
const eth =$.bind($)
contract('BrtPool Core',(accounts)=>{

    let brtPool;
    let tokenInfo;
    let brtToken;
    const BN=web3.utils.BN;
    before(async()=>{
     brtPool =await BrtPool.deployed();
     tokenInfo = await brtPool.tokenInfo();
     const brtAddr=await brtPool.brtAddr();
     brtToken=new web3.eth.Contract(erc20abi,brtAddr);
    })

    it('should deploy brt contract',async ()=>{
        const poolAddr=brtPool.address;
        const nameOfToken =tokenInfo.name;
        const tokenSymbol= tokenInfo.symbol;
        console.log({nameOfToken,poolAddr,tokenSymbol});
        assert.notEqual(poolAddr,'','incorrect address');
       

    })
    it('should have brt liquidity',async()=>{
        const poolBalance =await brtPool.getPoolBalance();
        assert.notEqual(BigInt(poolBalance),0,'pool doesnt have liquidity');
    })
    it('should convert from eth to brt',async()=>{
        const toBrt=await brtPool.convertToBrtFromEth(`${eth(0.5)}`);
        assert.equal(toBrt,`${brt(125/2)}`);
    })
    it('should convert from brt to eth',async()=>{
        const half=125 /2;
        const toEth =await brtPool.convertToEthFromBrt(`${brt(half)}`);
        assert.equal(toEth, `${eth(0.5)}`)
    })
    
    it('should calculate colatateral needed from loan amount',async()=>{
        const collateral= await brtPool.calculateCollateral(`${brt(100)}`);
        const collateralInBrt= await brtPool.convertToBrtFromEth(collateral);
        assert.equal(collateralInBrt,brt(100) * 1.5,'collateral code failed');
    })

    it('should calculate loan from collateral avaliable',async()=>{

        
        const toBrt=await brtPool.convertToBrtFromEth(`${eth(1)}`);
        const loan=await brtPool.calculateLoan(`${eth(1)}`);
        assert.equal(loan,toBrt / 1.5,'loan code failed');
       
    })

    it('should borrow brt tokens from pool',async()=>{
        const result= await brtPool.borrow({value:eth(1)});
        const balance= await brtToken.methods.balanceOf(accounts[0]).call();
        const owner=await brtPool.ownerOf(0);

      
        assert.equal(owner,accounts[0],'wrong owner on borrowed loan');
        assert.notEqual(balance,0);
        const TransferEvent=result.logs[0].args;
        const BorrowedEvent=result.logs[1].args;
        assert.equal(TransferEvent.to,accounts[0]);
        assert.equal(BorrowedEvent.borrower,accounts[0]);
        assert.equal(BorrowedEvent.loanId,0);
        assert.equal(BorrowedEvent.collateral,eth(1));
    })
    
      it('should check if loan has expired',async()=>{
        const isExpired= await brtPool.isExpired(0);
        assert.equal(isExpired,false,'wrong loan status');
  
  
      })
     
  
     it('should get  loans borrowed by address',async()=>{
       let loans= await brtPool.getOutstandingLoansBy(accounts[0]);
       assert.equal(typeof loans,typeof [],'return wrong value');
       const numberOfLoans = loans.length > 0;
       assert.equal(numberOfLoans,true);
      
       
      })

      it('should get expired Loans ids',async()=>{
       try{
        const expiredLoans= await brtPool.getExpiredLoanIds();
        assert.equal(true,false)
       }
       catch(e){
         assert.notEqual(e.message ,'');
       }
      
       
      })

    it('should payback and reclaim collateral',async()=>{
      const loanInfo=await brtPool.loanInfo(0);
      const addr=brtPool.address;
      
      //borrow to be able to pay for fee
    
      await brtPool.borrow({value:eth(1)});
      const prePoolBalance=await brtPool.getPoolBalance();
      const preEthBalance=await web3.eth.getBalance(accounts[0])
      await brtToken.methods.approve(addr,loanInfo.redemptionPrice).send({from:accounts[0]});
      await brtPool.payback(0);
      const postPoolBalance=await brtPool.getPoolBalance();
      const postEthBalance=await web3.eth.getBalance(accounts[0])
      const checkPoolBalance=postPoolBalance > prePoolBalance;
      const checkEthBalance=postEthBalance > preEthBalance;
      assert.equal(checkPoolBalance,true,'token not returned to the pool');
      assert.equal(checkEthBalance,true,'collateral not returned to owner');
    
     
      
    })
    it('should check if loan has expired for multiple loans',async()=>{
       const ids=[1,2,3,4];
       for(let i =0;i<= ids.length;i++){
        await brtPool.borrow({value:eth(1)})
        
        
       }
       
        const isExpired= await brtPool.isAnyExpired([...ids]);
        assert.equal(isExpired,false,'wrong loan status');
  
  
      })
    it('should liquidate expired loan',async()=>{
      const loanInfo=await brtPool.loanInfo(1);
      // borrow in order to pay back intearest
      await brtPool.borrow({value:eth(1)});
      const prePoolBalance=await brtPool.getPoolBalance();
      const preEthBalance=await web3.eth.getBalance(accounts[0])
      const addr=brtPool.address;
      await brtToken.methods.approve(addr,loanInfo.redemptionPrice).send({from:accounts[0]});
      console.log('please wait for two minutes for loan to expire to create a liquidation position')
    
    
      await (function(){
         return new Promise((resolve,reject)=>{
           setInterval(()=>{
            resolve();
           },120000)
         })
       })()
          await brtPool.liquidate(1);
          const postPoolBalance=await brtPool.getPoolBalance();
          const postEthBalance=await web3.eth.getBalance(accounts[0])
          const checkPoolBalance=postPoolBalance > prePoolBalance;
          const checkEthBalance=postEthBalance > preEthBalance;
          assert.equal(checkPoolBalance,true,'token not returned to the pool');
          assert.equal(checkEthBalance,true,'collateral not returned to owner');
      
     
     
    })
    it('should not approve or transfer expired collateral',async()=>{
      console.log('please wait for two minutes for loan to expire')
    
      await (function(){
         return new Promise((resolve,reject)=>{
           setInterval(()=>{
            resolve();
           },120000)
         })
       })()
      try{
       await brtPool.approve(accounts[1]);
       await brtPool.transferFrom(accounts[0].accounts[1],1);
       assert.equal(true,false);
      }
      catch(e){
       assert.notEqual(e.message,'');
      }
      
   })
  

   
    
})