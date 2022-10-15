const express = require("express");
const router = express.Router();
const { stripe_post } = require("../controllers/stripeControllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmain,
} = require("./verifyToken");

//paid operation
router.post("/payment",stripe_post)

module.exports = router;