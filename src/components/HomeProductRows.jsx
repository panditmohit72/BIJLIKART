import ProductRow from "./ProductRow";

import samsungTV from "../assets/products/samsung-tv.jpg";
import lgAC from "../assets/products/lg-ac.jpg";
import whirlpoolFridge from "../assets/products/whirlpool-fridge.jpg";
import hpLaptop from "../assets/products/hp-laptop.jpg";

function HomeProductRows({ addToCart }) {
  const bestSellers = [
    {
      id: 101,
      name: "Samsung 55 inch 4K Ultra HD Smart TV",
      image: samsungTV,
      price: 49999,
      oldPrice: 59999,
      discount: "17% off",
      rating: 4.8,
      reviews: 126,
      delivery: "FREE Delivery",
    },
    {
      id: 102,
      name: "LG 1.5 Ton 5 Star Inverter Split AC",
      image: lgAC,
      price: 39999,
      oldPrice: 45999,
      discount: "13% off",
      rating: 4.7,
      reviews: 94,
      delivery: "Free Installation",
    },
    {
      id: 103,
      name: "Whirlpool 265L Double Door Refrigerator",
      image: whirlpoolFridge,
      price: 27999,
      oldPrice: 32999,
      discount: "15% off",
      rating: 4.6,
      reviews: 78,
      delivery: "FREE Delivery",
    },
    {
      id: 104,
      name: "HP 15 Intel Core i5 Laptop",
      image: hpLaptop,
      price: 62999,
      oldPrice: 71999,
      discount: "12% off",
      rating: 4.7,
      reviews: 112,
      delivery: "Delivery Today",
    },
    {
      id: 105,
      name: "Samsung Smart TV Special Edition",
      image: samsungTV,
      price: 44999,
      oldPrice: 54999,
      discount: "18% off",
      rating: 4.5,
      reviews: 85,
      delivery: "FREE Delivery",
    },
    {
      id: 106,
      name: "LG Inverter AC Energy Efficient",
      image: lgAC,
      price: 36999,
      oldPrice: 42999,
      discount: "14% off",
      rating: 4.6,
      reviews: 69,
      delivery: "Free Installation",
    },
  ];

  const tvProducts = [
    {
      id: 201,
      name: "Samsung Crystal 4K Smart LED TV",
      image: samsungTV,
      price: 42999,
      oldPrice: 52999,
      discount: "19% off",
      rating: 4.7,
      reviews: 151,
      delivery: "FREE Delivery",
    },
    {
      id: 202,
      name: "Samsung 55 inch Ultra HD Smart TV",
      image: samsungTV,
      price: 49999,
      oldPrice: 59999,
      discount: "17% off",
      rating: 4.8,
      reviews: 126,
      delivery: "FREE Delivery",
    },
    {
      id: 203,
      name: "Premium 4K Smart Television",
      image: samsungTV,
      price: 38999,
      oldPrice: 46999,
      discount: "17% off",
      rating: 4.5,
      reviews: 74,
      delivery: "Delivery Tomorrow",
    },
    {
      id: 204,
      name: "Smart LED TV with Streaming Apps",
      image: samsungTV,
      price: 34999,
      oldPrice: 41999,
      discount: "16% off",
      rating: 4.4,
      reviews: 63,
      delivery: "FREE Delivery",
    },
    {
      id: 205,
      name: "Large Screen 4K Home Entertainment TV",
      image: samsungTV,
      price: 57999,
      oldPrice: 67999,
      discount: "15% off",
      rating: 4.7,
      reviews: 91,
      delivery: "FREE Delivery",
    },
  ];

  const applianceProducts = [
    {
      id: 301,
      name: "LG 1.5 Ton 5 Star Inverter AC",
      image: lgAC,
      price: 39999,
      oldPrice: 45999,
      discount: "13% off",
      rating: 4.7,
      reviews: 94,
      delivery: "Free Installation",
    },
    {
      id: 302,
      name: "Whirlpool 265L Double Door Refrigerator",
      image: whirlpoolFridge,
      price: 27999,
      oldPrice: 32999,
      discount: "15% off",
      rating: 4.6,
      reviews: 78,
      delivery: "FREE Delivery",
    },
    {
      id: 303,
      name: "Energy Efficient Inverter Split AC",
      image: lgAC,
      price: 35999,
      oldPrice: 41999,
      discount: "14% off",
      rating: 4.5,
      reviews: 59,
      delivery: "Free Installation",
    },
    {
      id: 304,
      name: "Large Capacity Double Door Refrigerator",
      image: whirlpoolFridge,
      price: 31999,
      oldPrice: 36999,
      discount: "14% off",
      rating: 4.6,
      reviews: 81,
      delivery: "FREE Delivery",
    },
    {
      id: 305,
      name: "5 Star AC with Fast Cooling",
      image: lgAC,
      price: 42999,
      oldPrice: 49999,
      discount: "14% off",
      rating: 4.7,
      reviews: 107,
      delivery: "Free Installation",
    },
  ];

  const laptopMobileProducts = [
    {
      id: 401,
      name: "HP 15 Intel Core i5 Laptop",
      image: hpLaptop,
      price: 62999,
      oldPrice: 71999,
      discount: "12% off",
      rating: 4.7,
      reviews: 112,
      delivery: "Delivery Today",
    },
    {
      id: 402,
      name: "HP Laptop for Work and Study",
      image: hpLaptop,
      price: 52999,
      oldPrice: 60999,
      discount: "13% off",
      rating: 4.5,
      reviews: 88,
      delivery: "FREE Delivery",
    },
    {
      id: 403,
      name: "Performance Laptop with SSD Storage",
      image: hpLaptop,
      price: 57999,
      oldPrice: 65999,
      discount: "12% off",
      rating: 4.6,
      reviews: 72,
      delivery: "Delivery Tomorrow",
    },
    {
      id: 404,
      name: "Premium Laptop for Students & Professionals",
      image: hpLaptop,
      price: 67999,
      oldPrice: 76999,
      discount: "12% off",
      rating: 4.7,
      reviews: 96,
      delivery: "FREE Delivery",
    },
    {
      id: 405,
      name: "Everyday Laptop with Fast Performance",
      image: hpLaptop,
      price: 48999,
      oldPrice: 55999,
      discount: "13% off",
      rating: 4.4,
      reviews: 61,
      delivery: "Delivery Today",
    },
  ];

  return (
    <>
      <ProductRow
        title="Best Sellers in Electronics"
        subtitle="Popular electronics customers are shopping for"
        products={bestSellers}
        addToCart={addToCart}
      />

      <ProductRow
        title="TVs & Home Entertainment"
        subtitle="Upgrade your entertainment experience"
        products={tvProducts}
        addToCart={addToCart}
      />

      <ProductRow
        title="ACs & Home Appliances"
        subtitle="Electronics for a smarter and more comfortable home"
        products={applianceProducts}
        addToCart={addToCart}
      />

      <ProductRow
        title="Laptops & Computing"
        subtitle="For study, work and everyday performance"
        products={laptopMobileProducts}
        addToCart={addToCart}
      />
    </>
  );
}

export default HomeProductRows;