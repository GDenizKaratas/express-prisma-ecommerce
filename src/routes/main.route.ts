import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./products.route";

const rootRoutes: Router = Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/products", productRoutes);

export default rootRoutes;
