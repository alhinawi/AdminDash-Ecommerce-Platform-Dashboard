import { v4 as uuid } from "uuid";
import product1 from "../assets/images/product-1.avif";
import product2 from "../assets/images/product-2.avif";
import product3 from "../assets/images/product-3.avif";

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
      "https://i.pinimg.com/1200x/c0/16/0e/c0160e8c14bee1e1e9bde90deb35f260.jpg",
    price: "589",
    colors: ["#3C2A21", "#121212", "#820000"],
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Canon EOS R6 Mark II",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor and DIGIC X processor. Shoots up to 40fps electronic shutter with subject detection autofocus. 4K 60p video recording with oversampling for stunning cinematic footage. Dual card slots and in-body image stabilization up to 8 stops.",
    imageURL:
      "https://i.pinimg.com/1200x/ba/a5/ec/baa5ecd5edb65c9a7016fe703091af1a.jpg",
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
    title: "Nike Free RN Flyknit - Red Running Shoes",
    description:
      "Lightweight, flexible, and designed for maximum comfort, the Nike Free RN Flyknit combines modern style with exceptional performance for everyday running and training.",
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
    title: "Chevrolet Camaro SS 2018 - Blue Sports Coupe",
    description:
      "Turn heads with the Chevrolet Camaro SS, featuring a bold blue finish, muscular styling, and exhilarating performance. Built for drivers who crave power, speed, and modern design.",
    imageURL: product2,
    price: "500000",
    colors: ["#FF0032", "#2563eb", "#FF6E31"],
    category: {
      name: "Automotors",
      imageURL:
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  },
  {
    id: uuid(),
    title: "Ferrari LaFerrari 2015 - Red Hypercar",
    description:
      "Experience the power and elegance of the Ferrari LaFerrari. Featuring a stunning red exterior, aerodynamic design, and world-class performance, this iconic hypercar combines luxury, speed, and innovation in one",
    imageURL: product3,
    price: "120000",
    colors: ["#A31ACB", "#3C2A21", "#1F8A70", "#820000", "#FF0032"],
    category: {
      name: "Automotors",
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
  {
    id: uuid(),
    title: "Rolex Oyster Perpetual Silver Watch",
    description:
      "Precision-engineered luxury chronograph watch featuring a stainless steel bracelet, scratch-resistant sapphire crystal, and waterproof oyster case.",
    imageURL:
      "https://i.pinimg.com/736x/18/8a/93/188a937ccfe2454d9cafaba304de1276.jpg",
    price: "12500",
    colors: ["#C0C0C0", "#000000"],
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Coco Noir Eau de Parfum 100m",
    description:
      "Discover the elegance of Chanel Coco Noir, a sophisticated fragrance that blends sensual floral notes with warm woody accords, creating a timeless and luxurious scent.",
    imageURL:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    price: "495",
    colors: ["#000000", "#C0C0C0"],
    category: {
      name: "Accessories",
      imageURL:
        "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
    },
  },
  {
    id: uuid(),
    title: "Italian Mulberry Slim-Fit Shirt",
    description:
      "100% pure Mulberry tailored shirt with mother-of-pearl buttons. Unmatched softness and breathability with an elegant subtle sheen.",
    imageURL:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    price: "340",
    colors: ["#565761", "#C0C0C0", "#5D273D"],
    category: {
      name: "Clothes",
      imageURL:
        "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
    },
  },
  {
    id: uuid(),
    title: "Eames Executive Leather Lounge Chair",
    description:
      "Iconic mid-century modern armchair crafted with molded walnut plywood shell and supple black top-grain leather upholstery.",
    imageURL:
      "https://i.pinimg.com/736x/5e/02/ee/5e02ee02ce8d759ddd149328274e85ac.jpg",
    price: "5495",
    colors: ["#3C2A21", "#000000"],
    category: {
      name: "Furniture",
      imageURL:
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=200&q=80",
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
      "https://i.pinimg.com/736x/59/39/e8/5939e895dc24015b03f3c1ba3c104f37.jpg",
  },
  {
    id: uuid(),
    name: "Clothes",
    imageURL:
      "https://i.pinimg.com/736x/43/f9/3a/43f93a9825a88d5ce0e36e8c46d0f4cd.jpg",
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
    name: "Automotors",
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
