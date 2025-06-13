import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin-role";
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from "../controllers/cart.controller";

const cartRoutes: Router = Router();

cartRoutes.get("/", [authMiddleware], errorHandler(getCart));
cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));

export default cartRoutes;
