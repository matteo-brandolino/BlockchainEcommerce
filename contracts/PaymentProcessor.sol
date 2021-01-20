pragma solidity ^0.6.2;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PaymentProcessor {
    //address of merchant
    address public admin;

    //pointer to DAI smart contract
    IERC20 public dai;

    event PaymentDone (
        address payer,
        uint amount, 
        uint paymentId,
        uint date 
        // dates in solidity are integer!
    );


    //deploy only once when contract deployed
    constructor (address adminAddress, address daiAddress) public {
        admin = adminAddress;
        dai = IERC20(daiAddress); //=> to interact with dai 
    }

    //function triggered when payment occurs //it has to be external to be used by another contract
    function pay(uint amount, uint paymentId) external {
        //from customer to merchant payment
        dai.transferFrom(msg.sender, admin, amount); //trasfer on behalf someone else //delegated transfer //react to incoming transfer
        // then emit an event when payment is done
        emit PaymentDone (msg.sender, amount, paymentId, block.timestamp);
    }

}