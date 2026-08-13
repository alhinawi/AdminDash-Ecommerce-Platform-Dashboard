import i18n from "../i18n";
import type { ProductFormErrors, ProductFormFields } from "../types";

export const productValidation = (product: ProductFormFields) => {
  const errors: ProductFormErrors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = i18n.t(
      "validation.titleLength",
      "Product title must be between 10 and 80 characters!",
    );
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = i18n.t(
      "validation.descLength",
      "Product description must be between 10 and 900 characters!",
    );
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = i18n.t(
      "validation.validImageUrl",
      "Valid image URL is required",
    );
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = i18n.t("validation.validPrice", "Valid price is required!");
  }

  if (!product.colors.length) {
    errors.colors = i18n.t(
      "validation.selectColor",
      "Please select at least one color!",
    );
  }

  return errors;
};
