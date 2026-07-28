import "./Products.css";
import { useNavigate } from "react-router-dom";

import samsungTV from "../assets/products/samsung-tv.jpg";
import lgAC from "../assets/products/lg-ac.jpg";
import whirlpoolFridge from "../assets/products/whirlpool-fridge.jpg";
import hpLaptop from "../assets/products/hp-laptop.jpg";

function Products({
  addToCart,
  searchText = "",
  searchCategory = "all",
  clearSearch,
}) {
  const navigate = useNavigate();

 const defaultProducts = [
    {
      id: 1,
      name: "Samsung 55 inch 4K Smart TV",
      category: "Television",
      image: samsungTV,
      price: 49999,
      oldPrice: 59999,
      rating: 4.8,
      reviews: 126,
      shop: "Sharma Electronics",
      location: "Mathura",
      delivery: "FREE Delivery",
      discount: "17% off",
      tag: "Deal",
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
      discount: "13% off",
      tag: "Summer Deal",
    },
    {
      id: 3,
      name: "Whirlpool 265L Double Door Refrigerator",
      category: "Refrigerator",
      image: whirlpoolFridge,
      price: 27999,
      oldPrice: 32999,
      rating: 4.6,
      reviews: 78,
      shop: "Agarwal Electronics",
      location: "Mathura",
      delivery: "FREE Delivery",
      discount: "15% off",
      tag: "Limited Deal",
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
      discount: "12% off",
      tag: "Top Deal",
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
      delivery: "FREE Delivery",
      discount: "17% off",
      tag: "Deal",
    },
    {
      id: 6,
      name: "Sony Wireless Noise Cancelling Headphones",
      category: "Audio",
      image: hpLaptop,
      price: 14999,
      oldPrice: 18999,
      rating: 4.8,
      reviews: 156,
      shop: "Sound Zone",
      location: "Mathura",
      delivery: "Delivery Tomorrow",
      discount: "21% off",
      tag: "Hot Deal",
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
      delivery: "FREE Delivery",
      discount: "22% off",
      tag: "Deal",
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
      discount: "17% off",
      tag: "Best Seller",
    },
  ];
const sellerProducts = JSON.parse(
  localStorage.getItem("bijlikartSellerProducts") || "[]"
);

const products = [
  ...defaultProducts,
  ...sellerProducts.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    image:
      item.images && item.images.length
        ? item.images[0]
        : item.image || samsungTV,
    images: item.images || [],
    price: Number(item.price),
    oldPrice: Number(item.oldPrice || item.price),
    rating: item.rating || 5,
    reviews: item.reviews || 0,
    shop: item.shop || item.seller || "BIJLIKART Seller",
    seller: item.shop || item.seller || "BIJLIKART Seller",
    location: item.location || "Mathura",
    delivery: item.delivery || "FREE Delivery",
    discount: item.discount || "New",
    tag: "New Arrival",
    stock: "In Stock",
    warranty: item.warranty || "Seller Warranty",
    highlights: item.highlights || [],
    specifications: item.specifications || {},
  })),
];
  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN").format(price);
  }

  /* =============================
     SMART SEARCH
  ============================= */

  function normalize(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
  }

  function categoryMatches(product, selectedCategory) {
    if (
      !selectedCategory ||
      selectedCategory === "all"
    ) {
      return true;
    }

    const selected = normalize(selectedCategory);
    const productCategory = normalize(product.category);
    const productName = normalize(product.name);

    if (selected === "tv") {
      return (
        productCategory.includes("television") ||
        productName.includes("tv")
      );
    }

    if (selected === "ac") {
      return (
        productCategory.includes("air conditioner") ||
        productName.includes(" ac")
      );
    }

    if (selected === "refrigerator") {
      return (
        productCategory.includes("refrigerator") ||
        productName.includes("fridge")
      );
    }

    if (selected === "mobile") {
      return (
        productCategory.includes("mobile") ||
        productName.includes("smartphone") ||
        productName.includes("mobile")
      );
    }

    if (selected === "laptop") {
      return (
        productCategory.includes("laptop") ||
        productName.includes("laptop")
      );
    }

    if (selected === "washing machine") {
      return (
        productCategory.includes("washing machine") ||
        productName.includes("washing machine")
      );
    }

    if (selected === "audio") {
      return (
        productCategory.includes("audio") ||
        productCategory.includes("speaker") ||
        productName.includes("headphone") ||
        productName.includes("speaker")
      );
    }

    return productCategory.includes(selected);
  }

  function textMatches(product, text) {
    if (!text.trim()) {
      return true;
    }

    const query = normalize(text);

    const searchableText = normalize(
      `${product.name} ${product.category} ${product.shop} ${product.location}`
    );

    /*
      Common customer words:
      fridge -> refrigerator
      tv -> television
      ac -> air conditioner
      phone -> mobile/smartphone
    */

    const aliases = {
      fridge: "refrigerator",
      tv: "television",
      ac: "air conditioner",
      phone: "mobile",
      smartphone: "mobile",
      headphones: "audio",
      headphone: "audio",
    };

    if (searchableText.includes(query)) {
      return true;
    }

    const alias = aliases[query];

    if (alias) {
      return searchableText.includes(alias);
    }

    return false;
  }

  const filteredProducts = products.filter(
    (product) =>
      categoryMatches(product, searchCategory) &&
      textMatches(product, searchText)
  );

  const searchActive =
    searchText.trim() !== "" ||
    searchCategory !== "all";

  function handleAddToCart(product) {
    if (addToCart) {
      addToCart(product);
    }
  }

  function handleViewDetails(product) {
    navigate(`/product/${product.id}`);
  }

  return (
    <section
      className="bk-products-page"
      id="products"
    >
      {/* TODAY'S DEALS */}

      {!searchActive && (
        <div className="bk-deals-section">
          <div className="bk-product-section-heading">
            <div>
              <h2>Today's Deals</h2>

              <p>
                Great savings on electronics from local sellers
              </p>
            </div>

            <button type="button">
              See all deals
            </button>
          </div>

          <div className="bk-deals-scroll">
            {products.slice(0, 6).map((product) => (
              <article
                className="bk-deal-product"
                key={product.id}
                onClick={() =>
                  handleViewDetails(product)
                }
              >
                <div className="bk-deal-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="bk-deal-label">
                  <strong>
                    {product.discount}
                  </strong>

                  <span>
                    {product.tag}
                  </span>
                </div>

                <h3>{product.name}</h3>

                <div className="bk-deal-price">
                  <sup>₹</sup>

                  <strong>
                    {formatPrice(product.price)}
                  </strong>
                </div>

                <small>
                  M.R.P.:{" "}
                  <span>
                    ₹{formatPrice(product.oldPrice)}
                  </span>
                </small>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* FEATURED / SEARCH RESULTS */}

      <div className="bk-featured-section">
        <div className="bk-product-section-heading">
          <div>
            <h2>
              {searchActive
                ? "Search Results"
                : "Featured Electronics"}
            </h2>

            <p>
              {searchActive
                ? `${filteredProducts.length} product${
                    filteredProducts.length === 1
                      ? ""
                      : "s"
                  } found`
                : "Shop from trusted electronics stores near you"}
            </p>
          </div>

          {searchActive ? (
            <button
              type="button"
              onClick={clearSearch}
            >
              Clear Search
            </button>
          ) : (
            <button type="button">
              View all
            </button>
          )}
        </div>

        {/* NO RESULTS */}

        {filteredProducts.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "60px 20px",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              🔍
            </div>

            <h2
              style={{
                marginBottom: "8px",
              }}
            >
              No products found
            </h2>

            <p
              style={{
                color: "#666",
                marginBottom: "20px",
              }}
            >
              Try another product name or category.
            </p>

            <button
              type="button"
              onClick={clearSearch}
              style={{
                border: "none",
                background: "#ffd814",
                padding: "10px 20px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="bk-products-grid">
            {filteredProducts.map((product) => (
              <article
                className="bk-product-card"
                key={product.id}
              >
                <div
                  className="bk-product-image"
                  onClick={() =>
                    handleViewDetails(product)
                  }
                >
                  <span className="bk-product-deal-badge">
                    {product.discount}
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="bk-product-body">
                  <span className="bk-product-category">
                    {product.category}
                  </span>

                  <h3
                    onClick={() =>
                      handleViewDetails(product)
                    }
                  >
                    {product.name}
                  </h3>

                  <div className="bk-product-rating">
                    <span>
                      {product.rating} ⭐⭐⭐⭐⭐
                    </span>

                    <small>
                      {product.reviews}
                    </small>
                  </div>

                  <div className="bk-product-price">
                    <sup>₹</sup>

                    <strong>
                      {formatPrice(product.price)}
                    </strong>
                  </div>

                  <div className="bk-product-mrp">
                    M.R.P.:{" "}
                    <span>
                      ₹{formatPrice(product.oldPrice)}
                    </span>
                  </div>

                  <div className="bk-product-delivery">
                    <strong>
                      {product.delivery}
                    </strong>

                    <span>
                      📍 {product.location}
                    </span>
                  </div>

                  <div className="bk-local-seller">
                    <span>🏪</span>

                    <div>
                      <small>Sold by</small>

                      <strong>
                        {product.shop}
                      </strong>
                    </div>

                    <span className="bk-verified">
                      ✓
                    </span>
                  </div>

                  <div className="bk-product-actions">
                    <button
                      type="button"
                      className="bk-add-cart"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      className="bk-view-product"
                      onClick={() =>
                        handleViewDetails(product)
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* SELLER BANNER */}

      {!searchActive && (
        <div className="bk-seller-home-banner">
          <div className="bk-seller-banner-icon">
            🏪
          </div>

          <div className="bk-seller-banner-content">
            <small>
              SELL WITH BIJLIKART
            </small>

            <h2>
              Own an electronics shop?
            </h2>

            <p>
              List your products online and reach more
              customers through BIJLIKART.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/seller-register")
            }
          >
            Start Selling →
          </button>
        </div>
      )}
    </section>
  );
}

export default Products;