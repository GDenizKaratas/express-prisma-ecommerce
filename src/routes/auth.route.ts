import { Router } from "express";
import {
  login,
  logout,
  register,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  changePassword,
  forgotPassword,
} from "../controllers/auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.post("/logout", logout);
authRoutes.get("/profile", getUserProfile);
authRoutes.put("/profile", updateUserProfile);
authRoutes.delete("/profile", deleteUserProfile);
authRoutes.post("/change-password", changePassword);
authRoutes.post("/forgot-password", forgotPassword);

export default authRoutes;
