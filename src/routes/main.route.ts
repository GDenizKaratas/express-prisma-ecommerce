import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./products.route";
import userRoutes from "./users.route";

const rootRoutes: Router = Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/products", productRoutes);
rootRoutes.use("/users", userRoutes);

export default rootRoutes;
