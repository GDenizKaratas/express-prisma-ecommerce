import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../main";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { RegisterSchema } from "../schema/users";
import { CustomRequest } from "../types/customRequest.interface";

export const register = async (req: Request, res: Response) => {
  RegisterSchema.parse(req.body); // Validate request body against the schema
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    throw new BadRequestsException(
      "User already exists!",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }
  user = await prismaClient.user.create({
    data: {
      email: email,
      password: hashSync(password, 10), // Hash the password
      name: name,
    },
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new BadRequestsException("User not exist!", ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestsException(
      "Incorrect password!",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign(
    { user: { id: user.id, email: user.email, role: user.role } },
    JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token,
  });
};

export const me = async (req: CustomRequest, res: Response) => {
  res.json(req.user);
};

export const logout = async (req: Request, res: Response) => {
  res.send("Logout endpoint");
};
export const updateUserProfile = async (req: Request, res: Response) => {
  res.send("Update user profile endpoint");
};
export const deleteUserProfile = async (req: Request, res: Response) => {
  res.send("Delete user profile endpoint");
};
export const changePassword = async (req: Request, res: Response) => {
  res.send("Change password endpoint");
};
export const forgotPassword = async (req: Request, res: Response) => {};
