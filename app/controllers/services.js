const handler = require("../exceptions/handler");
const { nativeResponse } = require("../helpers/utility");
const cashIn = require("../services/transaction");
const cashInRequestValidation = require("../validations/request/transactionRequestValidation");
const transactionValidation = require("../validations/ServiceValidation/transactionValidation");

module.exports = {
    cashIn: async (req, res) => {
        try {
            // ==> req data validation
            cashInRequestValidation(req);

            // ==> transactionValidation
            await transactionValidation(req);

            // ==> transaction 
            const result = await cashIn(req.body)
            nativeResponse(result.data, result.msg, res)

        } catch (error) {
            console.log(error);
            handler(error, res);
        }
    }
}