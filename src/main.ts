import express, { Express, Response, Request } from "express";
import { PORT } from "./secrets";
import rootRoutes from "./routes/main.route";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Prisma Express Shop is working!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRoutes);

export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
