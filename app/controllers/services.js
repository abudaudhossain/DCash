const handler = require("../exceptions/handler");

module.exports = {
    cashIn: async(req, res) =>{
        try {
            res.send("Cash in")
        } catch (error) {
            console.log(error);
            handler(error, res);
        }
    }
}