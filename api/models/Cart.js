const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const CartSchema = new Schema(
  {
  userId: {type:String , required:true},
  products:[
    {
      productId:{
        type:String,
      },
      quantity:{
        type:Number,
        default:1
      }
    }
  ],
  },
  {timestamps:true});

// Create a model based on that schema
const CartShop = mongoose.model("Cart", CartSchema);

// export the model
module.exports = CartShop;