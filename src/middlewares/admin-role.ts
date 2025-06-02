import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { CustomRequest } from "../types/customRequest.interface";

const adminMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  console.log("USER:", user);
  if (user.role == "ADMIN") {
    return next();
  } else {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default adminMiddleware;
