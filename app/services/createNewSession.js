const utility = require("../helpers/utility");
const AppAuthSession = require("../models/authSession");

module.exports = async (data) => {
    // console.log("CrateNewSession l: 5", data)
    const { appSetAccountToken, phone, appSetDeviceToken, appSetIPAddress } = data;
    const sessionExpireAt = new Date();
    sessionExpireAt.setMinutes(sessionExpireAt.getMinutes() + 10);

    const newAuthSession = new AppAuthSession({
        token: utility.getToken('AUTHSes'),
        phone,
        deviceToken: appSetDeviceToken,
        ipAddress: appSetIPAddress,
        accountToken: appSetAccountToken,
        status: "Active",
        sessionExpireAt
    })
    await newAuthSession.save();
    
    console.log("CrateNewSession l20: ", newAuthSession)
    return {
        type: "success",
        msg: "Create new session😎😉",
        data: {
            sessionToken: newAuthSession.token
        }
    }
}