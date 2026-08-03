import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import AnalyticsCharts from "./components/AnalyticsCharts";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import KpiStats from "./components/KpiStats";
import Navbar from "./components/Navbar";
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

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });
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
        className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-700"
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

  const renderProductColors = colors.map((color) => (
    <ColorCircle
      color={color}
      key={color}
      isSelected={tempColors.includes(color)}
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
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-900">
      <Navbar onAddProduct={open} />

      <main className="container mx-auto flex-1 p-5 pt-8">
        <Hero onAddProduct={open} />

        <KpiStats products={products} />

        <AnalyticsCharts products={products} />

        <div
          id="products-grid"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {renderProductList}
        </div>
      </main>

      <Footer />
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="flex flex-col gap-y-3" onSubmit={onSubmitHandler}>
          {renderFormInputs}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex flex-wrap items-center justify-center gap-2 py-1">
            {renderProductColors}
          </div>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              tempColors.length > 0
                ? "grid-rows-[1fr] opacity-100 mt-1"
                : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex flex-wrap items-center justify-center gap-1.5 py-1.5">
                {tempColors.map((color) => (
                  <span
                    key={color}
                    className="inline-flex cursor-pointer items-center gap-x-1 rounded-md px-2.5 py-1 text-xs font-medium text-white shadow-xs transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                    style={{ backgroundColor: color }}
                    onClick={() => removeColorHandler(color)}
                  >
                    {color}
                    <span className="ml-0.5 text-[10px] font-bold opacity-75 hover:opacity-100">
                      ×
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ErrorMessage msg={errors.colors} />
          <div className="flex items-center gap-x-3 pt-2">
            <Button
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200"
              type="button"
              onClick={onCancelHandler}
            >
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
