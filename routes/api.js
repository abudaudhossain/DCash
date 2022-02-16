const express = require('express');
const account = require('../app/controllers/account');
const router = express.Router();

router.get("/",(req, res) =>{
    
    res.send("api")
});

router.post('/newAccount', account.createAccount)

module.exports = router;