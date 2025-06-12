import { Response } from "express";
import { CustomRequest } from "../types/customRequest.interface";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { ErrorCode } from "../exceptions/root";
import { Product, User } from "@prisma/client";
import { prismaClient } from "../main";
import { NotFoundException } from "../exceptions/not-found-exception";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const addItemToCart = async (req: CustomRequest, res: Response) => {
  //Check if the existance of the same product in user's cart and alter quantity as required
  const validatedData = CreateCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Product not found!",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  const cart = await prismaClient.cartItem.create({
    data: {
      userId: req.user.id,
      productId: validatedData.productId,
      quantity: validatedData.quantity,
    },
  });

  res.json(cart);
};
export const deleteItemFromCart = async (req: CustomRequest, res: Response) => {
  //Check if user deleting its own cart item
  try {
    const cartItem = await prismaClient.cartItem.findFirstOrThrow({
      where: {
        id: Number(req.params.id),
      },
    });
    if (cartItem.userId !== req.user.id) {
      throw new UnauthorizedException(
        "Unauthorized access",
        ErrorCode.UNAUTHORIZED
      );
    }
  } catch (error) {
    throw new NotFoundException(
      "Cart Item not found",
      ErrorCode.CART_ITEM_NOT_FOUND
    );
  }
  await prismaClient.cartItem.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json({ success: true });
};
export const changeQuantity = async (req: CustomRequest, res: Response) => {
  const validatedData = ChangeQuantitySchema.parse(req.body);

  //Check if user updating its own cart item
  try {
    const cartItem = await prismaClient.cartItem.findFirstOrThrow({
      where: {
        id: Number(req.params.id),
      },
    });
    if (cartItem.userId !== req.user.id) {
      throw new UnauthorizedException(
        "Unauthorized access",
        ErrorCode.UNAUTHORIZED
      );
    }
  } catch (error) {
    throw new NotFoundException(
      "Cart Item not found",
      ErrorCode.CART_ITEM_NOT_FOUND
    );
  }

  const updatedCart = await prismaClient.cartItem.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      quantity: validatedData.quantity,
    },
  });

  res.json(updatedCart);
};
export const getCart = async (req: CustomRequest, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      product: true,
    },
  });

  res.json(cart);
};
