const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const UserSchema = new Schema(
  {
  username: {type:String , required:true , unique:true},
  email:{type:String , required:true , unigue:true},
  password:{type:String , required:true},
  isAdmain:{
    type:Boolean,
    default:false
  },
  img:{type:String},
  gender:{type:String},
  phone:{type:Number},
  name:{type:String},
  lastName:{type:String}
  },
  {timestamps:true});

// Create a model based on that schema
const UserShop = mongoose.model("User", UserSchema);

// export the model
module.exports = UserShop; 