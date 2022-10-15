const UserShop = require("../models/User");


//UPDATE
const userShop_user_put = async (req, res) => {
  //to hash password
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await UserShop.findByIdAndUpdate(
      //to update and save as new
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
}


//DELETE
const userShop_user_delete = async (req, res) => {
  try {
    await UserShop.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
}


//GET ONE USER
const userShop_oneUser_get = async (req, res) => {
  try {
    const user = await UserShop.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
}


//GET ALL USER
const userShop_user_get = async (req, res) => {
  const query = req.query.new
  try {
    const users = query ? await UserShop.find().sort({_id:-1}).limit(5): await UserShop.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}


//GET USER STATS
const userShop_userStats_get = async (req,res) => {
  //TO GET STATS IN THIS 
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

  try {
    const data = await UserShop.aggregate([
      {$match:{createdAt:{$gte:lastYear}}},
      {
        $project:{
          month:{$month : "$createdAt"}
        },
      },
      {
        $group:{
          _id:"$month",
          total:{$sum : 1}
        }
      }
    ])
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  userShop_user_put,
  userShop_user_delete,
  userShop_oneUser_get,
  userShop_user_get,
  userShop_userStats_get
}
