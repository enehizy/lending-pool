pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
import '@openzeppelin/contracts/math/SafeMath.sol';
import './tokens/BRT.sol';
import './libraries/SafePercentage.sol';
import './BRTPOOLUTILS.SOL';
import './tokens/EtherBackedCollateral.sol';
contract BRTPOOL is BRTPOOLUTILS ,EtherBackedCollateral{
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
        BRT brtToken=BRT(brtAddr);
        brtToken.transfer(msg.sender,loan); 
        uint fee=loan.percentMul(5);
        uint redemptionPrice =loan.add(fee);
        uint id = _issueCollateralToken(redemptionPrice, msg.value, borrowTime.add(block.timestamp));
        emit Borrowed(msg.sender,id,redemptionPrice,msg.value,borrowTime.add(block.timestamp));
    }

  

    function payback(uint loanId) external{
         require(_isApprovedOrOwner(msg.sender, loanId),'Error collateral doesnt belong to this address');
         require(!isExpired(loanId),'Error cant payback expired loan');
         require(balanceOf(msg.sender) >= 1,'you do not have any exiting loan');
         require(_exists(loanId),'Error: loan id does not exist');
         BRT brtToken=BRT(brtAddr);
         Collateral memory _loanInfo= loanInfo(loanId);
         brtToken.transferFrom(msg.sender,address(this),_loanInfo.redemptionPrice);
         delete _collaterals[loanId];
         _burn(loanId);
         msg.sender.transfer(_loanInfo.collateral);
    }  
    function getOutstandingLoansBy(address owner) public view
    returns(Collateral[] memory)
    {   
        require(balanceOf(owner) > 0,'address has no outstanding Loans');
        Collateral[] memory _loansForAddr = new Collateral[](balanceOf(owner));
        for(uint i = 0;i < _collaterals.length ; i++){
          if(ownerOf(i) == owner && !isExpired(i)){
              _loansForAddr[i] = _collaterals[i];
          }
       
        }
        return _loansForAddr;
    }

    function getOutstandingLoans() public view
    returns(Collateral[] memory)
    {
      return getOutstandingLoansBy(msg.sender);
    }
    
    function isExpired(uint loanId) public view
    returns(bool)
    {
       require(loanId < _collaterals.length,'Error: invalid loan id');
       require(_collaterals[loanId].expires != 0,'Error: collateral does not exist');
       require(_exists(loanId),'Error: loan id does not exist');

       return block.timestamp > _collaterals[loanId].expires  ? true:false;

    }
     

    function isAnyExpired(uint[] memory _loanIds) public view
    returns(bool)
    { 
      require(_loanIds.length <= _collaterals.length,'Error: number of id parameters exceeds number of collaterals');
      bool _isExpired;
      for(uint i =0;i < _loanIds.length;i++){
          if(isExpired(_loanIds[i])){
              _isExpired =true;
              break;
          }
      }
      return _isExpired;
    } 

    function getExpiredLoanIds() public view
    returns(uint[] memory)
    {
       uint _numberOfExpiredLoans =_expiredLoanCounter();
       require(_numberOfExpiredLoans > 1,'Error No Expired loans found');
       uint[] memory _expiredLoanIds = new uint[](_numberOfExpiredLoans);
       for(uint i = 0; i < _collaterals.length; i++){
           if(isExpired(i)){
             _expiredLoanIds[i] = i;
           }
       }
       return _expiredLoanIds;
    }
   

   function liquidate(uint loanId) external {
       require(_exists(loanId),'Error cant liqudate loan that does not exist');
       address _previousOwner=ownerOf(loanId);
       require(isExpired(loanId),'Error: loan has not expired');
      
     
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
    
     function _expiredLoanCounter() internal view
    returns(uint)
    {
        uint _count;
        for(uint i = 0; i < _collaterals.length; i++){
           if(isExpired(i) && _exists(i)){
             _count =_count +1;
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
        require(!isExpired(tokenId),'Error: cant approve expired collateral for transfer');
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(_msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(!isExpired(tokenId),'Error: cant transfer expired collateral');
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }
     function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(!isExpired(tokenId),'Error: cant transfer expired collateral');
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override{
        require(!isExpired(tokenId),'Error: cant transfer expired collateral for ');
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }
    
   

    
    
}