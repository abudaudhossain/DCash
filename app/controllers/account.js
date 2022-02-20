const handler = require("../exceptions/handler");
const userAccount = require("../services/userAccount")
const createAccountRequestValidation = require("../validations/request/createAccountRequestValidation")
const validationHelper = require("../validations/validationsHelpers/validationHelper")

module.exports = {
    createAccount: async (req, res) => {
        try {

            createAccountRequestValidation(req, res);
            await validationHelper.accountExists(req.body.phone)

            const account = await userAccount.createNewAccount(req.body)
            res.send(account)
        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    }
}