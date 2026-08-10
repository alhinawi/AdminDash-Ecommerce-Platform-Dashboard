export interface ProductFormFields {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}

export type ProductFormErrors = Record<keyof ProductFormFields, string>;
