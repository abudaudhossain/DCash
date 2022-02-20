const setters = require("../helpers/setters");
const utility = require("../helpers/utility");

const AppAccount = require("../models/account")// model

module.exports = {
    createNewAccount: async (data) => {
        const { name, phone, accountType, currency, city, country } = data;
        const token = utility.getToken("ACC");
        const validationOTP = utility.numberSubToken();
        const expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes() + 10);

        console.log(expireDate);
        const newAccount = new AppAccount({
            token,
            name,
            phone,
            accountType,
            currency,
            city,
            country,
            balance: 0,
            validationOTP,
            OTPExpireAt: expireDate,
        })
        await newAccount.save();

        return setters.accountSetter([newAccount]);
    },

    accountList: async () => {
        return setters.accountSetter(await AppAccount.find({}));
    },

    myAccount: async (phone) => {
        return await AppAccount.findOne({ phone: phone });
    },

    updateNumberValidationStatus: async (phone) => {
        return setters.accountSetter([await AppAccount.findOneAndUpdate({ phone: phone }, { $set: { numberValidation: true } })])
    }

}