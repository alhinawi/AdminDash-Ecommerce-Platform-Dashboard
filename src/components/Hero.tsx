import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Button from "./ui/Button";

interface Props {
  onAddProduct: () => void;
}

const Hero = ({ onAddProduct }: Props) => {
  const { t, i18n } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const heroSlides = [
    {
      id: 1,
      badge: t("hero.slide1.badge", "🚀 Product Dashboard 2.0"),
      headingTitle: t("hero.slide1.headingTitle", "Build & Manage Your"),
      headingHighlight: t("hero.slide1.headingHighlight", "Premium Collection"),
      subtitle: t(
        "hero.slide1.subtitle",
        "Seamlessly add, edit, and organize your catalog of luxury accessories, electronics, sneakers, and modern lifestyle items in one place.",
      ),
      ctaPrimaryText: t("hero.slide1.ctaPrimary", "+ Add New Product"),
      ctaPrimaryAction: "add",
      ctaSecondaryText: t("hero.slide1.ctaSecondary", "Explore Catalog ↓"),
      ctaSecondaryHref: "#products-grid",
      gradient: "from-indigo-900 via-indigo-800 to-slate-900",
      glowColor1: "bg-indigo-500/20",
      glowColor2: "bg-purple-500/20",
    },
    {
      id: 2,
      badge: t("hero.slide2.badge", "📊 Visual Insights"),
      headingTitle: t("hero.slide2.headingTitle", "Track Catalog Worth &"),
      headingHighlight: t(
        "hero.slide2.headingHighlight",
        "Market Share Trends",
      ),
      subtitle: t(
        "hero.slide2.subtitle",
        "Real-time SVG market share charts, 12-month revenue curve graphs, and category intelligence metrics at your fingertips.",
      ),
      ctaPrimaryText: t("hero.slide2.ctaPrimary", "+ Add Product"),
      ctaPrimaryAction: "add",
      ctaSecondaryText: t("hero.slide2.ctaSecondary", "View Analytics ↓"),
      ctaSecondaryHref: "#analytics-section",
      gradient: "from-purple-900 via-slate-900 to-indigo-950",
      glowColor1: "bg-purple-500/25",
      glowColor2: "bg-pink-500/20",
    },
    {
      id: 3,
      badge: t("hero.slide3.badge", "⚡ High-Speed Catalog"),
      headingTitle: t("hero.slide3.headingTitle", "Instant Product Search &"),
      headingHighlight: t(
        "hero.slide3.headingHighlight",
        "Smart Category Filters",
      ),
      subtitle: t(
        "hero.slide3.subtitle",
        "Filter luxury goods by category, price range, or custom colors with instant real-time sorting and zero reload latency.",
      ),
      ctaPrimaryText: t("hero.slide3.ctaPrimary", "+ Add Product"),
      ctaPrimaryAction: "add",
      ctaSecondaryText: t("hero.slide3.ctaSecondary", "Categories ↓"),
      ctaSecondaryHref: "#categories-section",
      gradient: "from-slate-900 via-cyan-950 to-indigo-900",
      glowColor1: "bg-cyan-500/20",
      glowColor2: "bg-indigo-500/25",
    },
  ];

  const isRtl = i18n.dir() === "rtl";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 25, direction: isRtl ? "rtl" : "ltr" },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const animId = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(animId);
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
    [emblaApi],
  );

  const activeSlide = heroSlides[selectedIndex] || heroSlides[0];

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
      <div
        className="w-full cursor-grab overflow-hidden active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className="flex w-full">
          {heroSlides.map((s) => (
            <div
              key={s.id}
              className="relative z-10 flex min-h-70 w-full min-w-full shrink-0 flex-col justify-center p-8 pb-16 md:p-12 md:pb-20"
            >
              <div className="max-w-2xl sm:pl-2">
                {/* Badge */}
                <div className="mb-4 inline-flex w-fit items-center gap-x-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-200 backdrop-blur-md">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
                  {s.badge}
                </div>

                {/* Heading */}
                <h1 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight md:text-5xl">
                  {s.headingTitle} <br />
                  <span className="bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    {s.headingHighlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mb-6 text-sm leading-relaxed text-indigo-100/80 md:text-base">
                  {s.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    onClick={onAddProduct}
                    className="bg-accent hover:bg-accent-hover w-fit cursor-pointer px-6 py-3 font-medium text-white shadow-lg transition-all"
                  >
                    {s.ctaPrimaryText}
                  </Button>

                  <a
                    href={s.ctaSecondaryHref}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = s.ctaSecondaryHref.replace("#", "");
                      document
                        .getElementById(targetId)
                        ?.scrollIntoView({ behavior: "smooth" });
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
          className="pointer-events-auto absolute inset-s-5 bottom-5 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/15 hover:text-white active:scale-95 md:inset-s-10"
          aria-label={t("hero.prevSlide", "Previous Slide")}
          title={t("hero.prevSlide", "Previous Slide")}
        >
          <svg
            className="h-4 w-4 stroke-current rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Minimal Centered Pagination Dots */}
        <div className="pointer-events-auto absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-x-2">
          {heroSlides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(idx)}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                selectedIndex === idx
                  ? "h-1.5 w-5 bg-white/90 shadow-xs shadow-white/30"
                  : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={t("hero.goToSlide", {
                index: idx + 1,
                defaultValue: `Go to slide ${idx + 1}`,
              })}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right Navigation Arrow */}
        <button
          type="button"
          onClick={scrollNext}
          className="pointer-events-auto absolute inset-e-5 bottom-5 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/15 hover:text-white active:scale-95 md:inset-e-10"
          aria-label={t("hero.nextSlide", "Next Slide")}
          title={t("hero.nextSlide", "Next Slide")}
        >
          <svg
            className="h-4 w-4 stroke-current rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
