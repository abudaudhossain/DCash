const NotFoundError = require("../../exceptions/NotFountError");
const ValidationError = require("../../exceptions/ValidationError");
const userAccount = require("../../services/userAccount")


module.exports = {
    ObjExists: (keys, obj) => {
        for (let i = 0; i < keys.length; i++)  if (!obj.hasOwnProperty(keys[i])) throw new NotFoundError(`${keys[i]} is keys required`);

        return true;
    },
    isEmpty: (values) => {
        for (let i = 0; i < values.length; i++) if (values[i].length === 0) throw new ValidationError("Required Should  Be not empty property")
    },
    // check account already exists or not 
    accountExists: async (phone) => {
        if (await userAccount.myAccount(phone)) throw new ValidationError("This Phone number already Exists")
    }
}