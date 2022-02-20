const NotFoundError = require("../../exceptions/NotFountError");
const UnauthorizedError = require("../../exceptions/UnauthorizedError");

const AppAccount = require("../../models/account"); // model
const { updateNumberValidationStatus } = require("../../services/userAccount");

module.exports = async (data) => {

    const accountInfo = await AppAccount.findOne({ phone: data.phone }, { validationOTP: 1, OTPExpireAt: 1 });
    if (!accountInfo) throw new NotFoundError("Please Create Account Now")

    const NowTime = new Date();
    console.log(NowTime, accountInfo.OTPExpireAt);
    if (NowTime > accountInfo.OTPExpireAt) throw new UnauthorizedError("Your OTP date Expired");

    if (data.otp !== accountInfo.validationOTP) throw new UnauthorizedError("Your OTP is wrong");

    console.log("userAccount l:40 Otp: ", accountInfo);

    return await updateNumberValidationStatus(data.phone)
}
