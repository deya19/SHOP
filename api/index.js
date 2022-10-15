//Setting of Express
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require('body-parser')

app.get("/", (req, res) => {
  res.send("Hello World!");
});



//secret 
const dotenv = require("dotenv");
dotenv.config();




// mongoose
const mongoose = require('mongoose');
 
mongoose.connect(process.env.MONGO_URL)
  .then( result => {
    app.listen(process.env.PORT||port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch( err => {
    console.log(err);
  }); 




//....................................................................................................................................
//..control of my website:
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")


// cors
const cors = require("cors")

//For all path
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/products',productRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);
app.use('/api/checkout',stripeRoute);




//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});