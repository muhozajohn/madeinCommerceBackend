import express from "express";
const adminRoutes = express.Router();
import {
  approvedReq,
  getAllReq,
  approve,
  Reject,
  getOneShop,
  getShop,
  updateShop,
} from "../controllers/adminController";
import fileUpload from "../helper/multer";
adminRoutes.put("/aproveReq/:id", fileUpload.single("files"), approvedReq);
adminRoutes.put("/aprove/:id", fileUpload.single("files"), approve);
adminRoutes.put("/update/:id", fileUpload.single("files"), updateShop);
adminRoutes.get("/read", fileUpload.single("files"), getAllReq);
adminRoutes.delete("/delete/:id", Reject);
adminRoutes.get("/readOne/:id", getOneShop);
adminRoutes.get("/readShop", getShop);

export default adminRoutes;
