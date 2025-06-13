import { Response } from "express";
import { CustomRequest } from "../types/customRequest.interface";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { prismaClient } from "../main";
import { NotFoundException } from "../exceptions/not-found-exception";
import { ErrorCode } from "../exceptions/root";
import { Adress } from "@prisma/client";
import { BadRequestsException } from "../exceptions/bad-requests";

export const addAddress = async (req: CustomRequest, res: Response) => {
  AddressSchema.parse(req.body);
  console.log("REQ", req);

  const address = await prismaClient.adress.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  });

  res.json(address);
};
export const deleteAddress = async (req: CustomRequest, res: Response) => {
  try {
    await prismaClient.adress.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({ success: true });
  } catch (error) {
    throw new NotFoundException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
};
export const listAddress = async (req: CustomRequest, res: Response) => {
  const addresses = await prismaClient.adress.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json(addresses);
};

export const updateUser = async (req: CustomRequest, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Adress;
  let billingAddress: Adress;
  if (validatedData.defaultShippingAddress) {
    try {
      shippingAddress = await prismaClient.adress.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (shippingAddress.userId != req.user.id) {
      throw new BadRequestsException(
        "Address does not belong to user!",
        ErrorCode.ADDRESS_DOES_NOT_BELONG
      );
    }
  }

  if (validatedData.defaultBillingAddress) {
    try {
      billingAddress = await prismaClient.adress.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }

    if (billingAddress.userId != req.user.id) {
      throw new BadRequestsException(
        "Address does not belong to user!",
        ErrorCode.ADDRESS_DOES_NOT_BELONG
      );
    }
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: req.user.id,
    },
    data: validatedData,
  });

  res.json(updatedUser);
};

export const listUsers = async (req: CustomRequest, res: Response) => {
  const users = await prismaClient.user.findMany({
    skip: Number(req.query.skip) || 0,
    take: 5,
  });

  res.json(users);
};
export const getUserById = async (req: CustomRequest, res: Response) => {
  try {
    const user = await prismaClient.user.findFirstOrThrow({
      where: {
        id: Number(req.params.id),
      },
      include: {
        addesses: true,
      },
    });
    res.json(user);
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
};
export const changeUserRole = async (req: CustomRequest, res: Response) => {
  //Validation
  try {
    const user = await prismaClient.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        role: req.body.role,
      },
    });
    res.json(user);
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
};
