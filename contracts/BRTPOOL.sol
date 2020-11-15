pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
import '@openzeppelin/contracts/math/SafeMath.sol';
import './tokens/BRT.sol';
import './libraries/SafePercentage.sol';
import './BRTPOOLUTILS.SOL';
import './tokens/CollateralRedemptionToken.sol';
contract BRTPOOL is BRTPOOLUTILS ,CollateralRedemptionToken{
    address public brtAddr;
    struct BrtTokenInfo{
        uint8 decimals;
        string name;
        string symbol;

    }
    BrtTokenInfo public tokenInfo;
    using SafePercentage for uint;
    using SafeMath for uint;

    constructor() public{
      _createBrtTokenAndAddLiquidityToPool();
     

    }
    
    event Borrowed(address indexed borrower,uint loanId,  uint redemptionPrice,uint collateral,uint expires);
    event Liquidated(address indexed borrower,uint  loanId);
   
    function borrow() public  payable
    returns(uint)
    {
        uint loan = calculateLoan(msg.value);
        require(loan < getPoolBalance(),'cant borrow more than pool liquidity');
        uint fee=loan.percentMul(feePercent);
        uint redemptionPrice =loan.add(fee);
        uint expires=borrowTime.add(block.timestamp);

        BRT brtToken=BRT(brtAddr);
        brtToken.transfer(msg.sender,loan); 
        uint id = _issueCollateralToken(redemptionPrice, msg.value, expires);
        emit Borrowed(msg.sender,id,redemptionPrice,msg.value,expires);
    }

//   1603910689

   
    function payback(uint loanId) external{
         require(_isApprovedOrOwner(msg.sender, loanId),'Error collateral doesnt belong to this address');
         require(!isLoanExpiredAt(loanId,block.timestamp),'Error:loan has expired');
         require(balanceOf(msg.sender) >= 1,'you do not have any exiting loan');
         require(_exists(loanId),'Error: loan id does not exist');
         BRT brtToken=BRT(brtAddr);
         Collateral memory _loanInfo= loanInfo(loanId);
         brtToken.transferFrom(msg.sender,address(this),_loanInfo.redemptionPrice);
         delete _collaterals[loanId];
         _burn(loanId);
         msg.sender.transfer(_loanInfo.collateral);
         
    }  



    function getActiveLoans(address addr,uint unixTimeStamp) external view
    returns(uint[] memory)
    {  
     
       uint[] memory _loans= new uint[](_loanCounter(unixTimeStamp));
       if(_loanCounter(unixTimeStamp) >= 1){

         for(uint i =0;i < _collaterals.length;i++){
         if(ownerOf(i) == addr && isLoanExpiredAt(i,unixTimeStamp) == false){
            _loans[i]=i;
         }

                }
     

       }
        return _loans;
       
    }

    function _loanCounter(uint unixTimeStamp) private view
    returns(uint)
    {
       uint _count;
       for(uint i =0;i < _collaterals.length;i++){
         if(ownerOf(i) == msg.sender && isLoanExpiredAt(i,unixTimeStamp) == false){
            _count = _count + 1;
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
          if(isLoanExpiredAt(_loanIds[i],unixTimeStamp)){
              _isExpired =true;
              break;
          }
      }
      return _isExpired;
    } 

    function getExpiredLoanIds(uint unixTimeStamp) public view
    returns(uint[] memory)
    {
       uint _numberOfExpiredLoans =_expiredLoanCounter(unixTimeStamp);
       if( _numberOfExpiredLoans >= 1){
         uint[] memory _expiredLoanIds = new uint[](_numberOfExpiredLoans);
                 for(uint i = 0; i < _collaterals.length; i++){
           if(isLoanExpiredAt(i,unixTimeStamp) == true){
             _expiredLoanIds[i] = i;
           }
       }
       return _expiredLoanIds;

       }
       
    //    require(_numberOfExpiredLoans >= 1,'Error No Expired loans found');
      

    }
   

   function liquidate(uint loanId) external {
       require(_exists(loanId),'Error cant liqudate loan that does not exist');
       address _previousOwner=ownerOf(loanId);
       require(isLoanExpiredAt(loanId,block.timestamp),'Error: loan has not expired');
      
     
       BRT brtToken =BRT(brtAddr);
       Collateral memory _loanInfo=loanInfo(loanId);
       brtToken.transferFrom(msg.sender,address(this),_loanInfo.redemptionPrice);
       delete _collaterals[loanId];
       _burn(loanId);
   
       msg.sender.transfer(_loanInfo.collateral);
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
        BRT brtToken  = BRT(brtAddr);
        return brtToken.balanceOf(address(this));
    }
    
     function _expiredLoanCounter(uint unixTimeStamp) internal view
    returns(uint)
    {
        uint _count;
        for(uint i = 0; i < _collaterals.length; i++){
           if(isLoanExpiredAt(i,unixTimeStamp) == true){
             _count= _count + 1;
           }
        }
       return _count;
       
   }

    function _createBrtTokenAndAddLiquidityToPool ()private{
        BRT brtToken = new BRT(address(this));
        brtAddr = address(brtToken);
        tokenInfo.name = BRT(brtAddr).name();
        tokenInfo.symbol = BRT(brtAddr).symbol();
        tokenInfo.decimals = BRT(brtAddr).decimals();
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