import { useState } from "react";
import Button from "./ui/Button";

interface NavbarProps {
  onAddProduct: () => void;
}

const Navbar = ({ onAddProduct }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-md transition-all">
      <div className="container mx-auto flex items-center justify-between px-5 py-3.5">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Product<span className="text-indigo-600">Hub</span>
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 border border-indigo-100">
              v2.0
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-x-8 text-sm font-medium text-gray-600">
          <a href="#" className="text-indigo-600 font-semibold transition-colors">
            Catalog
          </a>
          <a href="#products-grid" className="hover:text-indigo-600 transition-colors">
            Products
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Categories
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Analytics
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-x-3">
          <Button
            onClick={onAddProduct}
            width="w-auto"
            className="bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
          >
            + Add Product
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-y-3 animate-in fade-in slide-in-from-top-2">
          <a href="#" className="text-indigo-600 font-semibold text-sm">
            Catalog
          </a>
          <a href="#products-grid" className="text-gray-600 hover:text-indigo-600 text-sm">
            Products
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
            Categories
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm">
            Analytics
          </a>
          <div className="pt-2">
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onAddProduct();
              }}
              className="bg-indigo-600 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
            >
              + Add Product
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
