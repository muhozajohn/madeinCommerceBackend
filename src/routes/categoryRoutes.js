import express from "express";
import fileUpload from "../helper/multer";
import {
  createCat,
  getAllCat,
  getOneCat,
  delCategory,
  upCategory,
} from "../controllers/categoryController";
const categoryRoutes = express.Router();

categoryRoutes.post("/create", fileUpload.single("files"), createCat);
categoryRoutes.get("/read", getAllCat);
categoryRoutes.get("/readOne/:id", getOneCat);
categoryRoutes.delete("/delete/:id", delCategory);
categoryRoutes.put("/update/:id", fileUpload.single("files"), upCategory);

export default categoryRoutes;
