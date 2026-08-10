import type { ChangeEvent, SubmitEvent } from "react";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { getLocalizedText } from "./utils/productUtils";

import SettingsPage from "./pages/settings/SettingsPage";
import UsersPage from "./pages/users/UsersPage";
import LoginPage from "./pages/login/LoginPage";

import { categories, colors, formInputsList, productList } from "./data";
import type { Product } from "./interfaces";
import { productValidation } from "./schema";

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  isMobile: boolean = false,
): (number | string)[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const delta = isMobile ? 1 : 2;

  const left = currentPage - delta;
  const right = currentPage + delta;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | null = null;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l !== null) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }

    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

function ProductsView({
  open,
  products,
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
  setProductToEdit,
  onDeleteProduct,
}: {
  open: () => void;
  products: Product[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterCategory: string;
  setFilterCategory: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  setProductToEdit: (selectedProduct: Product) => void;
  onDeleteProduct?: (productId: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("products_dashboard_page");

      if (saved) {
        const parsed = parseInt(saved, 10);
        return parsed > 0 ? parsed : 1;
      }
    }

    return 1;
  });

  const [stockStatus, setStockStatus] = useState("all");

  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }

    return 1024;
  });

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 8;
      if (window.innerWidth >= 640) return 6;

      return 4;
    }

    return 8;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setWindowWidth(width);

      if (width >= 1024) {
        setItemsPerPage(8);
      } else if (width >= 640) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(4);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  useEffect(() => {
    localStorage.setItem("products_dashboard_page", String(currentPage));
  }, [currentPage]);

  const prevFiltersRef = useRef({
    searchQuery,
    filterCategory,
    sortBy,
    stockStatus,
  });

  useEffect(() => {
    const prev = prevFiltersRef.current;

    if (
      prev.searchQuery !== searchQuery ||
      prev.filterCategory !== filterCategory ||
      prev.sortBy !== sortBy ||
      prev.stockStatus !== stockStatus
    ) {
      setCurrentPage(1);

      prevFiltersRef.current = {
        searchQuery,
        filterCategory,
        sortBy,
        stockStatus,
      };
    }
  }, [searchQuery, filterCategory, sortBy, stockStatus]);

  const filteredProducts = products
    .filter((p) => {
      const pTitle = getLocalizedText(p.title, currentLang);
      const pDesc = getLocalizedText(p.description, currentLang);

      const matchesSearch =
        pTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pDesc.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filterCategory === "all" ||
        p.category.name.toLowerCase() === filterCategory.toLowerCase();

      const itemStock = p.stock ?? 15;

      const matchesStock =
        stockStatus === "all" ||
        (stockStatus === "in-stock" && itemStock > 10) ||
        (stockStatus === "low-stock" && itemStock > 0 && itemStock <= 10) ||
        (stockStatus === "out-of-stock" && itemStock === 0);

      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return Number(a.price) - Number(b.price);
      }

      if (sortBy === "price-desc") {
        return Number(b.price) - Number(a.price);
      }

      if (sortBy === "newest") {
        return (
          new Date(b.createdAt || "2026-07-01").getTime() -
          new Date(a.createdAt || "2026-07-01").getTime()
        );
      }

      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }

      if (sortBy === "title-asc") {
        const titleA = getLocalizedText(a.title, currentLang);
        const titleB = getLocalizedText(b.title, currentLang);
        return titleA.localeCompare(titleB);
      }

      return 0;
    });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  useEffect(() => {
    if (currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const grid = document.getElementById("products-grid");

    if (grid) {
      grid.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main className="container mx-auto flex-1 p-5 pt-8">
      <Hero onAddProduct={open} />

      <div id="analytics-section" className="scroll-mt-24">
        <KpiStats products={products} />
      </div>

      <div id="categories-section" className="scroll-mt-24">
        <AnalyticsCharts products={products} />
      </div>

      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={filterCategory}
        setSelectedCategory={setFilterCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        stockStatus={stockStatus}
        setStockStatus={setStockStatus}
        categories={categories}
        totalResults={filteredProducts.length}
        totalProducts={products.length}
      />

      {paginatedProducts.length > 0 ? (
        <>
          <div
            id="products-grid"
            key={`page-${validPage}`}
            className="animate-in fade-in grid grid-cols-1 gap-6 duration-300 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setProductToEdit={setProductToEdit}
                onDelete={onDeleteProduct}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row dark:border-zinc-800">
              <span className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                {t("common.showing", "Showing")}{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {startIndex + 1}-{endIndex}
                </span>{" "}
                {t("common.of", "of")}{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {totalItems}
                </span>{" "}
                {t("common.products", "products")}
              </span>

              <div className="flex max-w-full flex-row flex-wrap items-center justify-center gap-1 overflow-hidden sm:gap-1.5">
                <button
                  type="button"
                  disabled={validPage === 1}
                  onClick={() => handlePageChange(validPage - 1)}
                  className="flex h-8 cursor-pointer items-center gap-0.5 rounded-lg border border-gray-200 bg-white px-2 text-[11px] font-semibold text-gray-700 shadow-xs transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:rounded-xl sm:px-3 sm:text-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {t("common.prev", "← Prev")}
                </button>

                <div className="flex flex-row flex-nowrap items-center gap-1 sm:gap-1.5">
                  {getPaginationRange(validPage, totalPages, isMobile).map(
                    (item, idx) => {
                      if (typeof item === "string") {
                        return (
                          <span
                            key={`dots-${idx}`}
                            className="flex h-8 min-w-4 items-center justify-center text-[10px] font-bold text-gray-400 select-none sm:h-9 sm:min-w-6 sm:text-xs dark:text-zinc-500"
                          >
                            ...
                          </span>
                        );
                      }

                      const page = item;

                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`flex h-8 min-w-7 cursor-pointer items-center justify-center rounded-lg px-1.5 text-[11px] font-bold transition-all sm:h-9 sm:min-w-9 sm:rounded-xl sm:px-0 sm:text-xs ${
                            page === validPage
                              ? "bg-accent shadow-accent-glow scale-105 text-white"
                              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    },
                  )}
                </div>

                <button
                  type="button"
                  disabled={validPage === totalPages}
                  onClick={() => handlePageChange(validPage + 1)}
                  className="flex h-8 cursor-pointer items-center gap-0.5 rounded-lg border border-gray-200 bg-white px-2 text-[11px] font-semibold text-gray-700 shadow-xs transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:rounded-xl sm:px-3 sm:text-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {t("common.next", "Next →")}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="my-6 rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-3xl">🔍</span>

          <h4 className="mt-3 text-base font-bold text-gray-900 dark:text-white">
            {t("filters.noProductsFound", "No products found")}
          </h4>

          <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400">
            {t(
              "filters.noProductsMessage",
              "No items match your search query or filter criteria. Try resetting filters.",
            )}
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
            {t("common.resetFilters", "Reset Filters")}
          </button>
        </div>
      )}
    </main>
  );
}

function AppContent() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const location = useLocation();

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
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

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

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    type: "success" | "error" | "info",
    title: string,
    message: string,
  ) => {
    setToasts((prev) => {
      const existing = prev.find(
        (t) => t.title === title && t.message === message,
      );

      if (existing) {
        const filtered = prev.filter((t) => t.id !== existing.id);

        return [
          ...filtered,
          {
            ...existing,
            count: (existing.count || 1) + 1,
            resetCounter: (existing.resetCounter || 0) + 1,
          },
        ];
      }

      return [
        ...prev,
        {
          id: uuid(),
          type,
          title,
          message,
          count: 1,
          resetCounter: 0,
        },
      ];
    });
  };

  /*
   * -------------------------
   * HANDLERS
   * -------------------------
   */

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const open = () => {
    setProductToEdit(null);
    setProduct(defaultProduct);
    settempColors([]);
    setSelectedCategory(categories[0]);
    setIsOpen(true);
  };

  const openEditModal = (selectedProduct: Product) => {
    setProductToEdit(selectedProduct);

    setProduct({
      ...selectedProduct,
    });

    settempColors(selectedProduct.colors || []);

    const matchedCategory = categories.find(
      (category) => category.name === selectedProduct.category.name,
    );

    if (matchedCategory) {
      setSelectedCategory(matchedCategory);
    }

    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

    const validationErrors = productValidation({
      title: getLocalizedText(title, currentLang),
      description: getLocalizedText(description, currentLang),
      imageURL,
      price,
      colors: tempColors,
    });

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== "",
    );

    if (hasErrors) {
      setErrors(validationErrors);

      addToast(
        "error",
        t("products.validationFailed", "Validation Failed ⚠️"),
        t(
          "products.validationFailedMsg",
          "Please check the form inputs before submitting.",
        ),
      );

      return;
    }

    /*
     * EDIT EXISTING PRODUCT
     */
    if (productToEdit) {
      const updatedProduct: Product = {
        ...product,
        id: productToEdit.id,
        colors: tempColors,
        category: selectedCategory,
      };

      setProducts((prevProducts) =>
        prevProducts.map((currentProduct) =>
          currentProduct.id === productToEdit.id
            ? updatedProduct
            : currentProduct,
        ),
      );

      addToast(
        "success",
        t("users.toasts.updatedTitle", "Product Updated! ✨"),
        t("users.toasts.updatedMsg", {
          name: title,
          defaultValue: `"${title}" has been updated successfully.`,
        }),
      );
    }

    /*
     * CREATE NEW PRODUCT
     */
    else {
      const newProduct: Product = {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      };

      setProducts((prevProducts) => [newProduct, ...prevProducts]);

      addToast(
        "success",
        t("products.productCreated", "Product Created! 🎉"),
        t("products.productCreatedMsg", {
          title,
          defaultValue: `"${title}" has been added to the catalog.`,
        }),
      );
    }

    setProduct(defaultProduct);
    setProductToEdit(null);
    settempColors([]);
    setSelectedCategory(categories[0]);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });

    closeModal();
  };

  const onCancelHandler = () => {
    setProduct(defaultProduct);
    setProductToEdit(null);
    settempColors([]);
    setSelectedCategory(categories[0]);

    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });

    closeModal();
  };

  const removeColorHandler = (color: string) => {
    settempColors((prevColors) =>
      prevColors.filter((prevColor) => prevColor !== color),
    );
  };

  const handleOpenDeleteModal = (productId: string) => {
    if (!productId) return;
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProductToDelete(foundProduct);
    }
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;

    const targetId = productToDelete.id;
    const targetTitle = getLocalizedText(
      productToDelete.title,
      i18n.language || "en",
    );

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== targetId),
    );

    addToast(
      "success",
      t("products.productDeleted", "Product Deleted! 🗑️"),
      t("products.productDeletedMsg", {
        title: targetTitle,
        defaultValue: `"${targetTitle}" has been removed from the catalog.`,
      }),
    );

    setProductToDelete(null);
  };

  /*
   * -------------------------
   * FORM
   * -------------------------
   */

  const renderFormInputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-1.5 text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-zinc-300"
      >
        {t(`products.inputs.${input.name}`, input.label)}
      </label>

      <Input
        type={input.type}
        name={input.name}
        id={input.id}
        value={String(product[input.name] || "")}
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

  if (location.pathname === "/login") {
    return <LoginPage />;
  }

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
              setProductToEdit={openEditModal}
              onDeleteProduct={handleOpenDeleteModal}
            />
          }
        />

        <Route path="/users" element={<UsersPage />} />

        <Route
          path="/settings"
          element={
            <SettingsPage
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              addToast={addToast}
            />
          }
        />
      </Routes>

      <Footer />

      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Add & Edit Product Modal */}
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title={
          productToEdit
            ? t("common.edit", "Edit Product")
            : t("products.addModalTitle", "Add A New Product")
        }
      >
        <form className="flex flex-col gap-y-3" onSubmit={onSubmitHandler}>
          {renderFormInputs}

          <Select
            label={t("products.inputs.category", "Category")}
            options={categories.map((cat) => ({
              value: cat.name,
              label: t(`categories.${cat.name.toLowerCase()}`, cat.name),
              imageURL: cat.imageURL,
            }))}
            value={selectedCategory.name}
            onChange={(val: string) => {
              const matched = categories.find((c) => c.name === val);

              if (matched) {
                setSelectedCategory(matched);
              }
            }}
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
                    style={{
                      backgroundColor: color,
                    }}
                    onClick={() => removeColorHandler(color)}
                  >
                    {color}

                    <span className="ms-0.5 text-[10px] font-bold opacity-75 hover:opacity-100">
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
              {t("common.cancel", "Cancel")}
            </Button>

            <Button className="bg-zinc-900 font-semibold text-white shadow-xs hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:text-white">
              {productToEdit
                ? t("common.update", "Update")
                : t("common.submit", "Submit")}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!productToDelete}
        closeModal={() => setProductToDelete(null)}
        title={t("products.delete", "DELETE")}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-300">
            {t("products.deleteConfirmation", {
              title: productToDelete
                ? getLocalizedText(productToDelete.title, currentLang)
                : "",
              defaultValue: `Are you sure you want to remove "${
                productToDelete
                  ? getLocalizedText(productToDelete.title, currentLang)
                  : ""
              }" from the catalog?`,
            })}
          </p>

          <div className="flex items-center justify-end gap-x-3 pt-2">
            <Button
              type="button"
              className="border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              onClick={() => setProductToDelete(null)}
            >
              {t("common.cancel", "Cancel")}
            </Button>

            <Button
              type="button"
              className="bg-rose-600 font-semibold text-white shadow-xs hover:bg-rose-700"
              onClick={handleConfirmDelete}
            >
              {t("products.delete", "DELETE")}
            </Button>
          </div>
        </div>
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
