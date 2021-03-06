const handler = require("../exceptions/handler");
const validationHelper = require("../validations/validationsHelpers/validationHelper");
const AppAuthSession = require("../models/authSession");
const ValidationError = require("../exceptions/ValidationError");
const NotFoundError = require("../exceptions/NotFountError");

module.exports = async (req, res, next) => {
    try {
        validationHelper.ObjExists(["devicetoken", "sessiontoken"], req.headers);
        validationHelper.ObjExists(["accountNo", "phone"], req.body);

        console.log('hi, I am validUserRequestMiddleware')
        const deviceToken = req.headers.devicetoken;
        const sessionToken = req.headers.sessiontoken;
        const accountNo = req.body.accountNo;
        const phone = req.body.phone;

        const session = await AppAuthSession.findOne({ token: sessionToken })

        // ==> session token validation
        if (!session) throw new NotFoundError("๐ค๐ค๐ค๐พ๐พPlease given valid session๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");

        // ==> device token validation
        if (session.deviceToken !== deviceToken) throw new ValidationError("๐ค๐ค๐ค๐พ๐พdeviceToken is invalid. Please Login Now.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");

        // ==> account token validation
        if (session.accountToken !== accountNo) throw new ValidationError("๐ค๐ค๐ค๐พ๐พAccountNo in invalid . Please Login Now.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");

        // ==> account token validation
        if (session.phone !== phone) throw new ValidationError("๐ค๐ค๐ค๐พ๐พphone number is invalid . Please Login Now.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");

        //==> check session status
        if (session.status === "Inactive") throw new ValidationError("๐ค๐ค๐ค๐พ๐พsession Is inactive.Please Login Now.๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ")

        // ==> check session time
        const nowTime = new Date();
        if (session.sessionExpireAt < nowTime) {
            // update status
            await AppAuthSession.findOneAndUpdate({ token: sessionToken }, { $set: { status: "Inactive" } })
            throw new ValidationError("๐ค๐ค๐ค๐พ๐พPlease Login again Now. Session is Expired๐ฝ๐ฝ๐พ๐ฝ๐ฝ๐ฝ");
        };

        // ==> update sessionExpireAt 
        const sessionExpireAt = new Date();
        sessionExpireAt.setMinutes(sessionExpireAt.getMinutes() + 10);
        await AppAuthSession.findOneAndUpdate({ token: sessionToken }, { $set: { sessionExpireAt: sessionExpireAt } })

        console.log("validUerRequest l: 44 session", session)

        req.body.appSetSessionToken = sessionToken;

        next();
    } catch (error) {
        console.log(error);
        handler(error, res);
    }
}