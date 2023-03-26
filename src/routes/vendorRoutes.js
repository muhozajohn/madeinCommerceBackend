import express from "express";
import { VendorRequest } from "../controllers/vendorReq";
import { AccountAutho } from "../middleware/account";
import fileUpload from "../helper/multer";
const vendorRoutes = express.Router();

vendorRoutes.post(
  "/create",
  AccountAutho,
  fileUpload.single("files"),
  VendorRequest
);

export default vendorRoutes;
