import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./products.route";
import userRoutes from "./users.route";
import cartRoutes from "./carts.route";

const rootRoutes: Router = Router();

rootRoutes.use("/auth", authRoutes);
rootRoutes.use("/products", productRoutes);
rootRoutes.use("/users", userRoutes);
rootRoutes.use("/carts", cartRoutes);

export default rootRoutes;
