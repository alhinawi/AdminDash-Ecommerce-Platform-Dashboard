import { v4 as uuid } from "uuid";
import product1 from "../assets/images/product-1.avif";
import product2 from "../assets/images/product-2.avif";
import product3 from "../assets/images/product-3.avif";
import product4 from "../assets/images/product-4.avif";
import type { Category, FormInput, Product } from "../interfaces";

export const productList: Product[] = [
  {
    id: uuid(),
    title: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise cancellation with dual processors. Crystal clear hands-free calling with 4 beamforming microphones. Up to 30 hours of battery life with quick charging. Ultra-comfortable and lightweight design with soft-fit leather headband.",
    imageURL:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    price: "399",
    colors: ["#121212", "#C0C0C0", "#13005A"],
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
    },
  },
  {
    id: uuid(),
    title: "Premium Leather Bomber Jacket",
    description:
      "Crafted from genuine full-grain lambskin leather with a buttery soft feel. Features a satin-lined interior, ribbed cuffs and hem, and two interior pockets. A timeless wardrobe essential that only gets better with age.",
    imageURL:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    price: "589",
    colors: ["#3C2A21", "#121212", "#820000"],
    category: {
      name: "Clothes",
      imageURL:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Canon EOS R6 Mark II",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor and DIGIC X processor. Shoots up to 40fps electronic shutter with subject detection autofocus. 4K 60p video recording with oversampling for stunning cinematic footage. Dual card slots and in-body image stabilization up to 8 stops.",
    imageURL:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    price: "2499",
    colors: ["#121212"],
    category: {
      name: "Photography",
      imageURL:
        "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60",
    },
  },
  {
    id: uuid(),
    title: "Scandinavian Modern Sofa",
    description:
      "Minimalist three-seater sofa with solid oak legs and premium linen upholstery. Features high-density foam cushions for superior comfort and durability. Clean lines and a neutral palette make it perfect for any contemporary living space.",
    imageURL:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    price: "1299",
    colors: ["#84D2C5", "#3C2A21", "#C0C0C0"],
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "Nike Shoes",
    description:
      "Soft foam cushioning and durable traction make run feel smoother and more comfortable.",
    imageURL: product1,
    price: "350",
    colors: [
      "#A31ACB",
      "#FF6E31",
      "#3C2A21",
      "#CB1C8D",
      "#645CBB",
      "#FF0032",
      "#820000",
      "#13005A",
      "#1F8A70",
      "#84D2C5",
    ],
    category: {
      name: "Sneakers",
      imageURL:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: uuid(),
    title: "2022 Genesis GV70: Nominee",
    description:
      "As luxury brands go, South Korea’s Genesis is still in its infancy, having sold its first cars (as an independent Hyundai spinoff), the G80 and G90 sedans, for the 2017 model year. Despite its relative youth, Genesis has had a string of successes: We named the automaker’s G70 sports sedan our Best of 2019 award winner, and its GV80 mid-size SUV was a nominee last year for our Best of the Year award. New for 2022, the GV70 compact luxury SUV impresses on a number of fronts. Sleek exterior styling bridges the gap between a traditional SUV and the coupelike SUV look that’s increasingly popular among luxury marques. The cabin is just as distinctive and can be trimmed with premium materials like Nappa leather and carbon fiber.",
    imageURL: product2,
    price: "500000",
    colors: ["#FF0032", "#2563eb", "#FF6E31"],
    category: {
      name: "Cars",
     imageURL:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  },
  {
    id: uuid(),
    title: "Chevrolet Spark. 995cc Petrol",
    description:
      "As luxury brands go, South Korea’s Genesis is still in its infancy, having sold its first cars (as an independent Hyundai spinoff), the G80 and G90 sedans, for the 2017 model year. Despite its relative youth, Genesis has had a string of successes: We named the automaker’s G70 sports sedan our Best of 2019 award winner, and its GV80 mid-size SUV was a nominee last year for our Best of the Year award. New for 2022, the GV70 compact luxury SUV impresses on a number of fronts. Sleek exterior styling bridges the gap between a traditional SUV and the coupelike SUV look that’s increasingly popular among luxury marques. The cabin is just as distinctive and can be trimmed with premium materials like Nappa leather and carbon fiber.",
    imageURL: product3,
    price: "120000",
    colors: ["#A31ACB", "#3C2A21", "#1F8A70", "#820000", "#FF0032"],
    category: {
      name: "Cars",
      imageURL:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  },
  {
    id: uuid(),
    title: "Apple MacBook Pro 16-inch (M3 Max)",
    description:
      "Apple M3 Max chip with 16‑core CPU, 40‑core GPU, and 16‑core Neural Engine. 128GB unified memory and 8TB SSD storage. Brilliant 16.2-inch Liquid Retina XDR display with ProMotion and True Tone. Includes 140W USB-C Power Adapter. Designed for the most demanding pro workflows.",
    imageURL:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    price: "7199",
    colors: ["#121212", "#C0C0C0"],
    category: {
      name: "Electronics",
      imageURL:
        "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
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
    id: "image",
    name: "imageURL",
    label: "Product Image URL",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    label: "Product Price",
    type: "text",
  },
];

export const colors: string[] = [
  "#a855f7",
  "#2563eb",
  "#84D2C5",
  "#13005A",
  "#A31ACB",
  "#FF6E31",
  "#3C2A21",
  "#6C4AB6",
  "#CB1C8D",
  "#000000",
  "#645CBB",
];

export const categories: Category[] = [
  {
    id: uuid(),
    name: "Sneakers",
    imageURL:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: uuid(),
    name: "Accessories",
    imageURL:
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: uuid(),
    name: "Clothes",
    imageURL:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: uuid(),
    name: "Electronics",
    imageURL:
      "https://i.pinimg.com/1200x/52/8f/cf/528fcf888642c11bd4b71e50b06b1446.jpg",
  },
  {
    id: uuid(),
    name: "Furniture",
    imageURL:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: uuid(),
    name: "Cars",
  imageURL:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: uuid(),
    name: "Photography",
    imageURL:
      "https://images.unsplash.com/photo-1544743744-48719693e9d9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtZXJhJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
];
