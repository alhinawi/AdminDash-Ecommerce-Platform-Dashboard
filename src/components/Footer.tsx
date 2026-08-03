const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-200/80 bg-slate-900 text-slate-400">
      <div className="container mx-auto px-5 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-x-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-500 to-purple-500 text-white shadow-md">
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
              <span className="text-lg font-bold text-white tracking-tight">
                Product<span className="text-indigo-400">Hub</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Manage, organize, and showcase your modern product collections with high-performance dashboard tools.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Product Catalog
                </a>
              </li>
              <li>
                <a
                  href="#products-grid"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="#categories-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#analytics-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("analytics-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Analytics & Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Clothes & Fashion
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Furniture & Decor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cars & Vehicles
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-y-3">
          <p>© {new Date().getFullYear()} ProductHub. All rights reserved.</p>
          <div className="flex gap-x-4">
            <a href="#" className="hover:text-slate-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
