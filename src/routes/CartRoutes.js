import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/CartController";
import fileUpload from "../helper/multer";
import { Authorization } from "../middleware/customerAutho";
const cartRouter = express.Router();

cartRouter.get("/read", getCart);
cartRouter.post(
  "/addToCart/productId/:id",
  fileUpload.single("addToCart"),
  Authorization,
  addToCart
);

cartRouter.delete("/removeProduct/:id", Authorization, removeFromCart);

export default cartRouter;
