import express from "express";
import { getCart, addToCart } from "../controllers/CartController";
import fileUpload from "../helper/multer";
import { Authorization } from "../middleware/customerAutho";
const cartRouter = express.Router();

cartRouter.get("/read", getCart);
cartRouter.post(
  "/addToCart",
  fileUpload.single("addToCart"),
  Authorization,
  addToCart
);

export default cartRouter;
