import { useTranslation } from "react-i18next";
import Button from "./ui/Button";
import Image from "./Image";
import ColorCircle from "./ui/ColorCircle";
import type { Product } from "../interfaces";
import { categories } from "../data";
import { Star } from "lucide-react";
import { getLocalizedText } from "../utils/productUtils";

interface Props {
  product?: Product;
  setProductToEdit: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

const ProductCard = ({ product, setProductToEdit, onDelete }: Props) => {
  const { t, i18n } = useTranslation();
  if (!product) return null;

  const currentLang = i18n.language || "en";

  const {
    imageURL,
    title,
    description,
    price,
    colors,
    category,
    stock = 15,
    sku = "SKU-PROD",
    rating = 4.8,
    reviewCount = 120,
  } = product;

  const displayTitle = getLocalizedText(title, currentLang);
  const displayDescription = getLocalizedText(description, currentLang);

  // Resolve category image from the canonical categories array (same source as Add Product modal)
  const canonicalCategory = categories.find(
    (c) => c.name.toLowerCase() === category.name.toLowerCase(),
  );
  const categoryImageURL = canonicalCategory?.imageURL ?? category.imageURL;

  /* ------- RENDER -------  */
  const renderProductColors = colors.map((color) => (
    <ColorCircle key={color} color={color} />
  ));

  // Stock status pill
  const isOutOfStock = stock === 0;

  const stockBadge = isOutOfStock ? (
    <span className="animate-pulse rounded-md border border-rose-500/30 bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-500 shadow-2xs backdrop-blur-md dark:text-rose-400">
      {t("products.outOfStock", "Out of Stock (0)")}
    </span>
  ) : stock <= 10 ? (
    <span className="rounded-md border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-500 shadow-2xs backdrop-blur-md dark:text-amber-400">
      {t("products.lowStock", {
        count: stock,
        defaultValue: `Low Stock (${stock})`,
      })}
    </span>
  ) : (
    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-500 shadow-2xs backdrop-blur-md dark:text-emerald-400">
      {t("products.inStock", {
        count: stock,
        defaultValue: `In Stock (${stock})`,
      })}
    </span>
  );
  {
    /* ------- HANDLER -------  */
  }

  const handleProductEdit = () => {
    setProductToEdit(product);
  };

  return (
    <div className="group relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-3.5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl sm:mx-0 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-2xl dark:hover:shadow-black/60">
      {/* Product Image Container */}
      <div className="relative aspect-16/19 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
        <Image
          imageSrc={imageURL}
          altText={displayTitle}
          categoryName={category.name}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            isOutOfStock ? "opacity-80 saturate-50" : ""
          }`}
        />

        {/* Top Badges overlay */}
        <div className="pointer-events-none absolute top-2 right-2 left-2 flex items-center justify-between">
          <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-zinc-200 backdrop-blur-md">
            {sku}
          </span>
          {stockBadge}
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col gap-y-2 pt-3">
        {/* Rating and Reviews */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-gray-900 dark:text-white">
              {rating}
            </span>
            <span className="text-[11px] text-gray-400 dark:text-slate-500">
              ({reviewCount})
            </span>
          </div>
          <span className="text-[11px] font-medium text-gray-400 capitalize dark:text-slate-500">
            {t("categories." + category.name.toLowerCase(), category.name)}
          </span>
        </div>

        <h3 className="group-hover:text-accent line-clamp-1 text-base font-bold text-gray-900 transition-colors dark:text-white">
          {displayTitle}
        </h3>
        <p className="line-clamp-2 min-h-8 text-xs leading-relaxed wrap-break-word text-gray-600 dark:text-slate-300">
          {displayDescription}
        </p>

        {/* Color Circles */}
        <div className="flex min-h-5.5 flex-wrap items-center gap-1.5 py-1">
          {colors.length > 0 ? (
            renderProductColors
          ) : (
            <span className="text-[11px] text-gray-500 italic dark:text-slate-400">
              {t("products.noColors", "No colors available")}
            </span>
          )}
        </div>

        {/* Price & Category */}
        <div className="mt-auto flex items-center justify-between gap-x-2 pt-1">
          <span className="text-accent text-xl font-extrabold tracking-tight">
            ${Number(price).toLocaleString("en-US")}
          </span>

          <div className="flex items-center gap-x-1.5 rounded-full border border-gray-200 bg-gray-100/80 px-2.5 py-1 shadow-2xs dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-semibold text-gray-800 capitalize dark:text-slate-200">
              {t("categories." + category.name.toLowerCase(), category.name)}
            </p>
            <Image
              imageSrc={categoryImageURL}
              altText={category.name}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-gray-300 dark:ring-slate-600"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-x-2.5 pt-3">
          <Button
            type="button"
            className="bg-accent shadow-accent-glow hover:bg-accent-hover text-xs font-semibold tracking-wider text-white shadow-xs transition-all duration-200 hover:shadow-md"
            onClick={handleProductEdit}
          >
            {t("products.edit", "EDIT")}
          </Button>
          <Button
            type="button"
            className="bg-rose-600 text-xs font-semibold tracking-wider text-white shadow-xs shadow-rose-600/20 transition-all duration-200 hover:bg-rose-700 hover:shadow-md"
            onClick={() => {
              if (product?.id && onDelete) {
                onDelete(product.id);
              }
            }}
          >
            {t("products.delete", "DELETE")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
