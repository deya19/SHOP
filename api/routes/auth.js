const express = require("express");
const router = express.Router();
const { userShop_authLog_post, userShop_authReg_post } = require("../controllers/authController");




//REGISTER
router.post("/register", userShop_authReg_post );


//LOGIN
router.post("/login",userShop_authLog_post );

module.exports = router;
