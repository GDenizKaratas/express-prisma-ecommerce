import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const API_KEY = process.env.API;
