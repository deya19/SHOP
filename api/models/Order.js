const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const OrderSchema = new Schema(
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
  amount:{type:Number,required:true},
  address:{type:Object,required:true},
  status:{type:String,required:true, default:"pending"}
  },
  {timestamps:true});

// Create a model based on that schema
const OrderShop = mongoose.model("Order", OrderSchema);

// export the model
module.exports = OrderShop; 


