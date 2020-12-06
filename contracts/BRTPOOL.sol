pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
import '@openzeppelin/contracts/math/SafeMath.sol';
import './libraries/SafePercentage.sol';
import './BRTPOOLUTILS.sol';
import './tokens/CollateralRedemptionToken.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
contract BRTPOOL is BRTPOOLUTILS ,CollateralRedemptionToken{
    using SafePercentage for uint;
    using SafeMath for uint;
    IERC20 token;
    constructor(address tokenAddr) public{
      token = IERC20(tokenAddr);
    }
    event Borrowed(address indexed borrower,uint loanId,  uint redemptionPrice,uint collateral,uint expires);
    event Liquidated(address indexed borrower,uint  loanId);
    event PayBack(address spender,uint loanId);
    function borrow() public  payable
    returns(uint)
    {
        uint loan = calculateLoan(msg.value);
        require(loan < getPoolBalance(),'cant borrow more than pool liquidity');
        uint fee=loan.percentMul(feePercent);
        uint redemptionPrice =loan.add(fee);
        uint expires=borrowTime.add(block.timestamp);

       
        token.transfer(msg.sender,loan); 
        uint id = _issueCollateralToken(redemptionPrice, msg.value, expires);
        emit Borrowed(msg.sender,id,redemptionPrice,msg.value,expires);
    }



   
    function payback(uint loanId) public{
       
         _payback(loanId, msg.sender);
         
    }  
     function payback(bytes memory _params) public{
       (uint _loanId,address _payer)=abi.decode(_params,(uint,address));
        _payback(_loanId,_payer); 
      
    }
     function _payback(uint loanId,address payer) internal{
         require(_isApprovedOrOwner(payer,loanId),'Error collateral doesnt belong to this address');
         require(!isLoanExpiredAt(loanId,block.timestamp),'Error:loan has expired');
         require(balanceOf(payer) >= 1,'you do not have any exiting loan');
         require(_exists(loanId),'Error: loan id does not exist');
        
        
         uint _redemptionPrice= loanInfo(loanId).redemptionPrice;
         uint _collateral= loanInfo(loanId).collateral;
         token.transferFrom(payer,address(this),_redemptionPrice);
         delete _collaterals[loanId];
         _burn(loanId);
         payable(payer).transfer(_collateral);     
         emit PayBack(address(this),loanId);     
         
    }  

   


    function getActiveLoans(address addr,uint unixTimeStamp) public view
    returns(uint[] memory)
    {  
     
       uint[] memory _loans= new uint[](_loanCounter(unixTimeStamp,addr));
       uint loan_i;
       if(_loanCounter(unixTimeStamp,addr) >= 1){

         for(uint i =0;i < _collaterals.length;i++){
          
              
              if(_collaterals[i].expires > 0){
                  if(ownerOf(i) == addr && isLoanExpiredAt(i,unixTimeStamp) == false){

                     
                      loan_i =loan_i + 1;
                      _loans[loan_i -1]=i;
                      
                  }
              }
         
        }
     

       }
        return _loans;
       
    }

    function _loanCounter(uint unixTimeStamp,address addr) private view
    returns(uint)
    {
       uint _count;
       for(uint i =0;i < _collaterals.length;i++){
           if(_collaterals[i].expires > 0){
                if(ownerOf(i) == addr && isLoanExpiredAt(i,unixTimeStamp) == false){
            _count = _count + 1;
         }
  
           }
        
       }
       return _count;

    }


    function isLoanExpiredAt(uint loanId,uint unixTimeStamp) public view
    returns(bool)
    {  
       
       require(loanId < _collaterals.length,'Error: invalid loan id');
    //    require(_collaterals[loanId].expires != 0,'Error: collateral does not exist');
       require(_exists(loanId),'Error: loan id does not exist');
       
          return unixTimeStamp  >=  _collaterals[loanId].expires;
   
     
     

    }

    

     

    function isAnyExpired(uint[] memory _loanIds,uint unixTimeStamp) public view
    returns(bool)
    { 
      require(_loanIds.length <= _collaterals.length,'Error: number of id parameters exceeds number of collaterals');
      bool _isExpired;
      for(uint i =0;i < _loanIds.length;i++){
        if(_collaterals[i].expires > 0){
          if(isLoanExpiredAt(_loanIds[i],unixTimeStamp) ==true){
              _isExpired =true;
              break;
          }
        }
      }
      return _isExpired;
    } 

    function getExpiredLoanIds(uint unixTimeStamp) public view
    returns(uint[] memory)
    {
       uint _numberOfExpiredLoans =_expiredLoanCounter(unixTimeStamp);
       uint[] memory _expiredLoanIds = new uint[](_numberOfExpiredLoans);
       uint loan_i;
       if( _numberOfExpiredLoans >= 1){
        
                 for(uint i = 0; i < _collaterals.length; i++){
                if(_collaterals[i].expires > 0){
                        if(isLoanExpiredAt(i,unixTimeStamp) == true){
                           
                              loan_i =loan_i + 1;
                              _expiredLoanIds[loan_i -1] = i;
                        }
                }
       }
      
        return _expiredLoanIds;
       }
      

    }
     function _expiredLoanCounter(uint unixTimeStamp) internal view
    returns(uint)
    {
        uint _count;
        for(uint i = 0; i < _collaterals.length; i++){
          if(_collaterals[i].expires > 0){
           if(isLoanExpiredAt(i,unixTimeStamp) == true){
             _count= _count + 1;
           }
          }
        }
       return _count;
       
   }
   

   function liquidate(uint loanId) public{
       _liquidate(loanId, msg.sender);
   }
    function liquidate(bytes memory _params) public{
    (uint _loanId,address payer)=abi.decode(_params,(uint,address));
    _liquidate(_loanId,payer);
   }
  

   function _liquidate(uint loanId,address payer) public {
       require(_exists(loanId),'Error cant liqudate loan that does not exist');
       address _previousOwner=ownerOf(loanId);
       require(isLoanExpiredAt(loanId,block.timestamp),'Error: loan has not expired');
      
     
       uint redemptionPrice=loanInfo(loanId).redemptionPrice;
       uint collateral=loanInfo(loanId).collateral;
       token.transferFrom(payer,address(this),redemptionPrice);
       delete _collaterals[loanId];
       _burn(loanId);
   
       payable(payer).transfer(collateral);
       emit Liquidated(_previousOwner,loanId);
   }


   
  
    
    
    function loanInfo(uint loanId) public view
    returns(Collateral memory)
    {  
       require(loanId < _collaterals.length,'Error: invalid loan id');
       require(_exists(loanId),'Error: loan id does not exist');
       return _collaterals[loanId];
    }
    function getPoolBalance() public view
    returns(uint)
    {
    
        return  token.balanceOf(address(this));
    }
    
    
















    //  CUSTOM ERC20 IMPLEMETATION THAT PREVENTS TRANSFER AND APPROVAL OF EXPIRED LOAN

     function approve(address to, uint256 tokenId) public virtual override {
        require(!isLoanExpiredAt(tokenId,block.timestamp),'Error: cant approve expired collateral for transfer');
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(_msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
       
    }
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(!isLoanExpiredAt(tokenId,block.timestamp),'Error: cant transfer expired collateral');
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
       
    }
     function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(!isLoanExpiredAt(tokenId,block.timestamp),'Error: cant transfer expired collateral');
        safeTransferFrom(from, to, tokenId, "");
    
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override{
        require(!isLoanExpiredAt(tokenId,block.timestamp),'Error: cant transfer expired collateral for ');
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);


    }
   

    
    
}