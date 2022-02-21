const handler = require("../exceptions/handler");
const { nativeResponse } = require("../helpers/utility");
const userAccount = require("../services/userAccount");
const OTPValidation = require("../validations/AuthValidation/OTPValidation");
const createAccountRequestValidation = require("../validations/request/createAccountRequestValidation");
const numberValidationRequestValidation = require("../validations/request/numberValidationRequestValidation");
const validationHelper = require("../validations/validationsHelpers/validationHelper")

module.exports = {
    createAccount: async (req, res) => {
        try {
            // Validation part
            createAccountRequestValidation(req, res);
            await validationHelper.accountExists(req.body.phone)

            const account = await userAccount.createNewAccount(req.body);
            nativeResponse(account, "😎😉Create a new account😍💋", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    },

    numberValidation: async (req, res) => {
        try {
            numberValidationRequestValidation(req);

            const account = await OTPValidation(req.body)
            nativeResponse(account, "💋Validation is success😍😘", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    }
}