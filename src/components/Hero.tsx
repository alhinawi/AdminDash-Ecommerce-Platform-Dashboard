import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Button from "./ui/Button";

interface Props {
  onAddProduct: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    badge: "🚀 Product Dashboard 2.0",
    headingTitle: "Build & Manage Your",
    headingHighlight: "Premium Collection",
    subtitle:
      "Seamlessly add, edit, and organize your catalog of luxury accessories, electronics, sneakers, and modern lifestyle items in one place.",
    ctaPrimaryText: "+ Add New Product",
    ctaPrimaryAction: "add",
    ctaSecondaryText: "Explore Catalog ↓",
    ctaSecondaryHref: "#products-grid",
    gradient: "from-indigo-900 via-indigo-800 to-slate-900",
    glowColor1: "bg-indigo-500/20",
    glowColor2: "bg-purple-500/20",
  },
  {
    id: 2,
    badge: "📊 Visual Insights",
    headingTitle: "Track Catalog Worth &",
    headingHighlight: "Market Share Trends",
    subtitle:
      "Real-time SVG market share charts, 12-month revenue curve graphs, and category intelligence metrics at your fingertips.",
    ctaPrimaryText: "+ Add Product",
    ctaPrimaryAction: "add",
    ctaSecondaryText: "View Analytics ↓",
    ctaSecondaryHref: "#analytics-section",
    gradient: "from-purple-900 via-slate-900 to-indigo-950",
    glowColor1: "bg-purple-500/25",
    glowColor2: "bg-pink-500/20",
  },
  {
    id: 3,
    badge: "⚡ High-Speed Catalog",
    headingTitle: "Instant Product Search &",
    headingHighlight: "Smart Category Filters",
    subtitle:
      "Filter luxury goods by category, price range, or custom colors with instant real-time sorting and zero reload latency.",
    ctaPrimaryText: "+ Add Product",
    ctaPrimaryAction: "add",
    ctaSecondaryText: "Categories ↓",
    ctaSecondaryHref: "#categories-section",
    gradient: "from-slate-900 via-cyan-950 to-indigo-900",
    glowColor1: "bg-cyan-500/20",
    glowColor2: "bg-indigo-500/25",
  },
];

const Hero = ({ onAddProduct }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const activeSlide = HERO_SLIDES[selectedIndex] || HERO_SLIDES[0];

  return (
    <div
      className={`relative mb-10 overflow-hidden rounded-3xl bg-linear-to-r ${activeSlide.gradient} text-white shadow-2xl transition-all duration-700 select-none`}
    >
      {/* Decorative Blur Orbs */}
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full ${activeSlide.glowColor1} blur-3xl transition-all duration-700`}
      />
      <div
        className={`pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full ${activeSlide.glowColor2} blur-3xl transition-all duration-700`}
      />

      {/* Embla Viewport */}
      <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex w-full">
          {HERO_SLIDES.map((s) => (
            <div
              key={s.id}
              className="w-full min-w-full shrink-0 relative z-10 p-8 md:p-12 pb-16 md:pb-20 min-h-[280px] flex flex-col justify-center"
            >
              <div className="max-w-2xl sm:pl-2">
                {/* Badge */}
                <div className="mb-4 inline-flex w-fit items-center gap-x-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-200 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  {s.badge}
                </div>

                {/* Heading */}
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl leading-tight">
                  {s.headingTitle} <br />
                  <span className="bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    {s.headingHighlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mb-6 text-sm text-indigo-100/80 leading-relaxed md:text-base">
                  {s.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    onClick={onAddProduct}
                    className="w-fit bg-indigo-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer"
                  >
                    {s.ctaPrimaryText}
                  </Button>

                  <a
                    href={s.ctaSecondaryHref}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = s.ctaSecondaryHref.replace("#", "");
                      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex cursor-pointer items-center gap-x-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
                  >
                    {s.ctaSecondaryText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Baseline Navigation Row (Bottom Aligned, >64px clear space from text) */}
      <div className="pointer-events-none">
        {/* Left Navigation Arrow */}
        <button
          type="button"
          onClick={scrollPrev}
          className="pointer-events-auto absolute left-5 md:left-10 bottom-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95 border border-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer"
          aria-label="Previous Slide"
          title="Previous Slide"
        >
          <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Minimal Centered Pagination Dots */}
        <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-x-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === idx
                  ? "h-1.5 w-5 bg-white/90 shadow-xs shadow-white/30"
                  : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right Navigation Arrow */}
        <button
          type="button"
          onClick={scrollNext}
          className="pointer-events-auto absolute right-5 md:right-10 bottom-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/15 hover:text-white hover:scale-105 active:scale-95 border border-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer"
          aria-label="Next Slide"
          title="Next Slide"
        >
          <svg className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
