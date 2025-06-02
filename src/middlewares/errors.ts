import { Request, Response } from "express";
import { HttpExeption } from "../exceptions/root";

export const errorMiddleware = (
  error: HttpExeption,
  req: Request,
  res: Response,
  next: Function
) => {
  const statusCode = error.statusCode || 500;
  const response = {
    status: "error",
    message: error.message || "Internal Server Error",
    errorCode: error.errorCode || "INTERNAL_SERVER_ERROR",
    errors: error.errors || null,
  };
  res.status(statusCode).json(response);
  //next();
};
