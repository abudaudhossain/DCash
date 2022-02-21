const mongoose = require("mongoose");

const field = {
    "token": {
        type: String,
    },
    "fromAccountPhoneNUmber": { // ==>cash out account 
        type: String
    },
    "toAccountPhoneNumber": { // ==> cash in account
        type: String
    },
    "sessionToken": { // ==> from account session
        type: String
    },
    "transactionType": { // "sendMoney", "cashOut", "payment", "cashIn", "mobileRecharge"
        type: String
    },
    "transactionFee": {
        type: Number
    },
    "amount": {
        type: Number
    }
}

const transactionSchema = mongoose.Schema(field, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema);