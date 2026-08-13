import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-20 border-t border-gray-200/80 bg-slate-900 text-slate-400">
      <div className="container mx-auto px-5 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-x-2.5">
              <div className="bg-accent flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-md">
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
              <span className="text-lg font-bold tracking-tight text-white">
                {t("nav.brandName", "Admin")}
                <span className="text-accent">
                  {t("nav.brandHighlight", "Dash")}
                </span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {t(
                "footer.brandDescription",
                "Manage, organize, and showcase your modern product collections with high-performance dashboard tools.",
              )}
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-slate-200 uppercase">
              {t("footer.quickLinks", "Quick Links")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/?category=all" className="transition-colors hover:text-white">
                  {t("footer.productCatalog", "Product Catalog")}
                </Link>
              </li>
              <li>
                <Link to="/#products-grid" className="transition-colors hover:text-white">
                  {t("footer.allProducts", "All Products")}
                </Link>
              </li>
              <li>
                <Link to="/#categories-section" className="transition-colors hover:text-white">
                  {t("footer.categories", "Categories")}
                </Link>
              </li>
              <li>
                <Link to="/#analytics-section" className="transition-colors hover:text-white">
                  {t("footer.analyticsReports", "Analytics & Reports")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-slate-200 uppercase">
              {t("footer.categories", "Categories")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/?category=electronics" className="transition-colors hover:text-white">
                  {t("footer.electronics", "Electronics")}
                </Link>
              </li>
              <li>
                <Link to="/?category=clothes" className="transition-colors hover:text-white">
                  {t("footer.clothesFashion", "Clothes & Fashion")}
                </Link>
              </li>
              <li>
                <Link to="/?category=furniture" className="transition-colors hover:text-white">
                  {t("footer.furnitureDecor", "Furniture & Decor")}
                </Link>
              </li>
              <li>
                <Link to="/?category=automotive" className="transition-colors hover:text-white">
                  {t("footer.automotive", "Automotive & Vehicles")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-slate-200 uppercase">
              {t("footer.support", "Support")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/docs" className="transition-colors hover:text-white">
                  {t("footer.documentation", "Documentation")}
                </Link>
              </li>
              <li>
                <Link to="/api-reference" className="transition-colors hover:text-white">
                  {t("footer.apiReference", "API Reference")}
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="transition-colors hover:text-white">
                  {t("footer.helpCenter", "Help Center")}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="transition-colors hover:text-white">
                  {t("footer.privacyPolicy", "Privacy Policy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-y-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} AdminDash.{" "}
            {t("footer.copyright", "All rights reserved.")}
          </p>
          <div className="flex gap-x-4">
            <Link to="/terms" className="transition-colors hover:text-slate-400">
              {t("footer.terms", "Terms")}
            </Link>
            <Link to="/privacy-policy" className="transition-colors hover:text-slate-400">
              {t("footer.privacy", "Privacy")}
            </Link>
            <Link to="/cookie-policy" className="transition-colors hover:text-slate-400">
              {t("footer.cookies", "Cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
