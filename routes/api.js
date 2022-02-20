const express = require('express');
const account = require('../app/controllers/account');
const router = express.Router();

router.get("/",(req, res) =>{    
    res.send("api")
});

router.post('/newAccount', account.createAccount) // create new account
router.post("/numberValidation", account.numberValidation) // number validation

module.exports = router;