import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpExeption } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exeptions";
import { ZodError } from "zod";
import { BadRequestsException } from "./exceptions/bad-requests";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpExeption;
      console.log("Error caught in error handler:", error);
      if (error instanceof HttpExeption) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestsException(
            "Unprocessable Entity",
            ErrorCode.UNPROCESSABLE_ENTITY,
            error.errors
          );
        } else {
          exception = new InternalException(
            "Something went wrong!",
            error,
            ErrorCode.INTERNAL_EXCEPTION
          );
        }
      }

      next(exception);
    }
  };
};
