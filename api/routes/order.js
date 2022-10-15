const express = require("express");
const router = express.Router();
const { orderShop_order_post, orderShop_order_put, orderShop_order_delete, orderShop_oneOrder_get, orderShop_order_get, orderShop_orderIncome_get } = require("../controllers/orderControllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmain,
} = require("./verifyToken");


//CREATE
router.post("/", verifyToken, orderShop_order_post);

//UPDATE
router.put("/:id", verifyTokenAndAdmain,orderShop_order_put);

//DELETE
router.delete("/:id", verifyTokenAndAdmain, orderShop_order_delete);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, orderShop_oneOrder_get);

//GET ALL
router.get("/", verifyTokenAndAdmain, orderShop_order_get);

//GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmain, orderShop_orderIncome_get);

module.exports = router;
