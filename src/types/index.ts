import type { Product } from "../interfaces";

export type ProductFormFields = Pick<
  Product,
  "title" | "description" | "imageURL" | "price" | "colors"
>;

export type ProductFormErrors = Record<keyof ProductFormFields, string>;
