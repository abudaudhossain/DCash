const NotFoundError = require("../../exceptions/NotFountError");
const UnauthorizedError = require("../../exceptions/UnauthorizedError");
const ValidationError = require("../../exceptions/ValidationError");
const setters = require("../../helpers/setters");

const AppAccount = require("../../models/account"); // model
const { updateNumberValidationStatus } = require("../../services/userAccount");

module.exports = async (data) => {

    // ==> get account in database
    const accountInfo = await AppAccount.findOne({ phone: data.phone });

    // ==> check account Exists or not
    if (!accountInfo) throw new NotFoundError("Please Create Account Now")

    //==> check numberValidation
    if (accountInfo.numberValidation === false) throw new ValidationError("๐ค๐ค๐ค๐พ๐พPlease number validation first.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ")


    // ==> Password validation
    if (data.password !== accountInfo.password) throw new UnauthorizedError("๐๐Your password is wrong๐คณ๐ค");

    console.log("loginAuth l:16 Otp: ", accountInfo);

    return {
        type: "success",
        msg: "๐Your Password Right ๐๐โค",
        data: setters.accountSetter([accountInfo])[0]
    }
}