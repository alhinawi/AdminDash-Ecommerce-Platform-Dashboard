import type { ProductFormFields } from "../types";

export interface Product {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  stock?: number;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  category: {
    name: string;
    imageURL: string;
  };
}

export interface FormInput {
  id: string;
  name: keyof ProductFormFields;
  label: string;
  type: string;
}

export interface Category {
  id: string;
  name: string;
  imageURL: string;
}
