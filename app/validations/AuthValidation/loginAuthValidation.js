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
    if (accountInfo.numberValidation === false) throw new ValidationError("🤑🤑🤑👾👾Please number validation first.👽👽👾👽👽👽")


    // ==> Password validation
    if (data.password !== accountInfo.password) throw new UnauthorizedError("😁😁Your password is wrong🤳🤔");

    console.log("loginAuth l:16 Otp: ", accountInfo);

    return {
        type: "success",
        msg: "👍Your Password Right 😍💋❤",
        data: setters.accountSetter([accountInfo])[0]
    }
}