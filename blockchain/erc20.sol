contract BasicToken  {
  
  uint256 public totalSupply_;
  mapping(address => uint256) public balances;

  event Transfer(address, address, uint);
  
  constructor(uint _totalAmount) public {
      balances[msg.sender] = _totalAmount;
      totalSupply_ = _totalAmount; 
  }

  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    balances[msg.sender] -= _value;
    balances[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

}