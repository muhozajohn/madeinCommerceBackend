import { Op } from "sequelize";
import express from "express";
import { Orders, Cart, Products } from "../dbase/models/";
import axios from "axios";

import { Authorization } from "../middleware/customerAutho";

const router = express.Router();

const createPayment = async (phoneNumber, totalAmount) => {
  const body = {
    telephoneNumber: phoneNumber,
    amount: totalAmount,
    organizationId: "fc2861f7-91c7-425d-8121-7f5d7313c9f3",
    description: "Payment for order",
    callbackUrl: "https://webhook.site/beeccdd5-ae23-4ec2-9390-0279598cba15",
  };

  try {
    const response = await axios.post(
      "https://opay-api.oltranz.com/opay/paymentrequest",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

router.post("/request", Authorization, async (req, res) => {
  const allCarts = await Cart.findAll();
  let ids = allCarts.map((cart) => cart.productId);

  const productInCart = await Products.findAll({
    where: {
      id: {
        [Op.in]: ids, // use the "in" operator to match multiple IDs
      },
    },
  });
  const totalAmount = productInCart.reduce(
    (acc, current) => acc + current.productPrice,
    0
  );

  console.log(totalAmount);

  const response = await createPayment(req.body.phoneNumber, "12");
  if (response.code === "200") {
    const order = await Orders.create({
      customerId: req.Users.id,
      productOrdered: productInCart,
      totalPrice: totalAmount,
      phoneNumber: req.body.phoneNumber,
    });
    return res.status(200).json({
      statusbar: "success",
      message: "Order created successfully",
      productInCart,
      totalAmount,
      phoneNumber: req.body.phoneNumber,
    });
  } else {
    return res.status(400).json({
      statusbar: "error",
      message: "Insufient funds  on your  mobile money account",
    });
  }

  //   const res  =await
});

export default router;
