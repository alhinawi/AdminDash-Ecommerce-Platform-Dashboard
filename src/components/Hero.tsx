import Button from "./ui/Button";

interface Props {
  onAddProduct: () => void;
}

const Hero = ({ onAddProduct }: Props) => {
  return (
    <div className="relative mb-10 overflow-hidden rounded-3xl bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 p-8 text-white shadow-2xl md:p-12">
      {/* Decorative Glow Elements */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 max-w-2xl">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-x-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          Product Dashboard 2.0
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
          Build & Manage Your <br />
          <span className="bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Premium Collection
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-6 text-sm text-indigo-100/80 leading-relaxed md:text-base">
          Seamlessly add, edit, and organize your catalog of luxury accessories, electronics, sneakers, and modern lifestyle items in one place.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClick={onAddProduct}
            className="w-fit bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
          >
            + Add New Product
          </Button>

          <a
            href="#products-grid"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex cursor-pointer items-center gap-x-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            Explore Catalog ↓
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
