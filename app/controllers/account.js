const handler = require("../exceptions/handler");
const { nativeResponse } = require("../helpers/utility");
const userAccount = require("../services/userAccount")
const createAccountRequestValidation = require("../validations/request/createAccountRequestValidation")
const validationHelper = require("../validations/validationsHelpers/validationHelper")

module.exports = {
    createAccount: async (req, res) => {
        try {
            // Validation part
            createAccountRequestValidation(req, res);
            await validationHelper.accountExists(req.body.phone)

            const account = await userAccount.createNewAccount(req.body);
            nativeResponse(account, "Create a new account", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    }
}