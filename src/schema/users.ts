import { count } from "console";
import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().optional(),
  pincode: z.string().length(6),
  country: z.string(),
  city: z.string(),
});

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddress: z.number().optional().nullable(),
  defaultBillingAddress: z.number().optional().nullable(),
});
