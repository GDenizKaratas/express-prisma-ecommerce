import { Request, Response } from "express";
import { prismaClient } from "../main";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw Error("User does not exist!!");
  }

  if (!compareSync(password, user.password)) {
    throw Error("Incorrect password!");
  }

  const token = jwt.sign(
    { user: { id: user.id, email: user.email } },
    JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token,
  });
};
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    throw Error("User already exists");
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
export const logout = async (req: Request, res: Response) => {
  res.send("Logout endpoint");
};
export const getUserProfile = async (req: Request, res: Response) => {
  res.send("User profile endpoint");
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
