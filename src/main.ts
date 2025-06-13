import express, { Express, Response, Request } from "express";
import { PORT } from "./secrets";
import rootRoutes from "./routes/main.route";
import { PrismaClient } from "@prisma/client";
import { log } from "console";
import { errorMiddleware } from "./middlewares/errors";
import { RegisterSchema } from "./schema/users";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Prisma Express Shop is working!!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRoutes);

export const prismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
}).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = RegisterSchema.parse(args.data);
        return query(args);
      },
    },
  },
  result: {
    adress: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true,
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}-${addr.pincode}`;
        },
      },
    },
  },
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
