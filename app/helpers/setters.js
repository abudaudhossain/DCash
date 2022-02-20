const accountObj = (accObj) =>{
    console.log("setters l:2 ", accObj)
    return{
        AccountNo: accObj.token,
        name: accObj.name,
        phone: accObj.phone,
        balance: accObj.balance,
        currency: accObj.currency,
        numberValidation: accObj.numberValidation
    }
}

module.exports = {
    accountSetter: (list) =>{
        const accountList = [];
        for(let i = 0; i < list.length; i++){
            accountList.push(accountObj(list[i]))
        }

        return accountList;
    }
}