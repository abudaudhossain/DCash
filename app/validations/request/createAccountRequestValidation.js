const validationHelper = require("../validationsHelpers/validationHelper");
const ValidationError = require("../../exceptions/ValidationError");


module.exports = (req, res) => {

    const { name, phone, accountType, password, currency, city, country } = req.body;

    // ==> check required key exists or not
    validationHelper.ObjExists(["name", "phone", "password", "accountType", "currency", "city", "country"], req.body);

    // ==> Required Should  Be not empty Value
    validationHelper.isEmpty([name, phone, password, accountType, currency, city, country]);

    // ==> name validation
    if (validationHelper.nameValidation(name)) throw new ValidationError("Should be use Only character in name");

    // ==> password Validation
    validationHelper.passwordValidation(password);

    // ==> Phone number Validation
    validationHelper.phoneValidation({ phone });

    return true;

}