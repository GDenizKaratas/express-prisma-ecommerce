import { Response } from "express";
import { CustomRequest } from "../types/customRequest.interface";
import { AddressSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCode } from "../exceptions/root";
import { User } from "@prisma/client";
import { prismaClient } from "../main";

export const addAddress = async (req: CustomRequest, res: Response) => {
  AddressSchema.parse(req.body);
  let user: User;
  try {
    user = await prismaClient.user.findFirstOrThrow({
      where: {
        id: req.user.userId,
      },
    });
  } catch (error) {
    console.log("Error fetching user:", error);
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const address = await prismaClient.adress.create({
    data: {
      ...req.body,
      userId: user.id,
    },
  });

  res.json(address);
};
export const deleteAddress = async (req: CustomRequest, res: Response) => {};
export const listAddress = async (req: CustomRequest, res: Response) => {};
