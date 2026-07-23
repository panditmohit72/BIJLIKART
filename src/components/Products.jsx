import "./Products.css";

import samsungtv from "../assets/products/samsung-tv.jpg";
import lgac from "../assets/products/lg-ac.jpg";
import whirlpoolfridge from "../assets/products/whirlpool-fridge.jpg";
import hplaptop from "../assets/products/hp-laptop.jpg";

function Products() {
  const products = [
    {
      image: samsungtv,
      name: "Samsung Smart TV",
      price: "₹49,999",
      oldPrice: "₹59,999",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      image: lgac,
      name: "LG Air Conditioner",
      price: "₹39,999",
      oldPrice: "₹45,999",
      rating: "⭐⭐⭐⭐☆",
    },
    {
      image: whirlpoolfridge,
      name: "Whirlpool Fridge",
      price: "₹27,999",
      oldPrice: "₹32,999",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      image: hplaptop,
      name: "HP Laptop",
      price: "₹62,999",
      oldPrice: "₹71,999",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <section className="products">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item.name}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <p className="rating">{item.rating}</p>

            <p className="price">{item.price}</p>

            <p className="old-price">
            <del>{item.oldPrice}</del>
             </p>

            <button className="cart-btn">
              Add to Cart 
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;