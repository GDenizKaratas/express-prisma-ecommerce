import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin-role";
import { errorHandler } from "../error-handler";
import {
  addAddress,
  changeUserRole,
  deleteAddress,
  getUserById,
  listAddress,
  listUsers,
  updateUser,
} from "../controllers/users.controller";

const userRoutes: Router = Router();

userRoutes.get("/", [authMiddleware, adminMiddleware], errorHandler(listUsers));
userRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getUserById)
);
userRoutes.put(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(changeUserRole)
);
userRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
userRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);
userRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
userRoutes.put("/", [authMiddleware], errorHandler(updateUser));

export default userRoutes;
