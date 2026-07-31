import { useState } from "react";
import { productList, formInputsList, colors } from "./data";
import type { IProduct } from "./interfaces";
import type { ChangeEvent, SubmitEvent } from "react";
import ProductCard from "./components/ProductCard";
import ErrorMessage from "./components/ui/ErrorMessage";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import { productValidation } from "./schema";
import ColorCircle from "./components/ui/ColorCircle";
import { v4 as uuid } from "uuid";

function App() {
  const defaultProduct: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /* ------- STATE -------  */
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, settempColors] = useState<string[]>([]);

  /* ------- HANDLER -------  */

  const open = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const onSubmitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, imageURL, price } = product;

    const errors = productValidation({ title, description, imageURL, price });
    console.log(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    console.log(hasErrors);

    if (!hasErrors) {
      setProducts((prevProducts) => [
        { ...product, id: uuid(), colors: tempColors }, ...prevProducts,
      ]);
      setProduct(defaultProduct);
      settempColors([]);
      closeModal();
    } else {
      setErrors(errors);
      console.log("Form has errors. Please fix them before submitting.");
    }
  };

  const onCancelHandler = () => {
    setProduct(defaultProduct);
    settempColors([]);
    closeModal();
  };

  const removeColorHandler = (color: string) => {
    settempColors((prevColors) =>
      prevColors.filter((prevColor) => prevColor !== color),
    );
  };

  /* ------- RENDER -------  */

  const renderProductList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col " key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-0.5 text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        name={input.name}
        id={input.id}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const RenderProductColors = colors.map((color) => (
    <ColorCircle
      color={color}
      key={color}
      onClick={() =>
        settempColors((prevColors) => {
          if (prevColors.includes(color)) {
            return prevColors.filter((prevColor) => prevColor !== color);
          }
          return [...prevColors, color];
        })
      }
    />
  ));

  return (
    <main className="container mx-auto p-5">
      <Button
        className="bg-indigo-700 hover:bg-indigo-800 mb-3 mx-auto block"
        width="w-fit"
        onClick={open}
      >
        Add Product
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-2 md:gap-4 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="flex flex-col gap-y-3 " onSubmit={onSubmitHandler}>
          {renderFormInputs}
          <div className="flex gap-x-1 flex-wrap justify-center">
            {RenderProductColors}
          </div>
          <div className="flex items-center flex-wrap gap-2 justify-center">
            {tempColors.map((color) => (
              <span
                key={color}
                className="rounded-md px-2 py-1 text-xs font-stretch-50% text-white cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => removeColorHandler(color)}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex gap-x-3">
            <Button
              className="bg-gray-400  hover:bg-gray-500"
              type="button"
              onClick={onCancelHandler}
            >
              Cancel
            </Button>
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}

export default App;
