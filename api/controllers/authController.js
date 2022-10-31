const UserShop = require("../models/User");

//Hash for password
const CryptoJS = require("crypto-js");

//Security when we need to remove product .....
const jwt = require("jsonwebtoken")


//REGISTER

const userShop_authReg_post = async (req, res) => {
  const newUser = new UserShop({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    phone:req.body.phone,
    gender:req.body.gender,
    img:req.body.img,
    name:req.body.name,
    lastName:req.body.lastName
  });

  try {
    const user = await UserShop.findOne({username: req.body.username});
    if (user) {
      res.status(401).json("Username is exists!");
      return;
    }
    
    const email = await UserShop.findOne({email: req.body.email});
    if (email) {
      res.status(401).json("Email is exists!");
      return;
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};


//LOGIN

const userShop_authLog_post = async (req, res) => {
  try {
    const user = await UserShop.findOne({username: req.body.username});
    if (!user) {
      res.status(401).json("Username not found!");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    
    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword =req.body.password;


    if (Originalpassword != inputPassword) {
      res.status(401).json("Wrong Password")
      return;
    }
    //to security and pimition to access without login again
    const accsessToken = jwt.sign({
       id:user.id,
       isAdmain:user.isAdmain,
    },process.env.JWT_SEC,
    {expiresIn:"3d"})

    const {password, ...others} = user._doc;

    res.status(200).json({...others,accsessToken})
  } catch (error) {
    res.status(500).json(error);
  }
}


//Login with admin

const userShop_authLog_postadmin = async (req, res) => {
  try {
    const user = await UserShop.findOne({username: req.body.username,isAdmain:true});
    if (!user) {
      res.status(401).json("Wrong Username!");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    
    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword =req.body.password;


    if (Originalpassword != inputPassword) {
      res.status(401).json("Wrong Password")
      return;
    }
    //to security and pimition to access without login again
    const accsessToken = jwt.sign({
       id:user.id,
       isAdmain:user.isAdmain,
    },process.env.JWT_SEC,
    {expiresIn:"3d"})

    const {password, ...others} = user._doc;

    res.status(200).json({...others,accsessToken})
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  userShop_authReg_post,
  userShop_authLog_post,
  userShop_authLog_postadmin
}