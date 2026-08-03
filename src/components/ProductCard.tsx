import Button from "./ui/Button";
import Image from "./Image";
import ColorCircle from "./ui/ColorCircle";
import type { Product } from "../interfaces";

interface Props {
  product?: Product;
}

const ProductCard = ({ product }: Props) => {
  if (!product) return null;

  const { imageURL, title, description, price, colors, category } = product;

  /* ------- RENDER -------  */

  const renderProductColors = colors.map((color) => (
    <ColorCircle key={color} color={color} />
  ));

  return (
    <div className="group relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-slate-700 hover:shadow-xl sm:mx-0 mx-auto">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
        <Image
          imageSrc={imageURL}
          altText={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col gap-y-2 pt-3">
        <h3 className="line-clamp-1 text-base font-bold text-gray-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {title}
        </h3>
        <p className="line-clamp-2 min-h-8 text-xs leading-relaxed text-gray-600 dark:text-slate-300 wrap-break-word">
          {description}
        </p>

        {/* Color Circles */}
        <div className="flex items-center gap-1.5 flex-wrap min-h-5.5 py-1">
          {colors.length > 0 ? (
            renderProductColors
          ) : (
            <span className="text-[11px] text-gray-500 dark:text-slate-400 italic">No colors available</span>
          )}
        </div>

        {/* Price & Category */}
        <div className="mt-auto flex items-center justify-between gap-x-2 pt-1">
          <span className="text-xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
            ${Number(price).toLocaleString("en-US")}
          </span>

          <div className="flex items-center gap-x-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-100/80 dark:bg-slate-800 px-2.5 py-1 shadow-2xs">
            <p className="text-xs font-semibold text-gray-800 dark:text-slate-200 capitalize">
              {category.name}
            </p>
            <Image
              imageSrc={category.imageURL}
              altText={category.name}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-gray-300 dark:ring-slate-600"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-x-2.5 pt-3">
          <Button
            type="button"
            className="bg-indigo-600 text-xs font-semibold tracking-wider text-white shadow-xs shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
            onClick={() => {
              /* Edit handler placeholder */
            }}
          >
            EDIT
          </Button>
          <Button
            type="button"
            className="bg-rose-600 text-xs font-semibold tracking-wider text-white shadow-xs shadow-rose-600/20 hover:bg-rose-700 hover:shadow-md transition-all duration-200"
            onClick={() => {
              /* Delete handler placeholder */
            }}
          >
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
