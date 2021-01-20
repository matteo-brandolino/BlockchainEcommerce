pragma solidity ^0.6.2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Dai is ERC20 {
    //fake version of Dai for test purpose
    constructor () ERC20('DAI Stablecoin', 'DAI') public {}

    //function to create tokens
    function faucet(address to, uint amount) external {
        _mint(to, amount);
    }
}
