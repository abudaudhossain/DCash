const validationHelper = require("../validationsHelpers/validationHelper");
const ValidationError = require("../../exceptions/ValidationError");

module.exports = (req) => {

    // ==> check required key exists or not
    validationHelper.ObjExists(["devicetoken"], req.headers);
    validationHelper.ObjExists(["phone", "password"], req.body);

    req.body.appSetIPAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.appSetDeviceToken = req.headers.devicetoken;

    const { phone, password, appSetDeviceToken, appSetIPAddress } = req.body;

    // ==> Required Should  Be not empty Value
    validationHelper.isEmpty([phone, password, appSetDeviceToken, appSetIPAddress]);

    // ==> Phone number Validation
    validationHelper.phoneValidation({ phone });

    // ==> password Validation
    validationHelper.passwordValidation(password);

    return true;

}
