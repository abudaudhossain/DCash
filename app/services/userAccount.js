const setters = require("../helpers/setters");
const utility = require("../helpers/utility");

const AppAccount = require("../models/account")// model

module.exports = {
    // ==> create new account
    createNewAccount: async (data) => {
        const { name, phone, accountType, password, currency, city, country } = data;
        const token = utility.getToken("ACC");
        const validationOTP = utility.numberSubToken();
        const expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes() + 10);

        console.log(expireDate);
        const newAccount = new AppAccount({
            token,
            name,
            phone,
            password,
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

    // ==> get all account list
    accountList: async () => {
        return setters.accountSetter(await AppAccount.find({}));
    },

    // ==> find account by phone number
    myAccount: async (phone) => {
        return await AppAccount.findOne({ phone: phone });
    },

    // ==> check phone number is validation
    updateNumberValidationStatus: async (phone) => {
        return setters.accountSetter([await AppAccount.findOneAndUpdate({ phone: phone }, { $set: { numberValidation: true } })])
    },
    AccountBalanceUpdate: async (phone, balance) => {
        return setters.accountSetter([await AppAccount.findOneAndUpdate({ phone: phone }, { $set: { balance: balance } })])
    }

}