import { v4 as uuid } from "uuid";
import type { Category, FormInput, Product } from "../interfaces";

export const productList: Product[] = [
  // ================= ELECTRONICS (10 Products) =================
  {
    id: uuid(),
    title: "Sony WH-1000XM5 Noise Canceling Headphones",
    description:
      "Industry-leading noise cancellation with dual processors. Crystal clear hands-free calling with 4 beamforming microphones. Up to 30 hours battery life with quick charging.",
    imageURL:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    price: "399",
    colors: ["#121212", "#C0C0C0", "#13005A"],
    stock: 42,
    sku: "SKU-ELEC-001",
    rating: 4.8,
    reviewCount: 342,
    createdAt: "2026-07-28",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Apple MacBook Pro 16-inch (M3 Max)",
    description:
      "Empowered by the M3 Max chip with a 16-core CPU and 40-core GPU. Liquid Retina XDR display with up to 22 hours of battery life for heavy creative workflows.",
    imageURL:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    price: "2499",
    colors: ["#121212", "#C0C0C0"],
    stock: 18,
    sku: "SKU-ELEC-002",
    rating: 4.9,
    reviewCount: 512,
    createdAt: "2026-07-25",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "iPad Pro 12.9-inch M2 Liquid Retina XDR",
    description:
      "Astonishing performance with M2 chip, ProRes video capture, and ultra-fast Wi-Fi 6E. Features Liquid Retina XDR display with ProMotion technology.",
    imageURL:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    price: "1099",
    colors: ["#121212", "#C0C0C0"],
    stock: 31,
    sku: "SKU-ELEC-003",
    rating: 4.7,
    reviewCount: 219,
    createdAt: "2026-07-20",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Samsung Odyssey OLED G9 Curved Gaming Monitor",
    description:
      "49-inch Dual QHD curved gaming monitor with 240Hz refresh rate and 0.03ms response time. Quantum Dot technology offers brilliant color depth.",
    imageURL:
      "https://i.pinimg.com/1200x/77/75/74/7775746fe3b619b170785763aaf8738e.jpg",
    price: "1599",
    colors: ["#121212"],
    stock: 0,
    sku: "SKU-ELEC-004",
    rating: 4.8,
    reviewCount: 184,
    createdAt: "2026-07-18",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Logitech MX Master 3S Ergonomic Wireless Mouse",
    description:
      "Quiet Click technology with 8000 DPI track-anywhere sensor. MagSpeed electromagnetic scrolling for precision and seamless multi-device flow control.",
    imageURL:
      "https://i.pinimg.com/736x/e4/4b/d9/e44bd94fcae7ea3bc142c91514b08cc9.jpg",
    price: "320",
    colors: ["#121212", "#C0C0C0"],
    stock: 65,
    sku: "SKU-ELEC-005",
    rating: 4.6,
    reviewCount: 420,
    createdAt: "2026-07-15",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Keychron Q1 Pro Wireless Mechanical Keyboard",
    description:
      "75% layout QMK/VIA custom wireless mechanical keyboard with full aluminum body, double-gasket design, and hot-swappable switches.",
    imageURL:
      "https://i.pinimg.com/736x/73/e6/bf/73e6bfe98042ee8e09e8c69f71997b5c.jpg",
    price: "420",
    colors: ["#121212", "#2563eb", "#6F7174"],
    stock: 28,
    sku: "SKU-ELEC-006",
    rating: 4.7,
    reviewCount: 156,
    createdAt: "2026-07-12",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Dell UltraSharp 32 4K USB-C Hub Monitor",
    description:
      "IPS Black panel with 2000:1 contrast ratio, 98% DCI-P3 color gamut, and 90W power delivery. Includes built-in KVM switch and RJ45 connector.",
    imageURL:
      "https://i.pinimg.com/736x/74/a7/77/74a77702d17af7814ba894537f60d15a.jpg",
    price: "899",
    colors: ["#C0C0C0", "#0B0C0A"],
    stock: 9,
    sku: "SKU-ELEC-007",
    rating: 4.5,
    reviewCount: 94,
    createdAt: "2026-07-10",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Sonos Era 300 Smart Speaker | Spatial Audio",
    description:
      "Revolutionary spatial audio speaker with 6 drivers. Dolby Atmos support, Bluetooth 5.0, WiFi 6, and Trueplay tuning for room-filling acoustic realism.",
    imageURL:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    price: "449",
    colors: ["#121212", "#00383A"],
    stock: 22,
    sku: "SKU-ELEC-008",
    rating: 4.8,
    reviewCount: 230,
    createdAt: "2026-07-08",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Anker Prime 20,000mAh 200W Power Bank",
    description:
      "High-capacity portable charger with smart digital display and dual 100W USB-C fast charging outputs. Capable of charging two laptops simultaneously.",
    imageURL:
      "https://i.pinimg.com/1200x/be/1b/91/be1b9122836e39d3b963aa5c7b14a230.jpg",
    price: "310",
    colors: ["#121212"],
    stock: 50,
    sku: "SKU-ELEC-009",
    rating: 4.9,
    reviewCount: 380,
    createdAt: "2026-07-05",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Bose QuietComfort Ultra Wireless Earbuds",
    description:
      "Immersive spatial audio with CustomTune sound calibration. World-class active noise cancellation and up to 6 hours continuous battery per charge.",
    imageURL:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    price: "349",
    colors: ["#121212", "#C0C0C0"],
    stock: 35,
    sku: "SKU-ELEC-010",
    rating: 4.6,
    reviewCount: 175,
    createdAt: "2026-07-01",
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },

  // ================= CLOTHES (10 Products) =================
  {
    id: uuid(),
    title: "Premium Leather Bomber Jacket",
    description:
      "Crafted from genuine full-grain lambskin leather with a buttery soft feel. Features a satin-lined interior, ribbed cuffs and hem, and interior pockets.",
    imageURL:
      "https://i.pinimg.com/736x/b5/4a/23/b54a232498cf4827e824cad8e83ae459.jpg",
    price: "480",
    colors: ["#3C2A21", "#121212", "#820000"],
    stock: 24,
    sku: "SKU-CLOT-001",
    rating: 4.8,
    reviewCount: 145,
    createdAt: "2026-07-29",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Tailored Italian Wool Blazer",
    description:
      "Structured single-breasted blazer made from 100% fine Italian virgin wool. Horn buttons, peak lapels, and double vented back for a sleek modern fit.",
    imageURL:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    price: "390",
    colors: ["#121212", "#2563eb"],
    stock: 0,
    sku: "SKU-CLOT-002",
    rating: 4.7,
    reviewCount: 98,
    createdAt: "2026-07-26",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Minimalist Organic Cotton Heavyweight Hoodie",
    description:
      "Heavy 450gsm organic French terry cotton hoodie with double-lined hood and reinforced kangaroo pocket. Relaxed streetwear fit.",
    imageURL:
      "https://i.pinimg.com/1200x/d4/b0/1c/d4b01c4e7ae28fa2e8720f209024245b.jpg",
    price: "95",
    colors: ["#C0C0C0", "#121212", "#3C2A21"],
    stock: 80,
    sku: "SKU-CLOT-003",
    rating: 4.6,
    reviewCount: 260,
    createdAt: "2026-07-22",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Japanese Selvedge Raw Denim Jeans",
    description:
      "14oz Kurabo mill selvedge denim crafted in Okayama, Japan. Custom brass hardware, leather patch, and classic straight leg fit.",
    imageURL:
      "https://i.pinimg.com/1200x/27/d4/55/27d4556d5a8e38ec3d2428222de280a3.jpg",
    price: "185",
    colors: ["#323240", "#121212"],
    stock: 36,
    sku: "SKU-CLOT-004",
    rating: 4.8,
    reviewCount: 189,
    createdAt: "2026-07-19",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "100% Mongolian Cashmere Crewneck Sweater",
    description:
      "Ultra-soft grade-A Mongolian cashmere knitted in a lightweight 12-gauge structure. Temperature regulating for year-round luxury comfort.",
    imageURL:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    price: "280",
    colors: ["#C0C0C0", "#3C2A21", "#121212"],
    stock: 20,
    sku: "SKU-CLOT-005",
    rating: 4.9,
    reviewCount: 112,
    createdAt: "2026-07-16",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Waterproof Technical Trench Coat",
    description:
      "3-layer breathable GORE-TEX fabric with fully taped seams. Storm flap, adjustable waist belt, and magnetic cuff closures for urban rainy climate.",
    imageURL:
      "https://i.pinimg.com/736x/e3/f9/da/e3f9da3fb1a5c376146ccf2a70e68eb6.jpg",
    price: "340",
    colors: ["#121212", "#3C2A21"],
    stock: 12,
    sku: "SKU-CLOT-006",
    rating: 4.5,
    reviewCount: 76,
    createdAt: "2026-07-14",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Classic Merino Wool Turtleneck Knitwear",
    description:
      "Extra-fine Australian merino wool offering supreme softness and subtle lustre. Ribbed neck, hem, and cuffs for sophisticated layering.",
    imageURL:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    price: "160",
    colors: ["#121212", "#C0C0C0", "#820000"],
    stock: 45,
    sku: "SKU-CLOT-007",
    rating: 4.6,
    reviewCount: 140,
    createdAt: "2026-07-11",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Slim-Fit Poplin Dress Shirt",
    description:
      "2-ply 100% Egyptian Giza cotton poplin with spread collar and mother-of-pearl buttons. Non-iron finish for sharp executive elegance.",
    imageURL:
      "https://i.pinimg.com/736x/60/eb/db/60ebdbbc9433bb04ca293d1e6f04ee62.jpg",
    price: "110",
    colors: ["#9BBEDA", "#2563eb"],
    stock: 55,
    sku: "SKU-CLOT-008",
    rating: 4.4,
    reviewCount: 185,
    createdAt: "2026-07-09",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Over-Sized Vintage Washed Graphic T-Shirt",
    description:
      "Heavyweight 240gsm combed cotton with enzyme wash for vintage faded look. Screen-printed original artwork on front and back.",
    imageURL:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    price: "65",
    colors: ["#121212", "#C0C0C0"],
    stock: 90,
    sku: "SKU-CLOT-009",
    rating: 4.7,
    reviewCount: 310,
    createdAt: "2026-07-06",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Luxury Modest linen Collection",
    description:
      "Floor-length bias-cut evening gown in 100% mulberry silk satin. Features elegant cowl neck, delicate spaghetti straps, and low back.",
    imageURL:
      "https://i.pinimg.com/736x/56/71/f7/5671f7769c57070cf7378e957cd6c3de.jpg",
    price: "490",
    colors: ["#ECE7E3", "#C09068", "#84491F"],
    stock: 8,
    sku: "SKU-CLOT-010",
    rating: 4.9,
    reviewCount: 64,
    createdAt: "2026-07-02",
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },

  // ================= PHOTOGRAPHY (8 Products) =================
  {
    id: uuid(),
    title: "Canon EOS R6 Mark II Mirrorless Camera",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor and DIGIC X processor. Shoots up to 40fps electronic shutter with subject detection autofocus.",
    imageURL:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    price: "2499",
    colors: ["#121212"],
    stock: 10,
    sku: "SKU-PHOT-001",
    rating: 4.9,
    reviewCount: 280,
    createdAt: "2026-07-30",
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  },
  {
    id: uuid(),
    title: "Fujifilm X100V Premium Compact Camera",
    description:
      "Iconic street camera featuring a 26.1MP X-Trans CMOS 4 sensor and Fujinon 23mm F2 lens. Hybrid viewfinder and classic film simulation modes.",
    imageURL:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    price: "1399",
    colors: ["#C0C0C0", "#121212"],
    stock: 14,
    sku: "SKU-PHOT-002",
    rating: 4.8,
    reviewCount: 395,
    createdAt: "2026-07-27",
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  },
  {
    id: uuid(),
    title: "Sony FE 24-70mm f/2.8 GM II Lens",
    description:
      "The world's lightest standard zoom f/2.8 lens. Uncompromising G Master resolution and autofocus speed for professional creators.",
    imageURL:
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80",
    price: "2299",
    colors: ["#121212"],
    stock: 0,
    sku: "SKU-PHOT-003",
    rating: 4.9,
    reviewCount: 168,
    createdAt: "2026-07-24",
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  },
  {
    id: uuid(),
    title: "DJI Mavic 3 Pro Cine Quadcopter Drone",
    description:
      "Triple-camera system featuring Hasselblad 4/3 CMOS sensor and dual telephoto lenses. Apple ProRes recording with 43-minute max flight time.",
    imageURL:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    price: "2899",
    colors: ["#121212", "#C0C0C0"],
    stock: 6,
    sku: "SKU-PHOT-004",
    rating: 4.8,
    reviewCount: 142,
    createdAt: "2026-07-21",
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  },
  {
    id: uuid(),
    title: "Leica M11 Rangefinder Camera Body",
    description:
      "60MP BSI CMOS full-frame sensor with Triple Resolution Technology. Handcrafted in Germany with brass top plate and classic rangefinder optical system.",
    imageURL:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
    price: "2950",
    colors: ["#121212", "#C0C0C0"],
    stock: 4,
    sku: "SKU-PHOT-005",
    rating: 4.9,
    reviewCount: 88,
    createdAt: "2026-07-17",
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  },
  {
    id: uuid(),
    title: "Sigma 85mm f/1.4 DG DN Art Lens for E-Mount",
    description:
      "Ultimate portrait lens delivering breathtaking bokeh and edge-to-edge sharpness. Stepping motor tuned for smooth video and high-speed eye AF.",
    imageURL:
      "https://i.pinimg.com/1200x/c6/b4/1a/c6b41a13c2eaabf7a1dbebaf6bd0e940.jpg",
    price: "1199",
    colors: ["#121212"],
    stock: 18,
    sku: "SKU-PHOT-006",
    rating: 4.7,
    reviewCount: 204,
    createdAt: "2026-07-13",
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  },
  {
    id: uuid(),
    title: "Profoto B10X Plus OCF Flash & Monolight",
    description:
      "500Ws powerful battery-powered studio flash with 3250 lumens continuous LED light for photo and video. TTL and High-Speed Sync compatible.",
    imageURL:
      "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80",
    price: "2295",
    colors: ["#121212"],
    stock: 7,
    sku: "SKU-PHOT-007",
    rating: 4.6,
    reviewCount: 62,
    createdAt: "2026-07-07",
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  },
  {
    id: uuid(),
    title: "Peak Design Carbon Fiber Travel Tripod",
    description:
      "Ultra-compact carbon fiber tripod that packs down to the diameter of a water bottle. Holds up to 20 lbs with ergonomic ball head.",
    imageURL:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=800&q=80",
    price: "649",
    colors: ["#121212"],
    stock: 25,
    sku: "SKU-PHOT-008",
    rating: 4.8,
    reviewCount: 310,
    createdAt: "2026-07-03",
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  },

  // ================= FURNITURE (8 Products) =================
  {
    id: uuid(),
    title: "Scandinavian Modern Linen Sofa",
    description:
      "Minimalist three-seater sofa with solid oak legs and premium linen upholstery. Features high-density foam cushions for superior comfort and durability.",
    imageURL:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    price: "1299",
    colors: ["#84D2C5", "#3C2A21", "#C0C0C0"],
    stock: 12,
    sku: "SKU-FURN-001",
    rating: 4.7,
    reviewCount: 178,
    createdAt: "2026-07-31",
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Eames Lounge Chair & Ottoman Replica",
    description:
      "Mid-century modern design icon in top-grain aniline leather and molded walnut plywood shell. Die-cast aluminum swivel base.",
    imageURL:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    price: "2100",
    colors: ["#121212", "#3C2A21", "#EFC849"],
    stock: 9,
    sku: "SKU-FURN-002",
    rating: 4.9,
    reviewCount: 245,
    createdAt: "2026-07-28",
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Solid Walnut Ergonomic Executive Desk",
    description:
      "Hand-finished solid American walnut standing desk with integrated cable management and dual motor height adjustment memory settings.",
    imageURL:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    price: "1850",
    colors: ["#3C2A21", "#D0D0D0"],
    stock: 14,
    sku: "SKU-FURN-003",
    rating: 4.8,
    reviewCount: 132,
    createdAt: "2026-07-23",
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Handcrafted Live-Edge Oak Dining Table",
    description:
      "10-seat natural live-edge European white oak dining table with matte black powder-coated steel legs. Satin lacquer protection finish.",
    imageURL:
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    price: "4500",
    colors: ["#3C2A21", "#121212", "#6F7174"],
    stock: 0,
    sku: "SKU-FURN-004",
    rating: 4.9,
    reviewCount: 84,
    createdAt: "2026-07-20",
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Herman Miller Aeron Ergonomic Chair",
    description:
      "Fully adjustable ergonomic office chair with Pellicle 8Z suspension material, PostureFit SL back support, and fully adjustable arms.",
    imageURL:
      "https://i.pinimg.com/1200x/4d/df/f6/4ddff6507a9b14896a291bd571fb5a76.jpg",
    price: "1495",
    colors: ["#121212", "#C0C0C0"],
    stock: 20,
    sku: "SKU-FURN-005",
    rating: 4.9,
    reviewCount: 460,
    createdAt: "2026-07-16",
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Modular Velvet Sectional Sofa | Navy",
    description:
      "5-piece configurable sectional sofa in stain-resistant performance velvet. Deep seats with duck feather-filled accent pillows.",
    imageURL:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    price: "3200",
    colors: ["#938B8B", "#3C2A21"],
    stock: 6,
    sku: "SKU-FURN-006",
    rating: 4.7,
    reviewCount: 95,
    createdAt: "2026-07-12",
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Minimalist Floating Teak Credenza",
    description:
      "Sustainably sourced plantation teak sideboard with slatted tambour sliding doors and soft-close brass hardware drawers.",
    imageURL:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    price: "1650",
    colors: ["#3C2A21", "#DCB493"],
    stock: 11,
    sku: "SKU-FURN-007",
    rating: 4.6,
    reviewCount: 72,
    createdAt: "2026-07-08",
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Architectural Marble Top Coffee Table",
    description:
      "Italian Carrara white marble tabletop supported by geometric black steel tripod legs. Honed natural stone protective seal.",
    imageURL:
      "https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?auto=format&fit=crop&w=800&q=80",
    price: "780",
    colors: ["#C0C0C0", "#121212"],
    stock: 16,
    sku: "SKU-FURN-008",
    rating: 4.8,
    reviewCount: 110,
    createdAt: "2026-07-04",
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },

  // ================= SNEAKERS (8 Products) =================
  {
    id: uuid(),
    title: "Neon Pulse High-Top Sneakers | Limited Edition",
    description:
      "Futuristic high-top sneakers with bold LED-inspired cyan details, cushioned air sole midsole, and premium breathable mesh upper.",
    imageURL:
      "https://i.pinimg.com/1200x/69/7e/93/697e93eb1a36e81230adffb95744a273.jpg",
    price: "350",
    colors: ["#06b6d4", "#121212", "#0138ED"],
    stock: 30,
    sku: "SKU-SNEA-001",
    rating: 4.8,
    reviewCount: 310,
    createdAt: "2026-07-30",
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Retro Runner OG Colorway Sneakers",
    description:
      "Classic 1980s silhouette with suede overlays and nylon underlays. EVA foam midsole for responsive lightweight cushioning.",
    imageURL:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    price: "160",
    colors: ["#FF6E31", "#2563eb", "#C00019"],
    stock: 45,
    sku: "SKU-SNEA-002",
    rating: 4.6,
    reviewCount: 180,
    createdAt: "2026-07-27",
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Air Tech Basketball Performance Shoes",
    description:
      "Engineered knit upper with multi-directional traction pattern. Air Zoom units in forefoot and heel for explosive vertical energy return.",
    imageURL:
      "https://i.pinimg.com/1200x/33/d6/58/33d6589831aeabcd9f64d17dccd64c93.jpg",
    price: "210",
    colors: ["#121212", "#8B8F97", "#06b6d4"],
    stock: 0,
    sku: "SKU-SNEA-003",
    rating: 4.7,
    reviewCount: 240,
    createdAt: "2026-07-24",
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Minimalist White Italian Leather Low-Tops",
    description:
      "Handcrafted in Tuscany using butter-soft Nappa leather. Margom rubber cupsole and waxed cotton laces for sleek luxury styling.",
    imageURL:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    price: "140",
    colors: ["#C0C0C0", "#121212", "#BF7C47"],
    stock: 50,
    sku: "SKU-SNEA-004",
    rating: 4.8,
    reviewCount: 290,
    createdAt: "2026-07-21",
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Urban Hiker Vibram Sole Trail Sneakers",
    description:
      "Rugged ripstop fabric combined with waterproof membrane and Vibram Megagrip lugged outsole for outdoor durability.",
    imageURL:
      "https://i.pinimg.com/736x/9b/c9/6c/9bc96c4de100f4c0f5e4d2a5e387b485.jpg",
    price: "230",
    colors: ["#3C2A21", "#121212", "#10b981"],
    stock: 19,
    sku: "SKU-SNEA-005",
    rating: 4.5,
    reviewCount: 115,
    createdAt: "2026-07-17",
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Futuristic Carbon Plate Racing Shoes",
    description:
      "Marathon racing shoe embedded with full-length carbon fiber plate and PEBA ultra-lightweight responsive foam.",
    imageURL:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    price: "290",
    colors: ["#f43f5e", "#06b6d4"],
    stock: 14,
    sku: "SKU-SNEA-006",
    rating: 4.9,
    reviewCount: 165,
    createdAt: "2026-07-13",
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Classic Canvas Skate Sneakers",
    description:
      "12oz heavy canvas upper with reinforced suede toe cap and vulcanized rubber waffle outsole for maximum board feel.",
    imageURL:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    price: "110",
    colors: ["#121212", "#C0C0C0", "#820000"],
    stock: 60,
    sku: "SKU-SNEA-007",
    rating: 4.6,
    reviewCount: 380,
    createdAt: "2026-07-09",
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Knit Slip-On Lightweight Trainer",
    description:
      "Sock-like 3D flyknit construction with elastic collar and memory foam insole for effortless everyday slip-on comfort.",
    imageURL:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    price: "135",
    colors: ["#121212", "#C0C0C0"],
    stock: 40,
    sku: "SKU-SNEA-008",
    rating: 4.7,
    reviewCount: 210,
    createdAt: "2026-07-05",
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },

  // ================= AUTOMOTIVE (10 Products) =================
  {
    id: uuid(),
    title: "Tesla Model S Plaid Sport Edition",
    description:
      "Tri-motor all-wheel drive with 1,020 horsepower. 0-60 mph in 1.99 seconds with carbon-sleeved rotors and aerodynamic spoiler upgrade.",
    imageURL:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    price: "29900",
    colors: ["#121212", "#F7F9F9", "#FF0032"],
    stock: 3,
    sku: "SKU-AUTO-001",
    rating: 4.9,
    reviewCount: 195,
    createdAt: "2026-07-31",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "Porsche 911 Carrera Custom Coupe",
    description:
      "3.0-liter twin-turbo flat-six engine generating 379 hp. 8-speed Porsche Doppelkupplung (PDK) transmission with sport chrono package.",
    imageURL:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    price: "28500",
    colors: ["#121212", "#C0C0C0", "#FF6E31"],
    stock: 0,
    sku: "SKU-AUTO-002",
    rating: 4.9,
    reviewCount: 160,
    createdAt: "2026-07-28",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "BMW M4 Competition Convertible",
    description:
      "M TwinPower Turbo inline 6-cylinder engine producing 503 hp. M xDrive intelligent all-wheel drive system with active M differential.",
    imageURL:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    price: "26000",
    colors: ["#D6DEE0", "#121212"],
    stock: 4,
    sku: "SKU-AUTO-003",
    rating: 4.8,
    reviewCount: 142,
    createdAt: "2026-07-25",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "Chevrolet Camaro SS 2018 - Blue Sports Coupe",
    description:
      "Bold blue finish with 6.2L LT1 V8 engine pumping 455 hp. Magnetic ride control and Brembo performance brakes.",
    imageURL:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    price: "18500",
    colors: ["#2563eb", "#FF0032", "#121212"],
    stock: 5,
    sku: "SKU-AUTO-004",
    rating: 4.7,
    reviewCount: 118,
    createdAt: "2026-07-22",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "Ford Mustang GT V8 Fastback Edition",
    description:
      "Iconic 5.0L Coyote V8 engine with active valve performance exhaust. Digital instrument cluster and Brembo 6-piston front calipers.",
    imageURL:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80",
    price: "14500",
    colors: ["#FF0032", "#121212", "#C0C0C0"],
    stock: 6,
    sku: "SKU-AUTO-005",
    rating: 4.8,
    reviewCount: 210,
    createdAt: "2026-07-19",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "Audi RS e-tron GT Electric Supercar",
    description:
      "800V architecture delivering up to 637 hp with boost launch control. Carbon fiber roof and tungsten carbide coated brakes.",
    imageURL:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80",
    price: "29500",
    colors: ["#121212", "#C34038"],
    stock: 2,
    sku: "SKU-AUTO-006",
    rating: 4.9,
    reviewCount: 95,
    createdAt: "2026-07-15",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "Mercedes-AMG GT R V8 Biturbo",
    description:
      "Handcrafted AMG 4.0L V8 biturbo engine with 577 hp. AMG coilover suspension and 9-mode AMG traction control system.",
    imageURL:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    price: "27500",
    colors: ["#E5AA4B", "#121212"],
    stock: 3,
    sku: "SKU-AUTO-007",
    rating: 4.9,
    reviewCount: 130,
    createdAt: "2026-07-11",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "Range Rover Sport SV Carbon Edition",
    description:
      "Twin-turbo V8 mild-hybrid engine with 626 hp. 6D Dynamics air suspension and 23-inch ultra-lightweight carbon fiber wheels.",
    imageURL:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    price: "24000",
    colors: ["#121212", "#3C2A21"],
    stock: 4,
    sku: "SKU-AUTO-008",
    rating: 4.8,
    reviewCount: 88,
    createdAt: "2026-07-08",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "Alfa Romeo Giulia Quadrifoglio",
    description:
      "2.9L twin-turbo V6 engine developed with Ferrari expertise pumping 505 hp. Carbon fiber active aero front splitter.",
    imageURL:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80",
    price: "16800",
    colors: ["#FF0032", "#121212", "#C34038"],
    stock: 7,
    sku: "SKU-AUTO-009",
    rating: 4.7,
    reviewCount: 74,
    createdAt: "2026-07-04",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },
  {
    id: uuid(),
    title: "Subaru WRX STI Rally Spec Coupe",
    description:
      "Symmetrical All-Wheel Drive with 2.5L turbocharged BOXER engine. Driver Controlled Center Differential (DCCD) and Brembo brakes.",
    imageURL:
      "https://images.unsplash.com/photo-1621993202323-f438eec934ff?auto=format&fit=crop&w=800&q=80",
    price: "9800",
    colors: ["#2563eb", "#C0C0C0"],
    stock: 11,
    sku: "SKU-AUTO-010",
    rating: 4.6,
    reviewCount: 165,
    createdAt: "2026-07-02",
    category: {
      name: "Automotive",
      imageURL:
        "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
    },
  },

  // ================= ACCESSORIES (10 Products) =================
  {
    id: uuid(),
    title: "Swiss Automatic Chronograph Mechanical Watch",
    description:
      "Swiss-made automatic movement with 48-hour power reserve. 316L stainless steel case with scratch-resistant sapphire crystal and exhibition caseback.",
    imageURL:
      "https://i.pinimg.com/1200x/8b/49/f6/8b49f6aaca9ffa2e72262fc1f2c2c734.jpg",
    price: "1850",
    colors: ["#C0C0C0", "#121212", "#3C2A21"],
    stock: 16,
    sku: "SKU-ACCE-001",
    rating: 4.9,
    reviewCount: 310,
    createdAt: "2026-07-30",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Designer Polarized Titanium Aviator Sunglasses",
    description:
      "Ultra-lightweight Japanese titanium frame with anti-reflective polarized lenses. 100% UV400 protection with hydrophobic coating.",
    imageURL:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    price: "240",
    colors: ["#C0C0C0", "#121212", "#E3BD9E"],
    stock: 35,
    sku: "SKU-ACCE-002",
    rating: 4.7,
    reviewCount: 195,
    createdAt: "2026-07-27",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Italian Full-Grain Leather Executive Briefcase",
    description:
      "Handcrafted in Florence using vegetable-tanned Tuscan leather. Fits 16-inch laptops with dedicated padded compartment and brass latch closure.",
    imageURL:
      "https://i.pinimg.com/736x/23/06/c2/2306c2d3c152acde77ce49c8b5fab3b5.jpg",
    price: "450",
    colors: ["#3C2A21", "#121212"],
    stock: 22,
    sku: "SKU-ACCE-003",
    rating: 4.8,
    reviewCount: 140,
    createdAt: "2026-07-24",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Minimalist Titanium Smart Fitness Ring",
    description:
      "Waterproof titanium smart ring tracking sleep stages, heart rate variability, and body temperature. Up to 7 days battery life per charge.",
    imageURL:
      "https://i.pinimg.com/736x/2b/64/57/2b645756479750ee80bcac30c543abe0.jpg",
    price: "299",
    colors: ["#121212", "#C0C0C0"],
    stock: 40,
    sku: "SKU-ACCE-004",
    rating: 4.6,
    reviewCount: 280,
    createdAt: "2026-07-21",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Handcrafted RFID Slim Leather Cardholder",
    description:
      "Slim bi-fold cardholder with RFID blocking technology. Holds up to 8 cards and cash with pull-tab quick access slot.",
    imageURL:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    price: "120",
    colors: ["#121212", "#3C2A21", "#820000"],
    stock: 75,
    sku: "SKU-ACCE-005",
    rating: 4.7,
    reviewCount: 340,
    createdAt: "2026-07-18",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Luxury Cashmere Patterned Scarf",
    description:
      "Hand-woven 100% Mongolian cashmere scarf with fringed edges. Lightweight warmth with timeless houndstooth weave pattern.",
    imageURL:
      "https://i.pinimg.com/1200x/15/f9/68/15f968b2f4896eb092ea9f44d30907aa.jpg",
    price: "195",
    colors: ["#3C2A21", "#C0C0C0", "#121212"],
    stock: 28,
    sku: "SKU-ACCE-006",
    rating: 4.8,
    reviewCount: 92,
    createdAt: "2026-07-14",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: " Vintage Cat Painting | Whispers of the Garden",
    description:
      "Bring warmth and charm to your space with Garden Companions, a timeless artwork featuring a graceful ginger cat and two playful kittens nestled beneath lush vines and blooming flowers. The soft lighting and vintage aesthetic create a cozy atmosphere that complements both modern and classic interiors.",
    imageURL:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
    price: "110",
    colors: ["#FF6E31", "#121212"],
    stock: 85,
    sku: "SKU-ACCE-007",
    rating: 4.6,
    reviewCount: 155,
    createdAt: "2026-07-10",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Ruby Eclipse Pendant Necklace",
    description:
      "An elegant gold necklace featuring a stunning oval-cut ruby centerpiece surrounded by sparkling crystal accents in a graceful crescent design. Crafted to combine timeless luxury with modern sophistication, this piece adds a refined touch to both everyday looks and special occasions.",
    imageURL:
      "https://i.pinimg.com/736x/bd/4f/9a/bd4f9aba7e1fbc00f2f1b421790aabc2.jpg",
    price: "320",
    colors: ["#C0C0C0", "#8D8379"],
    stock: 0,
    sku: "SKU-ACCE-008",
    rating: 4.9,
    reviewCount: 78,
    createdAt: "2026-07-07",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Traveler Leather Passport Wallet & Tech Pouch",
    description:
      "Full-grain Horween leather travel wallet with passport sleeve, pen loop, coin pocket, and micro SD card storage slots.",
    imageURL:
      "https://i.pinimg.com/736x/4a/17/28/4a1728134dee7ac6e386e40155ab5dd1.jpg",
    price: "175",
    colors: ["#3C2A21", "#121212"],
    stock: 33,
    sku: "SKU-ACCE-009",
    rating: 4.7,
    reviewCount: 110,
    createdAt: "2026-07-04",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Ceramic Minimalist Desk Organizer",
    description:
      "Matte ceramic desk tray for everyday EDC items like watches, rings, keys, and fountain pens. Soft cork base protects surfaces.",
    imageURL:
      "https://i.pinimg.com/736x/e1/f3/11/e1f31103501107cbc6c34f234cea4810.jpg",
    price: "105",
    colors: ["#C0C0C0", "#121212"],
    stock: 44,
    sku: "SKU-ACCE-010",
    rating: 4.8,
    reviewCount: 88,
    createdAt: "2026-07-01",
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
];

export const formInputsList: FormInput[] = [
  {
    id: "title",
    name: "title",
    label: "Product Title",
    type: "text",
  },
  {
    id: "description",
    name: "description",
    label: "Product Description",
    type: "text",
  },
  {
    id: "imageURL",
    name: "imageURL",
    label: "Product Image URL",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    label: "Product Price ($)",
    type: "text",
  },
];

export const colors: string[] = [
  "#121212",
  "#C0C0C0",
  "#13005A",
  "#3C2A21",
  "#820000",
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#06b6d4",
  "#8b5cf6",
  "#ea580c",
];

export const categories: Category[] = [
  {
    id: uuid(),
    name: "Electronics",
    imageURL:
      "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
  },
  {
    id: uuid(),
    name: "Clothes",
    imageURL:
      "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
  },
  {
    id: uuid(),
    name: "Photography",
    imageURL:
      "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  },
  {
    id: uuid(),
    name: "Furniture",
    imageURL:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: uuid(),
    name: "Sneakers",
    imageURL:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: uuid(),
    name: "Automotive",
    imageURL:
      "https://i.pinimg.com/736x/a3/c9/d0/a3c9d00d8dc9b8ac41d99b7dd429c43f.jpg",
  },
  {
    id: uuid(),
    name: "Accessories",
    imageURL:
      "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
  },
];
