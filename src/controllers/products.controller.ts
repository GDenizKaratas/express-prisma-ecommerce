import { Response } from "express";
import { CustomRequest } from "../types/customRequest.interface";
import { prismaClient } from "../main";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found-exception";

export const createProduct = async (req: CustomRequest, res: Response) => {
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.json(product);
};

export const updateProduct = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    const product = req.body;

    if (product.tags) {
      product.tags = product.tags.join(",");
    }

    const updatedProduct = await prismaClient.product.update({
      where: { id: Number(id) },
      data: product,
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const deleteProduct = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  await prismaClient.product.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};

export const listProducts = async (req: CustomRequest, res: Response) => {
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip: req.query.skip ? Number(req.query.skip) : 0,
    take: 5,
  });

  res.json({ count, data: products });
};

export const getProductById = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prismaClient.product.findFirstOrThrow({
      where: { id: Number(id) },
    });

    res.json(product);
  } catch (error) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};
