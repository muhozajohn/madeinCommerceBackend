import express from "express";
import {
  signUp,
  getAllUsers,
  getById,
  upDate,
  delUser,
  login,
  verifyEmail,
} from "../controllers/userController";
import fileUpload from "../helper/multer";
const userRoutes = express.Router();

userRoutes.post("/signUp", fileUpload.single("profile"), signUp);
userRoutes.get("/getAll", getAllUsers);
userRoutes.get("/getOne/:id", getById);
userRoutes.get("/verifyEmail/:id", verifyEmail);
userRoutes.put("/upDate/:id", fileUpload.single("profile"), upDate);
userRoutes.post("/login", fileUpload.single("profile"), login);
userRoutes.delete("/delete/:id", delUser);

export default userRoutes;
