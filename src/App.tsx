import type { ChangeEvent, SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AnalyticsCharts from "./components/AnalyticsCharts";
import FilterBar from "./components/FilterBar";
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
import Toast, { type ToastMessage } from "./components/ui/Toast";
import UsersPage from "./components/users/UsersPage";
import { categories, colors, formInputsList, productList } from "./data";
import type { Product } from "./interfaces";
import { productValidation } from "./schema";

function ProductsView({
  open,
  products,
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
}: {
  open: () => void;
  products: Product[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}) {
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === "all" ||
        p.category.name.toLowerCase() === filterCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return a.title.localeCompare(b.title);
      return 0;
    });

  const renderProductList = filteredProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <main className="container mx-auto flex-1 p-5 pt-8">
      <Hero onAddProduct={open} />

      <div id="analytics-section" className="scroll-mt-24">
        <KpiStats products={products} />
      </div>

      <div id="categories-section" className="scroll-mt-24">
        <AnalyticsCharts products={products} />
      </div>

      {/* Filter, Search & Sort Control Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={filterCategory}
        setSelectedCategory={setFilterCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        totalResults={filteredProducts.length}
        totalProducts={products.length}
      />

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div
          id="products-grid"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {renderProductList}
        </div>
      ) : (
        <div className="my-6 rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-3xl">🔍</span>
          <h4 className="mt-3 text-base font-bold text-gray-900 dark:text-white">
            No products found
          </h4>
          <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
            No items match your search query or filter criteria. Try resetting
            filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setFilterCategory("all");
              setSortBy("default");
            }}
            className="mt-4 cursor-pointer rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Reset Filters
          </button>
        </div>
      )}
    </main>
  );
}

function AppContent() {
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
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      document.body.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

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

  /* ------- SEARCH & FILTER STATE ------- */
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  /* ------- TOAST NOTIFICATIONS STATE ------- */
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    type: "success" | "error" | "info",
    title: string,
    message: string,
  ) => {
    const id = uuid();
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  /* ------- HANDLERS -------  */
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

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (!hasErrors) {
      const newProduct: Product = {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      };

      setProducts((prevProducts) => [newProduct, ...prevProducts]);
      setProduct(defaultProduct);
      settempColors([]);
      closeModal();

      addToast(
        "success",
        "Product Created! 🎉",
        `"${title}" has been added to the catalog.`,
      );
    } else {
      setErrors(errors);
      addToast(
        "error",
        "Validation Failed ⚠️",
        "Please check the form inputs before submitting.",
      );
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

  const renderFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-1.5 text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-zinc-300"
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
    <div className="relative flex min-h-screen flex-col bg-zinc-50/50 font-sans text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar
        onAddProduct={open}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProductsView
              open={open}
              products={products}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          }
        />
        <Route path="/users" element={<UsersPage />} />
      </Routes>

      <Footer />

      {/* Floating Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Add Product Modal */}
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
                ? "mt-1 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
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
              className="border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              type="button"
              onClick={onCancelHandler}
            >
              Cancel
            </Button>
            <Button className="bg-zinc-900 font-semibold text-white shadow-xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
