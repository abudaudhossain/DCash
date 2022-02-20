const mongoose = require("mongoose");

const field = {
    "token": {
        type: String,  
    },   
    "fromAccountToken":{ // ==>cash out account 
        type: String
    },
    "toAccountToken":{ // ==> cash in account
        type: String
    }, 
    "sessionToken":{ // ==> from account session
        type: String
    },
    "transactionType":{ // 1.sent 2. cashOut 3. mobileRecharge
        type: String
    },
    "balance":{
        type: String
    }
}

const transactionSchema = mongoose.Schema(field, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema);