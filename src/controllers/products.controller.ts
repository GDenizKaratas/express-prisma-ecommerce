import { Response } from "express";
import { CustomRequest } from "../types/customRequest.interface";
import { prismaClient } from "../main";

export const createProduct = async (req: CustomRequest, res: Response) => {
  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.json(product);
};
