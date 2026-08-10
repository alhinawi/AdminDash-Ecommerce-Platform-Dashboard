import type { LocalizedText, Product } from "../interfaces";

export const getLocalizedText = (
  text: string | LocalizedText | undefined | null,
  lang: string = "en",
): string => {
  if (!text) return "";
  if (typeof text === "string") return text;
  const langKey = (lang || "en").substring(0, 2) as keyof LocalizedText;
  return text[langKey] || text.en || Object.values(text)[0] || "";
};

export const getProductTitle = (
  product: Product,
  lang: string = "en",
): string => {
  return getLocalizedText(product.title, lang);
};

export const getProductDescription = (
  product: Product,
  lang: string = "en",
): string => {
  return getLocalizedText(product.description, lang);
};
