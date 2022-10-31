const express = require("express");
const router = express.Router();
const { userShop_authLog_post, userShop_authReg_post, userShop_authLog_postadmin } = require("../controllers/authController");




//REGISTER
router.post("/register", userShop_authReg_post );


//LOGIN
router.post("/login",userShop_authLog_post );


//login with admin user
router.post("/loginadmin",userShop_authLog_postadmin)

module.exports = router;
