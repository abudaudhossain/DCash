const handler = require("../exceptions/handler");
const createAccountRequestValidation = require("../validations/request/createAccountRequestValidation")

module.exports = {
    createAccount: async (req, res) =>{
        try {
            createAccountRequestValidation(req);
            res.send("hid")
        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    }
}