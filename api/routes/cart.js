const express = require("express");
const router = express.Router();
const { cartShop_cart_post, cartShop_cart_put, cartShop_cart_delete, cartShop_oneCart_get, cartShop_cart_get } = require("../controllers/cartControllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmain,
} = require("./verifyToken");



//CREATE
router.post("/",verifyToken,cartShop_cart_post)


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, cartShop_cart_put);



//DELETE
router.delete("/:id", verifyTokenAndAuthorization,cartShop_cart_delete);



//GET USER CART (everybody can go to this product)
router.get("/find/:userId", verifyTokenAndAuthorization,cartShop_oneCart_get);



//GET ALL 
router.get("/",verifyTokenAndAdmain,cartShop_cart_get)



module.exports = router;
















