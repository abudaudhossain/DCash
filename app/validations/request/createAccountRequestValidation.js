const validationHelper = require("../validationsHelpers/validationHelper");
const userAccount = require("../../services/userAccount")
const handler = require("../../exceptions/handler");
const ValidationError = require("../../exceptions/ValidationError");

module.exports = async (req, res) => {

    const { name, phone, accountType, currency, city, country } = req.body;
    console.log("body", req.body)
    // ==> check required key exists or not
    validationHelper.ObjExists(["name", "phone", "accountType", "currency", "city", "country"], req.body);

    // ==> Required Should  Be not empty Value
    validationHelper.isEmpty([name, phone, accountType, currency, city, country]);

    return true;

}