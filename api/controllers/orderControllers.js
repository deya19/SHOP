const OrderShop = require("../models/Order");


//CREATE
const orderShop_order_post = async (req, res) => {
  const newOrder = new OrderShop(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
}

//UPDATE
const orderShop_order_put = async (req, res) => {
  try {
    const updatedOrder = await OrderShop.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
}


//DELETE
const orderShop_order_delete = async (req, res) => {
  try {
    await OrderShop.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
}



//GET USER ORDERS
const orderShop_oneOrder_get = async (req, res) => {
  try {
    const orders = await OrderShop.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};


//GET ALL
const orderShop_order_get = async (req, res) => {
  try {
    const orders = await OrderShop.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(200).json(error);
  }
}


//GET MONTHLY INCOME
const orderShop_orderIncome_get = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await OrderShop.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = {
  orderShop_order_post,
  orderShop_order_put ,
  orderShop_order_delete,
  orderShop_oneOrder_get,
  orderShop_order_get,
  orderShop_orderIncome_get 
}
