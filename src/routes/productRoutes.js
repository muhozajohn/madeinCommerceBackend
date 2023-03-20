import {
  createProduct,
  getAllProducts,
  getOneProduct,
  deletePoducts,
  updateProduct,
} from "../controllers/productsController";
import fileUpload from "../helper/multer";
import { Authorization } from "../middleware/vendorAutho";
import express from "express";
const productRoutes = express.Router();

productRoutes.post(
  "/create",
  fileUpload.single("productImage"),
  Authorization,
  createProduct
);
productRoutes.get("/read/", getAllProducts);
productRoutes.get("/readOne/:id", getOneProduct);
productRoutes.delete("/delete/:id", deletePoducts);
productRoutes.put(
  "/update/:id",
  fileUpload.single("productImage"),
  updateProduct
);

export default productRoutes;
