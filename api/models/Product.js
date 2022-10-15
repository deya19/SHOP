const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const ProductSchema = new Schema(
  {
  title: {type:String , required:true , unique:true},
  desc:{type:String , required:true},
  img:{type:String , required:true},
  categories:{type:Array},
  size:{type:Array},
  color:{type:Array},
  price:{type:Number , required:true},
  inStock:{type:Boolean,default:true}
  },
  {timestamps:true});

// Create a model based on that schema
const ProductShop = mongoose.model("Product", ProductSchema);

// export the model
module.exports = ProductShop; 