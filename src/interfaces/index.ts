import type { ProductFormFields } from "../types";

export interface LocalizedText {
  en: string;
  ar: string;
  es: string;
  de: string;
  fr: string;
}

export interface Product {
  id?: string | undefined;
  title: string | LocalizedText;
  description: string | LocalizedText;
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
