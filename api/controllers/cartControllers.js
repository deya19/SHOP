const CartShop = require("../models/Cart");


//CREATE
const cartShop_cart_post = async (req,res)=>{
  const newCart = new CartShop(req.body)

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error)
  }
}


//UPDATE
const cartShop_cart_put = async (req, res) => {


  try {
    const updatedCart = await CartShop.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
}


//DELETE
const cartShop_cart_delete = async (req, res) => {
  try {
    await CartShop.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
}


//GET USER CART (everybody can go to this product)
const cartShop_oneCart_get = async (req, res) => {
  try {
    const cart = await CartShop.findOne({userId:req.params.userId});
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
}

//GET ALL 

const cartShop_cart_get = async(req,res)=>{
  try {
    const carts = await CartShop.find()
    res.status(200).json(carts)
  } catch (error) {
    res.status(200).json(error)
  }
}


module.exports = {
  cartShop_cart_post,
  cartShop_cart_put,
  cartShop_cart_delete,
  cartShop_oneCart_get,
  cartShop_cart_get
}