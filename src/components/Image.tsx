import { useState } from "react";

import {
  Armchair,
  Camera,
  Car,
  Footprints,
  ImageOff,
  Laptop,
  Shirt,
  Watch,
} from "lucide-react";

import { cn } from "../utils/cn";

interface Props {
  imageSrc?: string;
  altText?: string;
  className?: string;
  categoryName?: string;
}

const CategoryIcon = ({
  categoryName,
  className,
}: {
  categoryName?: string;
  className?: string;
}) => {
  const cat = categoryName?.toLowerCase() || "";
  if (cat.includes("electronic")) return <Laptop className={className} />;
  if (cat.includes("clot")) return <Shirt className={className} />;
  if (cat.includes("photo") || cat.includes("camera"))
    return <Camera className={className} />;
  if (cat.includes("furnit")) return <Armchair className={className} />;
  if (cat.includes("sneak") || cat.includes("shoe"))
    return <Footprints className={className} />;
  if (cat.includes("auto") || cat.includes("car"))
    return <Car className={className} />;
  if (cat.includes("access")) return <Watch className={className} />;
  return <ImageOff className={className} />;
};

const Image = ({ imageSrc, altText, className, categoryName }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!imageSrc || hasError) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center border border-gray-200/50 bg-linear-to-br from-slate-100 to-gray-200 p-4 text-gray-400 dark:border-slate-700/50 dark:from-slate-800 dark:to-zinc-900 dark:text-slate-500",
          className,
        )}
      >
        <CategoryIcon
          categoryName={categoryName}
          className="mb-1.5 h-8 w-8 text-indigo-500/80 opacity-60"
        />
        <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase dark:text-slate-400">
          {categoryName || "Product"}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex animate-pulse items-center justify-center bg-gray-200 dark:bg-slate-800">
          <CategoryIcon
            categoryName={categoryName}
            className="h-6 w-6 animate-bounce text-gray-400 opacity-40 dark:text-slate-600"
          />
        </div>
      )}

      {/* Main Image */}
      <img
        src={imageSrc}
        alt={altText || "Product Image"}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
      />
    </div>
  );
};

export default Image;
