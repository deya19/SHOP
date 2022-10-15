const express = require("express");
const router = express.Router();
const { userShop_user_put, userShop_user_delete, userShop_oneUser_get, userShop_user_get, userShop_userStats_get } = require("../controllers/userControllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmain,
} = require("./verifyToken");


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, userShop_user_put);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization,userShop_user_delete);

//GET ONE USER
router.get("/find/:id", verifyTokenAndAdmain, userShop_oneUser_get);



//GET ALL USER
router.get("/", verifyTokenAndAdmain, userShop_user_get);


//GET USER STATS
router.get("/stats",verifyTokenAndAdmain,userShop_userStats_get)


module.exports = router;
