import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import samsungTV from "../assets/products/samsung-tv.jpg";
import lgAC from "../assets/products/lg-ac.jpg";
import whirlpoolFridge from "../assets/products/whirlpool-fridge.jpg";
import hpLaptop from "../assets/products/hp-laptop.jpg";

const products = [
  {
    id: 1,
    name: "Samsung 55 inch 4K Smart TV",
    category: "Television",
    image: samsungTV,
    price: 49999,
    oldPrice: 59999,
    discount: "17% OFF",
    rating: 4.8,
    reviewsCount: 126,
    seller: "Sharma Electronics",
    location: "Mathura",
    stock: "In Stock",
    delivery: "FREE Delivery available in Mathura",
    warranty: "1 Year Manufacturer Warranty",
    highlights: [
      "55 inch 4K Ultra HD Display",
      "Smart TV with OTT Apps",
      "Crystal Processor 4K",
      "Wi-Fi & Bluetooth Connectivity",
      "Multiple HDMI and USB Ports",
    ],
    specifications: {
      Brand: "Samsung",
      "Screen Size": "55 inch",
      Resolution: "4K Ultra HD",
      "Smart TV": "Yes",
      Connectivity: "Wi-Fi, Bluetooth, HDMI, USB",
      Warranty: "1 Year",
    },
  },

  {
    id: 2,
    name: "LG 1.5 Ton 5 Star Inverter AC",
    category: "Air Conditioner",
    image: lgAC,
    price: 39999,
    oldPrice: 45999,
    discount: "13% OFF",
    rating: 4.7,
    reviewsCount: 94,
    seller: "Gupta Electronics",
    location: "Mathura",
    stock: "In Stock",
    delivery: "FREE Delivery & Installation available",
    warranty: "1 Year Product Warranty",
    highlights: [
      "1.5 Ton Split AC",
      "5 Star Energy Rating",
      "Dual Inverter Compressor",
      "Fast Cooling",
      "Copper Condenser",
    ],
    specifications: {
      Brand: "LG",
      Capacity: "1.5 Ton",
      "Energy Rating": "5 Star",
      Compressor: "Dual Inverter",
      Condenser: "Copper",
      Warranty: "1 Year",
    },
  },

  {
    id: 3,
    name: "Whirlpool 265L Double Door Fridge",
    category: "Refrigerator",
    image: whirlpoolFridge,
    price: 27999,
    oldPrice: 32999,
    discount: "15% OFF",
    rating: 4.6,
    reviewsCount: 78,
    seller: "Agarwal Electronics",
    location: "Mathura",
    stock: "In Stock",
    delivery: "FREE Delivery available",
    warranty: "1 Year Product Warranty",
    highlights: [
      "265 L Capacity",
      "Double Door Refrigerator",
      "Frost Free Technology",
      "Energy Efficient",
      "Large Vegetable Storage",
    ],
    specifications: {
      Brand: "Whirlpool",
      Capacity: "265 L",
      Type: "Double Door",
      Technology: "Frost Free",
      Shelves: "Toughened Glass",
      Warranty: "1 Year",
    },
  },

  {
    id: 4,
    name: "HP 15 Intel Core i5 Laptop",
    category: "Laptop",
    image: hpLaptop,
    price: 62999,
    oldPrice: 71999,
    discount: "12% OFF",
    rating: 4.7,
    reviewsCount: 112,
    seller: "Digital World",
    location: "Mathura",
    stock: "In Stock",
    delivery: "Delivery available today",
    warranty: "1 Year Manufacturer Warranty",
    highlights: [
      "Intel Core i5 Processor",
      "15.6 inch Full HD Display",
      "16 GB RAM",
      "512 GB SSD",
      "Windows 11",
    ],
    specifications: {
      Brand: "HP",
      Processor: "Intel Core i5",
      RAM: "16 GB",
      Storage: "512 GB SSD",
      Display: "15.6 inch Full HD",
      Warranty: "1 Year",
    },
  },

  {
    id: 5,
    name: "Samsung 8KG Fully Automatic Washing Machine",
    category: "Washing Machine",
    image: samsungTV,
    price: 28999,
    oldPrice: 34999,
    discount: "17% OFF",
    rating: 4.5,
    reviewsCount: 67,
    seller: "Sharma Electronics",
    location: "Mathura",
    stock: "In Stock",
    delivery: "FREE Delivery available",
    warranty: "2 Years Product Warranty",
    highlights: [
      "8 KG Washing Capacity",
      "Fully Automatic",
      "Digital Inverter Technology",
      "Multiple Wash Programs",
      "Energy Efficient Operation",
    ],
    specifications: {
      Brand: "Samsung",
      Capacity: "8 KG",
      Type: "Fully Automatic",
      Motor: "Digital Inverter",
      "Wash Programs": "Multiple",
      Warranty: "2 Years",
    },
  },

  {
    id: 6,
    name: "Sony Wireless Noise Cancelling Headphones",
    category: "Headphones",
    image: hpLaptop,
    price: 14999,
    oldPrice: 18999,
    discount: "21% OFF",
    rating: 4.8,
    reviewsCount: 156,
    seller: "Sound Zone",
    location: "Mathura",
    stock: "In Stock",
    delivery: "Delivery available tomorrow",
    warranty: "1 Year Manufacturer Warranty",
    highlights: [
      "Active Noise Cancellation",
      "Wireless Bluetooth Connectivity",
      "Long Battery Life",
      "Built-in Microphone",
      "Comfortable Over-Ear Design",
    ],
    specifications: {
      Brand: "Sony",
      Type: "Wireless",
      Connectivity: "Bluetooth",
      "Noise Cancellation": "Yes",
      Microphone: "Built-in",
      Warranty: "1 Year",
    },
  },

  {
    id: 7,
    name: "JBL Bluetooth Portable Speaker",
    category: "Speaker",
    image: lgAC,
    price: 6999,
    oldPrice: 8999,
    discount: "22% OFF",
    rating: 4.6,
    reviewsCount: 89,
    seller: "Digital World",
    location: "Mathura",
    stock: "In Stock",
    delivery: "FREE Delivery available",
    warranty: "1 Year Manufacturer Warranty",
    highlights: [
      "Powerful JBL Sound",
      "Portable Bluetooth Speaker",
      "Long Battery Backup",
      "Compact Design",
      "Wireless Connectivity",
    ],
    specifications: {
      Brand: "JBL",
      Type: "Portable Speaker",
      Connectivity: "Bluetooth",
      Battery: "Rechargeable",
      Usage: "Indoor & Outdoor",
      Warranty: "1 Year",
    },
  },

  {
    id: 8,
    name: "Samsung 5G Smartphone 128GB",
    category: "Mobile",
    image: samsungTV,
    price: 24999,
    oldPrice: 29999,
    discount: "17% OFF",
    rating: 4.7,
    reviewsCount: 203,
    seller: "Mobile Hub",
    location: "Mathura",
    stock: "In Stock",
    delivery: "Delivery available today",
    warranty: "1 Year Manufacturer Warranty",
    highlights: [
      "5G Connectivity",
      "128 GB Internal Storage",
      "High Resolution Camera",
      "Large Display",
      "Fast Charging Support",
    ],
    specifications: {
      Brand: "Samsung",
      Network: "5G",
      Storage: "128 GB",
      SIM: "Dual SIM",
      Charging: "Fast Charging",
      Warranty: "1 Year",
    },
  },
];

