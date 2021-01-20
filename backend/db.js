const mongoose = require('mongoose');

// Dot Env
require('dotenv').config({ path: '.env' });

//connect to db
mongoose.connect(
    process.env.CONNECTION,
    {useUnifiedTopology:true, useNewUrlParser: true}
);

//Payment schema => how looks like
const paymentSchema = new mongoose.Schema({
    id: String,
    itemId: String,
    paid: Boolean
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = {
    Payment
}