import { Router } from "express";
import {
  login,
  logout,
  register,
  updateUserProfile,
  deleteUserProfile,
  changePassword,
  forgotPassword,
  me,
} from "../controllers/auth.controller";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", errorHandler(register));
authRoutes.get("/me", authMiddleware, errorHandler(me));
authRoutes.post("/logout", logout);
authRoutes.put("/profile", updateUserProfile);
authRoutes.delete("/profile", deleteUserProfile);
authRoutes.post("/change-password", changePassword);
authRoutes.post("/forgot-password", forgotPassword);

export default authRoutes;