function ProductDetails({ addToCart }) {
  const navigate = useNavigate();
  const { id } = useParams();
const sellerProducts = JSON.parse(
  localStorage.getItem("bijlikartSellerProducts") || "[]"
);

const allProducts = [
  ...products,
  ...sellerProducts.map((item) => ({
    ...item,
    seller: item.shop || item.seller || "BIJLIKART Seller",
    reviewsCount: item.reviewsCount || 0,
    rating: item.rating || 5,
    delivery: item.delivery || "FREE Delivery",
    stock: item.stock || "In Stock",
    warranty: item.warranty || "Seller Warranty",
    highlights: item.highlights || [],
    specifications: item.specifications || {},
  })),
];
  const product = allProducts.find(
    (item) => item.id === Number(id)
  );

  const productImages =
    product?.images?.length
      ? product.images
      : product?.image
        ? [product.image]
        : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);

  const selectedImage =
    productImages[selectedImageIndex] || product?.image;

  function previousImage() {
    if (!productImages.length) return;
    setSelectedImageIndex((current) =>
      current === 0 ? productImages.length - 1 : current - 1
    );
  }

  function nextImage() {
    if (!productImages.length) return;
    setSelectedImageIndex((current) =>
      current === productImages.length - 1 ? 0 : current + 1
    );
  }

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      title: "Excellent product and fast delivery",
      text: "Product quality is very good. Delivery was safe and the overall experience was smooth.",
      date: "18 July 2026",
      verified: true,
    },
    {
      id: 2,
      name: "Amit Verma",
      rating: 4,
      title: "Good value for money",
      text: "The product was properly packed and the price was competitive. Good experience buying from a local seller.",
      date: "12 July 2026",
      verified: true,
    },
    {
      id: 3,
      name: "Deepak Singh",
      rating: 5,
      title: "Very satisfied",
      text: "Easy ordering experience and helpful seller. I would purchase from BIJLIKART again.",
      date: "5 July 2026",
      verified: true,
    },
  ]);

  const [showReviewForm, setShowReviewForm] =
    useState(false);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: "5",
    title: "",
    text: "",
  });

  if (!product) {
    return (
      <div style={notFoundStyle}>
        <h1>Product Not Found</h1>

        <p>
          The product you are looking for is not available.
        </p>

        <button
          style={blueButton}
          onClick={() => navigate("/")}
        >
          ← Back to BIJLIKART
        </button>
      </div>
    );
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN").format(price);
  }

  function handleAddToCart() {
    if (addToCart) {
      addToCart(product);
    } else {
      alert(`${product.name} added to cart!`);
    }
  }

  function handleBuyNow() {
    if (addToCart) {
      addToCart(product);
    }

    navigate("/checkout");
  }

  function handleReviewChange(e) {
    const { name, value } = e.target;

    setReviewForm((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function submitReview(e) {
    e.preventDefault();

    if (
      !reviewForm.name.trim() ||
      !reviewForm.title.trim() ||
      !reviewForm.text.trim()
    ) {
      alert("Please fill all review details.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      rating: Number(reviewForm.rating),
      title: reviewForm.title,
      text: reviewForm.text,
      date: "24 July 2026",
      verified: false,
    };

    setReviews((old) => [newReview, ...old]);

    setReviewForm({
      name: "",
      rating: "5",
      title: "",
      text: "",
    });

    setShowReviewForm(false);

    alert("Thank you! Your review has been added.");
  }

  return (
    <div style={pageStyle}>
      {/* HEADER */}

      <header style={headerStyle}>
        <div
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <h2 style={{ margin: 0 }}>
            ⚡ BIJLIKART
          </h2>

          <small>
            Local Electronics Marketplace
          </small>
        </div>

        <button
          onClick={() => navigate("/cart")}
          style={headerCartButton}
        >
          🛒 Cart
        </button>
      </header>

      {/* BREADCRUMB */}

      <div style={breadcrumbStyle}>
        <span
          onClick={() => navigate("/")}
          style={{
            color: "#1688e8",
            cursor: "pointer",
          }}
        >
          Home
        </span>

        {" > "}

        {product.category}

        {" > "}

        {product.name}
      </div>

      <main style={mainStyle}>
        {/* PRODUCT */}

        <section style={productSectionStyle}>
          {/* PREMIUM PRODUCT GALLERY */}

          <div style={galleryColumnStyle}>
            <div style={galleryLayoutStyle}>
              {productImages.length > 1 && (
                <div style={thumbnailRailStyle}>
                  {productImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      style={{
                        ...thumbnailButtonStyle,
                        ...(selectedImageIndex === index
                          ? activeThumbnailStyle
                          : {}),
                      }}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        style={thumbnailImageStyle}
                      />
                    </button>
                  ))}
                </div>
              )}

              <div style={premiumImageBoxStyle}>
                <span style={discountBadge}>{product.discount}</span>

                <span style={photoCountBadgeStyle}>
                  📷 {selectedImageIndex + 1} / {productImages.length || 1}
                </span>

                <button
                  type="button"
                  onClick={() => setShowImageViewer(true)}
                  style={mainImageButtonStyle}
                  title="View large image"
                >
                  <img
                    src={selectedImage}
                    alt={product.name}
                    style={premiumMainImageStyle}
                  />
                </button>

                {productImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousImage}
                      style={{ ...galleryArrowStyle, left: "12px" }}
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      style={{ ...galleryArrowStyle, right: "12px" }}
                    >
                      ›
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setShowImageViewer(true)}
                  style={expandImageButtonStyle}
                >
                  ⛶ View large
                </button>
              </div>
            </div>

            <div style={galleryHintStyle}>
              <strong>✨ Premium Product Gallery</strong>
              <small>Tap a photo to view it larger</small>
            </div>

            <div style={verifiedBox}>
              ✓ Available from a verified local BIJLIKART seller
            </div>
          </div>

          {/* DETAILS */}

          <div>
            <span style={categoryStyle}>
              {product.category.toUpperCase()}
            </span>

            <h1 style={productTitleStyle}>
              {product.name}
            </h1>

            <div style={ratingRow}>
              <span style={ratingBadge}>
                {product.rating} ★
              </span>

              <span style={{ color: "#64748b" }}>
                {product.reviewsCount} Ratings & Reviews
              </span>
            </div>

            <hr style={divider} />

            {/* PRICE */}

            <div style={{ margin: "22px 0" }}>
              <span
                style={{
                  color: "#16a34a",
                  fontWeight: "bold",
                }}
              >
                Special Price
              </span>

              <div style={priceRow}>
                <strong style={priceStyle}>
                  ₹{formatPrice(product.price)}
                </strong>

                <span style={oldPriceStyle}>
                  ₹{formatPrice(product.oldPrice)}
                </span>

                <strong style={{ color: "#16a34a" }}>
                  {product.discount}
                </strong>
              </div>

              <small style={{ color: "#64748b" }}>
                Inclusive of all taxes
              </small>
            </div>

            {/* OFFERS */}

            <div style={{ marginBottom: "25px" }}>
              <h3>Available Offers</h3>

              <p>
                🏷️ <strong>Special Offer:</strong>{" "}
                Local BIJLIKART seller deal
              </p>

              <p>
                💳 <strong>Payment Offer:</strong>{" "}
                Bank offers may be available at checkout
              </p>

              <p>
                🚚 <strong>Delivery:</strong>{" "}
                {product.delivery}
              </p>
            </div>

            {/* SURPRISE GIFT */}

            <div style={giftCardStyle}>
              <div style={giftIconStyle}>🎁</div>
              <div>
                <small style={giftEyebrowStyle}>BIJLIKART SPECIAL</small>
                <strong style={giftTitleStyle}>
                  FREE Surprise Gift with this order
                </strong>
                <p style={giftTextStyle}>
                  Eligible promotional orders can include a surprise gift.
                </p>
              </div>
            </div>

            {/* SELLER */}

            <div style={sellerBoxStyle}>
              <small style={{ color: "#64748b" }}>
                SOLD BY
              </small>

              <div style={sellerRow}>
                <div>
                  <strong style={sellerNameStyle}>
                    🏪 {product.seller}
                  </strong>

                  <div style={locationStyle}>
                    📍 {product.location}
                  </div>
                </div>

                <span style={sellerVerifiedBadge}>
                  ✓ Verified Seller
                </span>
              </div>
            </div>

            {/* STOCK */}

            <div style={{ marginBottom: "20px" }}>
              <strong style={{ color: "#16a34a" }}>
                ● {product.stock}
              </strong>

              <p style={{ color: "#64748b" }}>
                🛡️ {product.warranty}
              </p>
            </div>

            {/* BUTTONS */}

            <div style={buyButtons}>
              <button
                onClick={handleAddToCart}
                style={cartButton}
              >
                🛒 ADD TO CART
              </button>

              <button
                onClick={handleBuyNow}
                style={buyButton}
              >
                ⚡ BUY NOW
              </button>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}

        <section style={sectionStyle}>
          <h2>Product Highlights</h2>

          <ul style={highlightList}>
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        {/* SPECIFICATIONS */}

        <section style={sectionStyle}>
          <h2>Specifications</h2>

          <div style={{ marginTop: "20px" }}>
            {Object.entries(product.specifications).map(
              ([key, value]) => (
                <div
                  key={key}
                  style={specificationRow}
                >
                  <span style={{ color: "#64748b" }}>
                    {key}
                  </span>

                  <strong style={{ color: "#334155" }}>
                    {value}
                  </strong>
                </div>
              )
            )}
          </div>
        </section>

        {/* RATINGS */}

        <section style={sectionStyle}>
          <div style={reviewHeading}>
            <div>
              <h2 style={{ marginBottom: "5px" }}>
                Customer Ratings & Reviews
              </h2>

              <p style={{ color: "#64748b" }}>
                See what customers say about this product.
              </p>
            </div>

            <button
              onClick={() =>
                setShowReviewForm(!showReviewForm)
              }
              style={reviewButton}
            >
              ✍️ Write a Review
            </button>
          </div>

          <div style={ratingSummary}>
            <div style={{ textAlign: "center" }}>
              <div style={largeRating}>
                {product.rating} ★
              </div>

              <p style={{ color: "#64748b" }}>
                {product.reviewsCount} Ratings & Reviews
              </p>
            </div>

            <div
              style={{
                flex: 1,
                maxWidth: "400px",
              }}
            >
              <RatingBar stars="5" width="88%" />
              <RatingBar stars="4" width="65%" />
              <RatingBar stars="3" width="25%" />
              <RatingBar stars="2" width="10%" />
              <RatingBar stars="1" width="5%" />
            </div>
          </div>

          {/* WRITE REVIEW FORM */}

          {showReviewForm && (
            <form
              onSubmit={submitReview}
              style={reviewFormStyle}
            >
              <h3>Write Your Review</h3>

              <div style={reviewFormGrid}>
                <div>
                  <label style={labelStyle}>
                    Your Name
                  </label>

                  <input
                    name="name"
                    value={reviewForm.name}
                    onChange={handleReviewChange}
                    placeholder="Enter your name"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    Rating
                  </label>

                  <select
                    name="rating"
                    value={reviewForm.rating}
                    onChange={handleReviewChange}
                    style={inputStyle}
                  >
                    <option value="5">
                      5 ★ Excellent
                    </option>

                    <option value="4">
                      4 ★ Very Good
                    </option>

                    <option value="3">
                      3 ★ Good
                    </option>

                    <option value="2">
                      2 ★ Average
                    </option>

                    <option value="1">
                      1 ★ Poor
                    </option>
                  </select>
                </div>
              </div>

              <label style={labelStyle}>
                Review Title
              </label>

              <input
                name="title"
                value={reviewForm.title}
                onChange={handleReviewChange}
                placeholder="Example: Excellent product"
                style={inputStyle}
              />

              <label style={labelStyle}>
                Your Review
              </label>

              <textarea
                name="text"
                value={reviewForm.text}
                onChange={handleReviewChange}
                placeholder="Tell other customers about your experience..."
                rows="5"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="submit"
                  style={blueButton}
                >
                  Submit Review
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowReviewForm(false)
                  }
                  style={cancelButton}
                >
                  Cancel
                </button>
              </div>

              <p style={reviewNotice}>
                Demo mode: after backend/customer accounts
                are connected, only eligible customers can
                be marked as Verified Purchase.
              </p>
            </form>
          )}

          {/* REVIEWS */}

          <div>
            {reviews.map((review) => (
              <div
                key={review.id}
                style={singleReview}
              >
                <div style={reviewTitleRow}>
                  <span
                    style={{
                      ...reviewRatingBadge,
                      background:
                        review.rating >= 4
                          ? "#16a34a"
                          : "#f59e0b",
                    }}
                  >
                    {review.rating} ★
                  </span>

                  <strong>{review.title}</strong>
                </div>

                <p style={reviewText}>
                  {review.text}
                </p>

                <div style={reviewMeta}>
                  <strong style={{ color: "#64748b" }}>
                    {review.name}
                  </strong>

                  {review.verified
                    ? " • ✓ Verified Purchase"
                    : " • Customer Review"}

                  {" • "}

                  {review.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST */}

        <section style={trustSection}>
          <div>
            <strong>✓ Verified Sellers</strong>
            <span>Local trusted electronics shops</span>
          </div>

          <div>
            <strong>🛡️ Genuine Products</strong>
            <span>Seller-backed product warranty</span>
          </div>

          <div>
            <strong>🚚 Local Delivery</strong>
            <span>Fast delivery across Mathura</span>
          </div>

          <div>
            <strong>⚡ BIJLIKART</strong>
            <span>Shop local. Buy smarter.</span>
          </div>
        </section>
      </main>

      {showImageViewer && (
        <div
          style={imageViewerOverlayStyle}
          onClick={() => setShowImageViewer(false)}
        >
          <div
            style={imageViewerCardStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={viewerHeaderStyle}>
              <div>
                <strong>{product.name}</strong>
                <small style={viewerCounterStyle}>
                  Image {selectedImageIndex + 1} of {productImages.length || 1}
                </small>
              </div>

              <button
                type="button"
                onClick={() => setShowImageViewer(false)}
                style={viewerCloseStyle}
              >
                ×
              </button>
            </div>

            <div style={viewerImageAreaStyle}>
              {productImages.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  style={{ ...viewerArrowStyle, left: "18px" }}
                >
                  ‹
                </button>
              )}

              <img
                src={selectedImage}
                alt={product.name}
                style={viewerImageStyle}
              />

              {productImages.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  style={{ ...viewerArrowStyle, right: "18px" }}
                >
                  ›
                </button>
              )}
            </div>

            {productImages.length > 1 && (
              <div style={viewerThumbRowStyle}>
                {productImages.map((image, index) => (
                  <button
                    type="button"
                    key={`viewer-${index}`}
                    onClick={() => setSelectedImageIndex(index)}
                    style={{
                      ...viewerThumbButtonStyle,
                      ...(selectedImageIndex === index
                        ? activeThumbnailStyle
                        : {}),
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      style={thumbnailImageStyle}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function RatingBar({ stars, width }) {
  return (
    <div style={ratingBarRow}>
      <span style={{ fontSize: "13px" }}>
        {stars} ★
      </span>

      <div style={ratingBarBackground}>
        <div
          style={{
            width,
            height: "100%",
            background: "#16a34a",
          }}
        />
      </div>
    </div>
  );
}

/* =========================
   STYLES
========================= */

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f7fb",
  fontFamily: "Arial, sans-serif",
};

const headerStyle = {
  background: "#0d3975",
  color: "white",
  padding: "18px 6%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

const headerCartButton = {
  border: "none",
  background: "#1688e8",
  color: "white",
  padding: "11px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const breadcrumbStyle = {
  maxWidth: "1250px",
  margin: "auto",
  padding: "22px 20px 0",
  color: "#64748b",
  fontSize: "14px",
};

const mainStyle = {
  maxWidth: "1250px",
  margin: "20px auto",
  padding: "0 20px 50px",
};

const productSectionStyle = {
  background: "white",
  borderRadius: "16px",
  padding: "30px",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "45px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
};

const imageBoxStyle = {
  position: "relative",
  height: "430px",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "25px",
};

const discountBadge = {
  position: "absolute",
  top: "15px",
  left: "15px",
  background: "#dc2626",
  color: "white",
  padding: "7px 10px",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "13px",
};

const verifiedBox = {
  marginTop: "15px",
  padding: "13px",
  background: "#ecfdf5",
  color: "#166534",
  borderRadius: "9px",
  textAlign: "center",
  fontWeight: "bold",
};

const categoryStyle = {
  color: "#1688e8",
  fontWeight: "bold",
  fontSize: "13px",
};

const productTitleStyle = {
  color: "#172033",
  fontSize: "30px",
  marginBottom: "12px",
};

const ratingRow = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "20px",
};

const ratingBadge = {
  background: "#16a34a",
  color: "white",
  padding: "6px 9px",
  borderRadius: "6px",
  fontWeight: "bold",
};

const divider = {
  border: 0,
  borderTop: "1px solid #e5e7eb",
};

const priceRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginTop: "7px",
  flexWrap: "wrap",
};

const priceStyle = {
  fontSize: "32px",
  color: "#172033",
};

const oldPriceStyle = {
  color: "#94a3b8",
  textDecoration: "line-through",
};

const sellerBoxStyle = {
  border: "1px solid #dbeafe",
  background: "#f8fbff",
  padding: "18px",
  borderRadius: "12px",
  marginBottom: "22px",
};

const sellerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "6px",
  gap: "15px",
  flexWrap: "wrap",
};

const sellerNameStyle = {
  color: "#0d6fc2",
  fontSize: "17px",
};

const locationStyle = {
  color: "#64748b",
  marginTop: "5px",
};

const sellerVerifiedBadge = {
  background: "#dcfce7",
  color: "#15803d",
  padding: "7px 10px",
  borderRadius: "7px",
  fontWeight: "bold",
  fontSize: "12px",
};

const buyButtons = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
};

const cartButton = {
  border: "none",
  background: "#ff9f00",
  color: "white",
  padding: "16px",
  borderRadius: "9px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const buyButton = {
  ...cartButton,
  background: "#fb641b",
};

const sectionStyle = {
  background: "white",
  marginTop: "25px",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
};

const highlightList = {
  lineHeight: "2",
  color: "#475569",
};

const specificationRow = {
  display: "grid",
  gridTemplateColumns:
    "minmax(120px, 220px) 1fr",
  borderBottom: "1px solid #eef2f7",
  padding: "14px 5px",
  gap: "15px",
};

const reviewHeading = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const reviewButton = {
  padding: "12px 20px",
  background: "white",
  color: "#1688e8",
  border: "1px solid #1688e8",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

const ratingSummary = {
  display: "flex",
  gap: "35px",
  alignItems: "center",
  marginTop: "25px",
  paddingBottom: "25px",
  borderBottom: "1px solid #e5e7eb",
  flexWrap: "wrap",
};

const largeRating = {
  fontSize: "42px",
  fontWeight: "bold",
  color: "#172033",
};

const reviewFormStyle = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "22px",
  marginTop: "25px",
};

const reviewFormGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  color: "#334155",
  marginBottom: "7px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  marginBottom: "15px",
  fontSize: "14px",
  background: "white",
};

const blueButton = {
  background: "#1688e8",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "12px 20px",
  cursor: "pointer",
  fontWeight: "bold",
};

const cancelButton = {
  background: "#64748b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "12px 20px",
  cursor: "pointer",
  fontWeight: "bold",
};

const reviewNotice = {
  color: "#64748b",
  fontSize: "12px",
  marginTop: "15px",
  marginBottom: 0,
};

const singleReview = {
  padding: "25px 0",
  borderBottom: "1px solid #e5e7eb",
};

const reviewTitleRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const reviewRatingBadge = {
  color: "white",
  padding: "5px 8px",
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "12px",
};

const reviewText = {
  color: "#475569",
  lineHeight: "1.7",
};

const reviewMeta = {
  color: "#94a3b8",
  fontSize: "13px",
};

const ratingBarRow = {
  display: "grid",
  gridTemplateColumns: "35px 1fr",
  gap: "10px",
  alignItems: "center",
  marginBottom: "8px",
};

const ratingBarBackground = {
  height: "7px",
  background: "#e5e7eb",
  borderRadius: "10px",
  overflow: "hidden",
};

const trustSection = {
  background: "#0d3975",
  color: "white",
  marginTop: "25px",
  padding: "25px",
  borderRadius: "16px",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
};

const galleryColumnStyle = { minWidth: 0 };

const galleryLayoutStyle = {
  display: "flex",
  gap: "14px",
  alignItems: "stretch",
};

const thumbnailRailStyle = {
  width: "72px",
  flex: "0 0 72px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxHeight: "430px",
  overflowY: "auto",
  padding: "2px",
};

const thumbnailButtonStyle = {
  width: "68px",
  height: "68px",
  flex: "0 0 68px",
  border: "1px solid #dbe2ea",
  borderRadius: "12px",
  background: "#fff",
  padding: "5px",
  cursor: "pointer",
};

const activeThumbnailStyle = {
  border: "2px solid #1688e8",
  boxShadow: "0 0 0 3px rgba(22,136,232,0.12)",
};

const thumbnailImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const premiumImageBoxStyle = {
  position: "relative",
  flex: 1,
  minWidth: 0,
  height: "430px",
  border: "1px solid #e2e8f0",
  borderRadius: "20px",
  background: "linear-gradient(145deg,#fff,#f8fbff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  boxShadow: "0 14px 35px rgba(15,23,42,.08)",
};

const photoCountBadgeStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  zIndex: 5,
  background: "rgba(15,23,42,.82)",
  color: "#fff",
  borderRadius: "999px",
  padding: "7px 11px",
  fontSize: "12px",
  fontWeight: "bold",
};

const mainImageButtonStyle = {
  width: "100%",
  height: "100%",
  border: "none",
  background: "transparent",
  padding: "45px 42px 55px",
  cursor: "zoom-in",
};

const premiumMainImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const galleryArrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 6,
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "1px solid #dbe2ea",
  background: "rgba(255,255,255,.95)",
  color: "#172033",
  fontSize: "31px",
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(15,23,42,.14)",
};

const expandImageButtonStyle = {
  position: "absolute",
  right: "14px",
  bottom: "14px",
  zIndex: 6,
  border: "1px solid #dbe2ea",
  borderRadius: "999px",
  background: "rgba(255,255,255,.95)",
  color: "#334155",
  padding: "8px 12px",
  fontWeight: "bold",
  cursor: "pointer",
};

const galleryHintStyle = {
  marginTop: "12px",
  padding: "12px 14px",
  borderRadius: "12px",
  background: "linear-gradient(90deg,#eff6ff,#f8fafc)",
  border: "1px solid #dbeafe",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  flexWrap: "wrap",
  color: "#334155",
};

const giftCardStyle = {
  marginBottom: "22px",
  padding: "17px",
  display: "flex",
  gap: "14px",
  alignItems: "flex-start",
  borderRadius: "16px",
  border: "1px solid #fde68a",
  background: "linear-gradient(135deg,#fffbea,#fff7ed)",
};

const giftIconStyle = {
  width: "48px",
  height: "48px",
  flex: "0 0 48px",
  display: "grid",
  placeItems: "center",
  borderRadius: "14px",
  background: "#fff",
  fontSize: "25px",
};

const giftEyebrowStyle = {
  display: "block",
  color: "#b45309",
  fontWeight: "bold",
  marginBottom: "4px",
};

const giftTitleStyle = {
  display: "block",
  color: "#7c2d12",
  fontSize: "16px",
};

const giftTextStyle = {
  margin: "5px 0 0",
  color: "#92400e",
  lineHeight: 1.5,
  fontSize: "13px",
};

const imageViewerOverlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 999999,
  background: "rgba(2,6,23,.88)",
  padding: "24px",
  display: "grid",
  placeItems: "center",
};

const imageViewerCardStyle = {
  width: "min(1050px,96vw)",
  maxHeight: "94vh",
  overflow: "hidden",
  borderRadius: "22px",
  background: "#fff",
  boxShadow: "0 30px 80px rgba(0,0,0,.35)",
};

const viewerHeaderStyle = {
  minHeight: "66px",
  padding: "12px 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "15px",
  borderBottom: "1px solid #e5e7eb",
};

const viewerCounterStyle = {
  display: "block",
  marginTop: "4px",
  color: "#64748b",
};

const viewerCloseStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "1px solid #dbe2ea",
  background: "#fff",
  fontSize: "28px",
  cursor: "pointer",
};

const viewerImageAreaStyle = {
  position: "relative",
  height: "min(68vh,650px)",
  background: "#f8fafc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px 70px",
};

const viewerImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const viewerArrowStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "48px",
  height: "48px",
  border: "1px solid #dbe2ea",
  borderRadius: "50%",
  background: "#fff",
  fontSize: "34px",
  cursor: "pointer",
};

const viewerThumbRowStyle = {
  padding: "12px 18px 18px",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  overflowX: "auto",
};

const viewerThumbButtonStyle = {
  width: "66px",
  height: "66px",
  flex: "0 0 66px",
  padding: "5px",
  border: "1px solid #dbe2ea",
  borderRadius: "11px",
  background: "#fff",
  cursor: "pointer",
};

const notFoundStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Arial, sans-serif",
};

export default ProductDetails;