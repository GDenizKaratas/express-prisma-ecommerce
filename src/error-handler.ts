import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpExeption } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exeptions";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let inception: HttpExeption;
      if (error instanceof HttpExeption) {
        inception = error;
      } else {
        inception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }

      next(inception);
    }
  };
};
