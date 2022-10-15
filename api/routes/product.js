
const express = require("express");
const { productShop_product_post, productShop_product_put, productShop_product_delete, productShop_oneProduct_get, productShop_products_get } = require("../controllers/productcontrollers");
const ProductShop = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmain,
} = require("./verifyToken");
const router = express.Router();


//CREATE
router.post("/",verifyTokenAndAdmain,productShop_product_post)


//UPDATE
router.put("/:id", verifyTokenAndAdmain,productShop_product_put);



//DELETE
router.delete("/:id", verifyTokenAndAdmain,productShop_product_delete);



//GET ONE PRODUCT (everybody can go to this product)
router.get("/find/:id",productShop_oneProduct_get);



//GET ALL PRODUCTS (everybody can go to all products)
router.get("/", productShop_products_get);



module.exports = router;





