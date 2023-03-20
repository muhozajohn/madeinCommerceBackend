import express from "express";
import {
  getVendor,
  createVendor,
  getOneVendor,
  deleteVendor,
  updateVendor,
  loginVendor,
} from "../controllers/vendorController";
import fileUpload from "../helper/multer";
const VendorsRoutes = express.Router();

VendorsRoutes.get("/read", getVendor);
VendorsRoutes.post("/create", fileUpload.single("profile"), createVendor);
VendorsRoutes.get("/readOne/:id", getOneVendor);
VendorsRoutes.delete("/delete/:id", deleteVendor);
VendorsRoutes.post("/login", fileUpload.single("profile"), loginVendor);
VendorsRoutes.put("/update/:id", fileUpload.single("profile"), updateVendor);

export default VendorsRoutes;
