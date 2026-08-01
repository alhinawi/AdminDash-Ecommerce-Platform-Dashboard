import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import ColorCircle from "./components/ui/ColorCircle";
import ErrorMessage from "./components/ui/ErrorMessage";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import Select from "./components/ui/Select";
import { categories, colors, formInputsList, productList } from "./data";
import type { Product } from "./interfaces";
import { productValidation } from "./schema";

function App() {
  const defaultProduct: Product = {
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
  const [products, setProducts] = useState<Product[]>(productList);
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, settempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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

    const errors = productValidation({ title, description, imageURL, price, colors: tempColors });
    console.log(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    console.log(hasErrors);

    if (!hasErrors) {
      setProducts((prevProducts) => [
        {
          ...product,
          id: uuid(),
          colors: tempColors,
          category: selectedCategory,
        },
        ...prevProducts,
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
    <div className="flex flex-col" key={input.id}>
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
      className="active:scale-90 active:ring-3"
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
        className="mx-auto mb-3 block bg-indigo-700 hover:bg-indigo-800"
        width="w-fit"
        onClick={open}
      >
        Add Product
      </Button>

      <div className="grid grid-cols-1 gap-2 rounded-md sm:grid-cols-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="flex flex-col gap-y-3" onSubmit={onSubmitHandler}>
          {renderFormInputs}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex flex-wrap justify-center gap-x-1">
            {RenderProductColors}
          </div>
          {tempColors.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {tempColors.map((color) => (
                <span
                  key={color}
                  className="cursor-pointer rounded-md px-2 py-1 text-xs text-white font-stretch-50%"
                  style={{ backgroundColor: color }}
                  onClick={() => removeColorHandler(color)}
                >
                  {color}
                </span>
              ))}
            </div>
          )}
          <ErrorMessage msg={errors.colors} />
          <div className="flex gap-x-3">
            <Button
              className="bg-gray-400 hover:bg-gray-500"
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
