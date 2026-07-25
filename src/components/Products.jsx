import "./Products.css";
import { useNavigate } from "react-router-dom";

import samsungTV from "../assets/products/samsung-tv.jpg";
import lgAC from "../assets/products/lg-ac.jpg";
import whirlpoolFridge from "../assets/products/whirlpool-fridge.jpg";
import hpLaptop from "../assets/products/hp-laptop.jpg";

function Products({ addToCart }) {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Samsung 55 inch 4K Smart TV",
      category: "TV",
      image: samsungTV,
      price: 49999,
      oldPrice: 59999,
      rating: 4.8,
      reviews: 126,
      shop: "Sharma Electronics",
      location: "Mathura",
      delivery: "Free Delivery",
      discount: "17% OFF",
    },
    {
      id: 2,
      name: "LG 1.5 Ton 5 Star Inverter AC",
      category: "Air Conditioner",
      image: lgAC,
      price: 39999,
      oldPrice: 45999,
      rating: 4.7,
      reviews: 94,
      shop: "Gupta Electronics",
      location: "Mathura",
      delivery: "Free Installation",
      discount: "13% OFF",
    },
    {
      id: 3,
      name: "Whirlpool 265L Double Door Fridge",
      category: "Refrigerator",
      image: whirlpoolFridge,
      price: 27999,
      oldPrice: 32999,
      rating: 4.6,
      reviews: 78,
      shop: "Agarwal Electronics",
      location: "Mathura",
      delivery: "Free Delivery",
      discount: "15% OFF",
    },
    {
      id: 4,
      name: "HP 15 Intel Core i5 Laptop",
      category: "Laptop",
      image: hpLaptop,
      price: 62999,
      oldPrice: 71999,
      rating: 4.7,
      reviews: 112,
      shop: "Digital World",
      location: "Mathura",
      delivery: "Delivery Today",
      discount: "12% OFF",
    },
    {
      id: 5,
      name: "Samsung 8KG Fully Automatic Washing Machine",
      category: "Washing Machine",
      image: samsungTV,
      price: 28999,
      oldPrice: 34999,
      rating: 4.5,
      reviews: 67,
      shop: "Sharma Electronics",
      location: "Mathura",
      delivery: "Free Delivery",
      discount: "17% OFF",
    },
    {
      id: 6,
      name: "Sony Wireless Noise Cancelling Headphones",
      category: "Headphones",
      image: hpLaptop,
      price: 14999,
      oldPrice: 18999,
      rating: 4.8,
      reviews: 156,
      shop: "Sound Zone",
      location: "Mathura",
      delivery: "Delivery Tomorrow",
      discount: "21% OFF",
    },
    {
      id: 7,
      name: "JBL Bluetooth Portable Speaker",
      category: "Speaker",
      image: lgAC,
      price: 6999,
      oldPrice: 8999,
      rating: 4.6,
      reviews: 89,
      shop: "Digital World",
      location: "Mathura",
      delivery: "Free Delivery",
      discount: "22% OFF",
    },
    {
      id: 8,
      name: "Samsung 5G Smartphone 128GB",
      category: "Mobile",
      image: samsungTV,
      price: 24999,
      oldPrice: 29999,
      rating: 4.7,
      reviews: 203,
      shop: "Mobile Hub",
      location: "Mathura",
      delivery: "Delivery Today",
      discount: "17% OFF",
    },
  ];

  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN").format(price);
  }

  function handleAddToCart(product) {
    if (addToCart) {
      addToCart(product);
    } else {
      alert(`${product.name} added to cart!`);
    }
  }

  function handleViewDetails(product) {
    navigate(`/product/${product.id}`);
  }

  function handleSellerJoin() {
    navigate("/seller-register");
  }

  return (
    <section className="products-section" id="products">
      <div className="products-heading">
        <div>
          <span className="products-small-title">
            LOCAL DEALS
          </span>

          <h2>Featured Products</h2>

          <p>
            Compare electronics from trusted local sellers
            across Mathura.
          </p>
        </div>

        <button
          type="button"
          className="view-all-products"
          onClick={() =>
            alert("All Products page will be added soon!")
          }
        >
          View All Products →
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-box">
              <span className="discount-badge">
                {product.discount}
              </span>

              <span className="local-badge">
                📍 Local Seller
              </span>

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                onClick={() => handleViewDetails(product)}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="product-info">
              <span className="product-category">
                {product.category}
              </span>

              <h3>{product.name}</h3>

              <div className="product-rating">
                <span>⭐ {product.rating}</span>

                <span className="review-count">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="product-price-row">
                <strong className="product-price">
                  ₹{formatPrice(product.price)}
                </strong>

                <span className="old-price">
                  ₹{formatPrice(product.oldPrice)}
                </span>
              </div>

              <div className="seller-box">
                <div>
                  <span className="sold-by">
                    Sold by
                  </span>

                  <strong>
                    🏪 {product.shop}
                  </strong>
                </div>

                <span className="verified-seller">
                  ✓ Verified
                </span>
              </div>

              <div className="delivery-info">
                🚚 {product.delivery}
                {" • "}
                📍 {product.location}
              </div>

              <div className="product-buttons">
                <button
                  type="button"
                  className="details-button"
                  onClick={() => handleViewDetails(product)}
                >
                  View Details
                </button>

                <button
                  type="button"
                  className="cart-button"
                  onClick={() => handleAddToCart(product)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="local-marketplace-banner">
        <div>
          <span className="banner-icon">🏪</span>

          <div>
            <h3>Own an Electronics Shop?</h3>

            <p>
              Join BIJLIKART and start selling your products
              online to customers across Mathura.
            </p>
          </div>
        </div>

        <button type="button" onClick={handleSellerJoin}>
          Sell on BIJLIKART →
        </button>
      </div>
    </section>
  );
}

export default Products;