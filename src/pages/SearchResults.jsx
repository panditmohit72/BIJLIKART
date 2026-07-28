import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import products from "../data/products";
import "./SearchResults.css";

function SearchResults({ addToCart }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] =
    useSearchParams();

  const query =
    searchParams.get("q") || "";

  const [searchInput, setSearchInput] =
    useState(query);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const [searchCategory, setSearchCategory] =
    useState("all");

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const [selectedBrands, setSelectedBrands] =
    useState([]);

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [minimumRating, setMinimumRating] =
    useState(0);

  const [priceRange, setPriceRange] =
    useState("all");

  const [deliveryFilter, setDeliveryFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("relevance");

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .trim();
  }

  function formatPrice(price) {
    return new Intl.NumberFormat(
      "en-IN"
    ).format(price);
  }

  const aliases = {
    tv: [
      "tv",
      "television",
      "smart tv",
    ],

    television: [
      "tv",
      "television",
    ],

    ac: [
      "ac",
      "air conditioner",
    ],

    fridge: [
      "fridge",
      "refrigerator",
    ],

    refrigerator: [
      "fridge",
      "refrigerator",
    ],

    mobile: [
      "mobile",
      "phone",
      "smartphone",
    ],

    phone: [
      "mobile",
      "phone",
      "smartphone",
    ],

    laptop: [
      "laptop",
      "computer",
      "notebook",
    ],

    headphone: [
      "headphone",
      "headphones",
      "audio",
    ],

    headphones: [
      "headphone",
      "headphones",
      "audio",
    ],

    speaker: [
      "speaker",
      "audio",
    ],

    washer: [
      "washing machine",
      "washer",
    ],
  };

  function getSearchTerms(value) {
    const cleanValue =
      normalize(value);

    if (!cleanValue) {
      return [];
    }

    if (aliases[cleanValue]) {
      return aliases[cleanValue];
    }

    return cleanValue
      .split(/\s+/)
      .filter(Boolean);
  }

  function getSearchableText(product) {
    return normalize(
      [
        product.name,
        product.brand,
        product.category,
        product.subcategory,
        product.shop,
        product.location,
        ...(product.keywords || []),
      ].join(" ")
    );
  }

  const searchSuggestions = useMemo(() => {
    const typed = normalize(searchInput);

    if (!typed) {
      return [];
    }

    const suggestions = new Set();

    products.forEach((product) => {
      const searchableText =
        getSearchableText(product);

      if (!searchableText.includes(typed)) {
        return;
      }

      const possibleSuggestions = [
        product.brand,
        product.name,
        product.category,
        product.subcategory,
        ...(product.keywords || []),
      ];

      possibleSuggestions.forEach((item) => {
        if (item && normalize(item).includes(typed)) {
          suggestions.add(item);
        }
      });
    });

    return [...suggestions]
      .sort((a, b) => {
        const aText = normalize(a);
        const bText = normalize(b);
        const aStarts = aText.startsWith(typed);
        const bStarts = bText.startsWith(typed);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return aText.length - bText.length;
      })
      .slice(0, 10);
  }, [searchInput]);

  function runSearch(value) {
    const cleanSearch = String(value || "").trim();

    if (!cleanSearch) return;

    setSearchInput(cleanSearch);
    setShowSuggestions(false);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMinimumRating(0);
    setPriceRange("all");
    setDeliveryFilter("all");
    setSortBy("relevance");

    setSearchParams({ q: cleanSearch });
  }

  function selectSuggestion(value) {
    runSearch(value);
  }

  const brands = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (product) =>
            product.brand
        )
      ),
    ].sort();
  }, []);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (product) =>
            product.category
        )
      ),
    ].sort();
  }, []);

  const filteredProducts =
    useMemo(() => {
      const terms =
        getSearchTerms(query);

      let result =
        products.filter(
          (product) => {
            const searchableText =
              getSearchableText(
                product
              );

            const matchesSearch =
              terms.length === 0 ||
              terms.every(
                (term) =>
                  searchableText.includes(
                    normalize(term)
                  )
              );

            const matchesBrand =
              selectedBrands.length ===
                0 ||
              selectedBrands.includes(
                product.brand
              );

            const matchesCategory =
              selectedCategories.length ===
                0 ||
              selectedCategories.includes(
                product.category
              );

            const matchesRating =
              product.rating >=
              minimumRating;

            let matchesPrice =
              true;

            if (
              priceRange ===
              "under10000"
            ) {
              matchesPrice =
                product.price <
                10000;
            }

            if (
              priceRange ===
              "10000-30000"
            ) {
              matchesPrice =
                product.price >=
                  10000 &&
                product.price <=
                  30000;
            }

            if (
              priceRange ===
              "30000-50000"
            ) {
              matchesPrice =
                product.price >=
                  30000 &&
                product.price <=
                  50000;
            }

            if (
              priceRange ===
              "above50000"
            ) {
              matchesPrice =
                product.price >
                50000;
            }

            let matchesDelivery =
              true;

            if (
              deliveryFilter ===
              "free"
            ) {
              matchesDelivery =
                normalize(
                  product.delivery
                ).includes(
                  "free"
                );
            }

            if (
              deliveryFilter ===
              "today"
            ) {
              matchesDelivery =
                normalize(
                  product.delivery
                ).includes(
                  "today"
                );
            }

            return (
              matchesSearch &&
              matchesBrand &&
              matchesCategory &&
              matchesRating &&
              matchesPrice &&
              matchesDelivery
            );
          }
        );

      if (
        sortBy === "priceLow"
      ) {
        result = [
          ...result,
        ].sort(
          (a, b) =>
            a.price - b.price
        );
      }

      if (
        sortBy === "priceHigh"
      ) {
        result = [
          ...result,
        ].sort(
          (a, b) =>
            b.price - a.price
        );
      }

      if (
        sortBy === "rating"
      ) {
        result = [
          ...result,
        ].sort(
          (a, b) =>
            b.rating - a.rating
        );
      }

      if (
        sortBy === "discount"
      ) {
        result = [
          ...result,
        ].sort(
          (a, b) => {
            const discountA =
              a.oldPrice -
              a.price;

            const discountB =
              b.oldPrice -
              b.price;

            return (
              discountB -
              discountA
            );
          }
        );
      }

      return result;
    }, [
      query,
      selectedBrands,
      selectedCategories,
      minimumRating,
      priceRange,
      deliveryFilter,
      sortBy,
    ]);

  function submitSearch(e) {
    e.preventDefault();
    runSearch(searchInput);
  }

  function toggleBrand(brand) {
    setSelectedBrands(
      (current) =>
        current.includes(brand)
          ? current.filter(
              (item) =>
                item !== brand
            )
          : [
              ...current,
              brand,
            ]
    );
  }

  function toggleCategory(
    category
  ) {
    setSelectedCategories(
      (current) =>
        current.includes(
          category
        )
          ? current.filter(
              (item) =>
                item !==
                category
            )
          : [
              ...current,
              category,
            ]
    );
  }

  function clearFilters() {
    setSelectedBrands([]);
    setSelectedCategories(
      []
    );
    setMinimumRating(0);
    setPriceRange("all");
    setDeliveryFilter(
      "all"
    );
    setSortBy("relevance");
  }

  function calculateDiscount(
    product
  ) {
    if (
      !product.oldPrice ||
      product.oldPrice <=
        product.price
    ) {
      return 0;
    }

    return Math.round(
      ((product.oldPrice -
        product.price) /
        product.oldPrice) *
        100
    );
  }

  function handleAddToCart(
    product
  ) {
    if (addToCart) {
      addToCart(product);
    }
  }

  return (
    <div className="sr-page">

      {/* =========================
          SEARCH HEADER
      ========================= */}

      <header className="sr-header">

        <div
          className="sr-logo"
          onClick={() =>
            navigate("/")
          }
        >
          <strong>
            ⚡ BIJLIKART
          </strong>

          <small>
            Electronics Marketplace
          </small>
        </div>

        <div className="sr-search-wrapper">
          <form
            className="sr-search"
            onSubmit={submitSearch}
          >
            <select
              aria-label="Search category"
              value={searchCategory}
              onChange={(e) =>
                setSearchCategory(e.target.value)
              }
            >
              <option value="all">All</option>
              <option value="tv">TVs</option>
              <option value="ac">AC</option>
              <option value="mobile">Mobiles</option>
              <option value="laptop">Laptops</option>
              <option value="refrigerator">Refrigerators</option>
            </select>

            <input
              type="text"
              value={searchInput}
              autoComplete="off"
              placeholder="Search BIJLIKART"
              onFocus={() => {
                if (searchInput.trim()) {
                  setShowSuggestions(true);
                }
              }}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSuggestions(true);
              }}
            />

            {searchInput && (
              <button
                type="button"
                className="sr-search-clear"
                onClick={() => {
                  setSearchInput("");
                  setShowSuggestions(false);
                }}
              >
                ×
              </button>
            )}

            <button
              type="submit"
              className="sr-search-button"
            >
              🔍
            </button>
          </form>

          {showSuggestions &&
            searchInput.trim() &&
            searchSuggestions.length > 0 && (
              <div className="sr-search-suggestions">
                {searchSuggestions.map((suggestion) => (
                  <button
                    type="button"
                    className="sr-search-suggestion"
                    key={suggestion}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <span>⌕</span>
                    <strong>{suggestion}</strong>
                  </button>
                ))}
              </div>
            )}
        </div>

        <button
          type="button"
          className="sr-home-button"
          onClick={() =>
            navigate("/")
          }
        >
          Home
        </button>

        <button
          type="button"
          className="sr-cart"
          onClick={() =>
            navigate("/cart")
          }
        >
          🛒 Cart
        </button>
      </header>

      {/* =========================
          SECOND NAV
      ========================= */}

      <nav className="sr-nav">

        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
        >
          ☰ All
        </button>

        <button
          type="button"
          onClick={() =>
            setSearchParams({
              q: "mobile",
            })
          }
        >
          Mobiles
        </button>

        <button
          type="button"
          onClick={() =>
            setSearchParams({
              q: "tv",
            })
          }
        >
          TVs
        </button>

        <button
          type="button"
          onClick={() =>
            setSearchParams({
              q: "ac",
            })
          }
        >
          ACs
        </button>

        <button
          type="button"
          onClick={() =>
            setSearchParams({
              q: "fridge",
            })
          }
        >
          Refrigerators
        </button>

        <button
          type="button"
          onClick={() =>
            setSearchParams({
              q: "laptop",
            })
          }
        >
          Laptops
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/seller-register"
            )
          }
        >
          Sell
        </button>

      </nav>

      {/* =========================
          RESULTS BAR
      ========================= */}

      <div className="sr-results-bar">

        <div>
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          results

          {query && (
            <>
              {" "}for{" "}
              <strong>
                "{query}"
              </strong>
            </>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
        >
          <option value="relevance">
            Sort by: Featured
          </option>

          <option value="priceLow">
            Price: Low to High
          </option>

          <option value="priceHigh">
            Price: High to Low
          </option>

          <option value="rating">
            Avg. Customer Review
          </option>

          <option value="discount">
            Biggest Discount
          </option>
        </select>

      </div>

      {/* =========================
          MAIN
      ========================= */}

      <div className="sr-layout">

        {/* =====================
            FILTER SIDEBAR
        ===================== */}

        <aside className="sr-sidebar">

          <div className="sr-filter-title">
            <h3>
              Filters
            </h3>

            <button
              type="button"
              onClick={
                clearFilters
              }
            >
              Clear
            </button>
          </div>

          {/* CATEGORY */}

          <div className="sr-filter-group">

            <h4>
              Category
            </h4>

            {categories.map(
              (category) => (
                <label
                  key={
                    category
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(
                      category
                    )}
                    onChange={() =>
                      toggleCategory(
                        category
                      )
                    }
                  />

                  <span>
                    {category}
                  </span>
                </label>
              )
            )}

          </div>

          {/* BRAND */}

          <div className="sr-filter-group">

            <h4>
              Brands
            </h4>

            {brands.map(
              (brand) => (
                <label
                  key={brand}
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(
                      brand
                    )}
                    onChange={() =>
                      toggleBrand(
                        brand
                      )
                    }
                  />

                  <span>
                    {brand}
                  </span>
                </label>
              )
            )}

          </div>

          {/* CUSTOMER REVIEW */}

          <div className="sr-filter-group">

            <h4>
              Customer Reviews
            </h4>

            {[4, 3, 2].map(
              (rating) => (
                <button
                  type="button"
                  key={rating}
                  className={
                    minimumRating ===
                    rating
                      ? "sr-rating-filter active"
                      : "sr-rating-filter"
                  }
                  onClick={() =>
                    setMinimumRating(
                      minimumRating ===
                        rating
                        ? 0
                        : rating
                    )
                  }
                >
                  ⭐⭐⭐⭐⭐
                  <span>
                    {rating} & Up
                  </span>
                </button>
              )
            )}

          </div>

          {/* PRICE */}

          <div className="sr-filter-group">

            <h4>
              Price
            </h4>

            <label>
              <input
                type="radio"
                name="price"
                checked={
                  priceRange ===
                  "all"
                }
                onChange={() =>
                  setPriceRange(
                    "all"
                  )
                }
              />
              All Prices
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={
                  priceRange ===
                  "under10000"
                }
                onChange={() =>
                  setPriceRange(
                    "under10000"
                  )
                }
              />
              Under ₹10,000
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={
                  priceRange ===
                  "10000-30000"
                }
                onChange={() =>
                  setPriceRange(
                    "10000-30000"
                  )
                }
              />
              ₹10,000 – ₹30,000
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={
                  priceRange ===
                  "30000-50000"
                }
                onChange={() =>
                  setPriceRange(
                    "30000-50000"
                  )
                }
              />
              ₹30,000 – ₹50,000
            </label>

            <label>
              <input
                type="radio"
                name="price"
                checked={
                  priceRange ===
                  "above50000"
                }
                onChange={() =>
                  setPriceRange(
                    "above50000"
                  )
                }
              />
              Over ₹50,000
            </label>

          </div>

          {/* DELIVERY */}

          <div className="sr-filter-group">

            <h4>
              Delivery
            </h4>

            <label>
              <input
                type="radio"
                name="delivery"
                checked={
                  deliveryFilter ===
                  "all"
                }
                onChange={() =>
                  setDeliveryFilter(
                    "all"
                  )
                }
              />

              All
            </label>

            <label>
              <input
                type="radio"
                name="delivery"
                checked={
                  deliveryFilter ===
                  "free"
                }
                onChange={() =>
                  setDeliveryFilter(
                    "free"
                  )
                }
              />

              Free Delivery
            </label>

            <label>
              <input
                type="radio"
                name="delivery"
                checked={
                  deliveryFilter ===
                  "today"
                }
                onChange={() =>
                  setDeliveryFilter(
                    "today"
                  )
                }
              />

              Delivery Today
            </label>

          </div>

        </aside>

        {/* =====================
            RESULTS
        ===================== */}

        <main className="sr-results">

          <div className="sr-results-heading">

            <h2>
              Results
            </h2>

            <p>
              Check each product for
              seller, delivery and
              buying options.
            </p>

          </div>

          {filteredProducts.length >
          0 ? (
            filteredProducts.map(
              (product) => {

                const discount =
                  calculateDiscount(
                    product
                  );

                return (
                  <article
                    className="sr-product"
                    key={
                      product.id
                    }
                  >

                    {/* IMAGE */}

                    <div
                      className="sr-product-image"
                      onClick={() =>
                        navigate(
                          `/product/${product.id}`
                        )
                      }
                    >
                      {product.tag && (
                        <span className="sr-product-tag">
                          {
                            product.tag
                          }
                        </span>
                      )}

                      <img
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                      />
                    </div>

                    {/* INFO */}

                    <div className="sr-product-info">

                      <small className="sr-brand">
                        {
                          product.brand
                        }
                      </small>

                      <h2
                        onClick={() =>
                          navigate(
                            `/product/${product.id}`
                          )
                        }
                      >
                        {
                          product.name
                        }
                      </h2>

                      <div className="sr-rating">

                        <span>
                          {
                            product.rating
                          } ⭐⭐⭐⭐⭐
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            alert(
                              `${product.reviews} customer reviews`
                            )
                          }
                        >
                          {
                            product.reviews
                          }
                        </button>

                      </div>

                      <div className="sr-bought">
                        Popular with
                        BIJLIKART customers
                      </div>

                      {discount >
                        0 && (
                        <div className="sr-deal-row">

                          <span className="sr-deal-badge">
                            {discount}% off
                          </span>

                          <strong>
                            {
                              product.tag
                            }
                          </strong>

                        </div>
                      )}

                      <div className="sr-price-row">

                        <sup>
                          ₹
                        </sup>

                        <strong>
                          {formatPrice(
                            product.price
                          )}
                        </strong>

                      </div>

                      <div className="sr-mrp">

                        M.R.P.:{" "}

                        <span>
                          ₹
                          {formatPrice(
                            product.oldPrice
                          )}
                        </span>

                      </div>

                      <div className="sr-delivery">

                        <strong>
                          {
                            product.delivery
                          }
                        </strong>

                        <span>
                          📍{" "}
                          {
                            product.location
                          }
                        </span>

                      </div>

                      <div className="sr-seller">

                        <span>
                          🏪
                        </span>

                        <div>
                          <small>
                            Sold by
                          </small>

                          <strong>
                            {
                              product.shop
                            }
                          </strong>
                        </div>

                        <span className="sr-verified">
                          ✓ Verified
                        </span>

                      </div>

                      <div className="sr-surprise">
                        🎁 Surprise Gift
                        available with this
                        order
                      </div>

                      <div className="sr-actions">

                        <button
                          type="button"
                          className="sr-add-cart"
                          onClick={() =>
                            handleAddToCart(
                              product
                            )
                          }
                        >
                          Add to Cart
                        </button>

                        <button
                          type="button"
                          className="sr-view-details"
                          onClick={() =>
                            navigate(
                              `/product/${product.id}`
                            )
                          }
                        >
                          View Details
                        </button>

                      </div>

                    </div>

                  </article>
                );
              }
            )
          ) : (

            <div className="sr-no-results">

              <div>
                🔍
              </div>

              <h2>
                No results for
                "{query}"
              </h2>

              <p>
                Try another product,
                brand or category.
              </p>

              <button
                type="button"
                onClick={
                  clearFilters
                }
              >
                Clear Filters
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/")
                }
              >
                Continue Shopping
              </button>

            </div>

          )}

        </main>

      </div>
    </div>
  );
}

export default SearchResults;