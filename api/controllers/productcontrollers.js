const ProductShop = require("../models/Product");

//CREATE
const productShop_product_post = async (req,res)=>{
  const newProduct = new ProductShop(req.body)

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error)
  }
}


//UPDATE
const productShop_product_put = async (req, res) => {


  try {
    const updatedProduct = await ProductShop.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
}



//DELETE
const productShop_product_delete = async (req, res) => {
  try {
    await ProductShop.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
}


//GET ONE PRODUCT (everybody can go to this product)
const productShop_oneProduct_get = async (req, res) => {
  try {
    const product = await ProductShop.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}


//GET ALL PRODUCTS (everybody can go to all products)
const productShop_products_get = async (req, res) => {
  const qNew = req.query.new //get last 5 when write ?new = true
  const qCategory = req.query.category // get [shirt]
  



  try {
    let products;
    
    if (qNew) {
      products = await ProductShop.find().sort({createdAt:-1}).limit(1)
    }else if(qCategory){
      products = await ProductShop.find({categories:{
        $in:[qCategory]
      }})
    }else{
      products = await ProductShop.find();
    }



    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = {
  productShop_product_post,
  productShop_product_put,
  productShop_product_delete,
  productShop_oneProduct_get,
  productShop_products_get
}