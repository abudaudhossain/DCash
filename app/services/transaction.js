const userAccount = require("./userAccount");
const createNewTransaction = require("./createNewTransaction");

const AppAccount = require("../models/account");// model

module.exports = async (data) => {
    let { phone, amount, toAccountPhoneNumber } = data;

    const fromAccountInfo = await AppAccount.findOne({ phone: phone });
    const toAccountInfo = await AppAccount.findOne({ phone: toAccountPhoneNumber }, { balance: 1 });

    const balance = parseInt(fromAccountInfo.balance);
    amount = parseInt(amount);

    console.log("cash in 19: fromAccountInfo", fromAccountInfo)


    // cash in operation start
    const fromAccAPresentBalance = balance - amount;
    const toAccAPresentBalance = toAccountInfo.balance + amount;

    await userAccount.AccountBalanceUpdate(phone, fromAccAPresentBalance);
    await userAccount.AccountBalanceUpdate(toAccountPhoneNumber, toAccAPresentBalance);

    return await createNewTransaction(data);;
}