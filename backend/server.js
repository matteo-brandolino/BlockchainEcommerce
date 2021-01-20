//Server setup
const express = require('express')
const cors = require('cors')

const app = express()

//import ethers to connect to blockchain
const ethers = require('ethers')

//Pointer to contract
const PaymentProcessor = require('../frontend/src/contracts/PaymentProcessor.json')
//import Model
const { Payment } = require('./db.js')

const items = require('./items')

app.use(cors())

app.get('/api/getAllItems', async (req,res) => {
    res.send ({ items })
});

app.get('/api/getPaymentId/:itemId', async (req,res) => {
    const paymentId = (Math.random()*10000).toFixed(0) //=> give random payment id not decimals until 10000

    //create a payment
    await Payment.create({
        id:paymentId,
        itemId:req.params.itemId,
        paid:false
    });

    res.send ({ paymentId })
});

app.get('/api/getItemUrl/:paymentId', async (req,res) => {
    //fetch payment from db
    const payment = await Payment.findOne({id: req.params.paymentId});
    //if payment exist and is paid return url
    if(payment && payment.paid === true) {
        res.send({ url: items[payment.itemId].url })
    } else {
        res.send({ url: '' })
    }
})



app.listen(4000, () => console.log('Server running on port 4000'))

//connection to blockchain to listen events
const listenToEvents = () => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545');
    const networkId = '5777';

    const paymentProcessor = new ethers.Contract(
        PaymentProcessor.networks[networkId].address,
        PaymentProcessor.abi,
        provider
    )
    //listening for PaymentDone
    paymentProcessor.on('PaymentDone', async (payer, amount, paymentId, date) => {
        console.log(`
            from ${payer}
            amount ${amount}
            paymentId ${paymentId}
            date ${(new Date(date.toNumber()*1000)).toLocaleString()}
        `)
        //if payment exists, set paid true
        const payment = await Payment.findOne({id : paymentId})
        if(payment) {
            payment.paid = true;
            await payment.save();
        }
    })
}

listenToEvents()