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
    <ColorCircle key={color} color={color}/>
  ));

  return (
    <div className="w-full max-w-sm sm:mx-0 mx-auto border border-gray-300 p-2 rounded-md flex flex-col gap-y-2 ">
      <Image
        imageSrc={imageURL}
        altText={title}
        className="rounded-md w-full h-52 lg:object-cover"
      />
      <h3 className=" text-lg font-semibold line-clamp-1">{title}</h3>
      <p className="text-xs text-gray-500 wrap-break-word line-clamp-2">
        {description}
      </p>
      <div className="flex items-center gap-x-1 flex-wrap">
        {renderProductColors}
      </div>
      <div className="flex gap-x-2  items-center justify-between">
        <span className="text-lg text-indigo-600 font-semibold ">{price}$</span>
        <Image
          imageSrc={category.imageURL}
          altText={category.name}
          className="w-10 h-10 rounded-full object-bottom cursor-pointer"
        />
      </div>
      <div className="flex gap-x-2 text-white mt-auto items-start">
        <Button
          className="bg-indigo-700   hover:bg-indigo-800"
          onClick={() => {
            console.log("clicked");
          }}
        >
          EDIT
        </Button>
        <Button
          className="bg-red-700  hover:bg-red-800"
          onClick={() => {
            alert("clicked");
          }}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
