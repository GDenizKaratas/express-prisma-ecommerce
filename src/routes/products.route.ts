import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct } from "../controllers/products.controller";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin-role";

const productRoutes: Router = Router();

productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);

export default productRoutes;
