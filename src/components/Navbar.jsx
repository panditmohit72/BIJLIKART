import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();

  /* =========================
     CUSTOMER
  ========================= */

  const customerLoggedIn =
    localStorage.getItem("bijlikartCustomerAuth") === "true";

  const customerName =
    localStorage.getItem("bijlikartCustomerName") || "";

  const firstName = customerName
    ? customerName.split(" ")[0]
    : "";

  /* =========================
     SEARCH
  ========================= */

  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  /*
    Abhi frontend ke liye search phrases.
    Backend aane ke baad ye database/API se aa sakte hain.
  */

  const searchSuggestions = [
    // SAMSUNG
    "samsung",
    "samsung mobile",
    "samsung 5g mobile",
    "samsung galaxy mobile",
    "samsung galaxy s25",
    "samsung galaxy s25 ultra",
    "samsung galaxy s24",
    "samsung smart tv",
    "samsung 43 inch smart tv",
    "samsung 55 inch 4k smart tv",
    "samsung refrigerator",
    "samsung double door refrigerator",
    "samsung washing machine",
    "samsung 8kg washing machine",

    // APPLE
    "apple iphone",
    "apple iphone 16",
    "apple iphone 16 pro",
    "apple iphone 16 pro max",
    "apple macbook",
    "apple macbook air",
    "apple ipad",
    "apple airpods",

    // MOBILE
    "mobile",
    "5g mobile",
    "mobile under 15000",
    "mobile under 20000",
    "mobile under 30000",
    "smartphone",
    "android mobile",

    // TV
    "tv",
    "smart tv",
    "4k smart tv",
    "32 inch smart tv",
    "43 inch smart tv",
    "55 inch smart tv",
    "sony smart tv",
    "lg smart tv",

    // AC
    "ac",
    "1.5 ton ac",
    "5 star ac",
    "inverter ac",
    "split ac",
    "lg ac",
    "voltas ac",
    "daikin ac",

    // LAPTOP
    "laptop",
    "laptop under 50000",
    "gaming laptop",
    "hp laptop",
    "dell laptop",
    "lenovo laptop",
    "asus laptop",
    "acer laptop",

    // REFRIGERATOR
    "refrigerator",
    "double door refrigerator",
    "single door refrigerator",
    "lg refrigerator",
    "whirlpool refrigerator",
    "samsung refrigerator",

    // WASHING MACHINE
    "washing machine",
    "automatic washing machine",
    "front load washing machine",
    "top load washing machine",
    "lg washing machine",
    "samsung washing machine",

    // AUDIO
    "headphones",
    "wireless headphones",
    "bluetooth headphones",
    "earbuds",
    "wireless earbuds",
    "bluetooth speaker",
    "jbl speaker",
    "sony headphones",
  ];

  const filteredSuggestions = useMemo(() => {
    const query = searchText
      .toLowerCase()
      .trim();

    if (!query) {
      return [];
    }

    /*
      Pehle woh suggestions jinka beginning query se
      match karta hai.
    */

    const startsWithMatches =
      searchSuggestions.filter((item) =>
        item.toLowerCase().startsWith(query)
      );

    /*
      Uske baad woh suggestions jinke beech me
      query milta hai.
    */

    const containsMatches =
      searchSuggestions.filter(
        (item) =>
          !item.toLowerCase().startsWith(query) &&
          item.toLowerCase().includes(query)
      );

    return [
      ...startsWithMatches,
      ...containsMatches,
    ].slice(0, 10);
  }, [searchText]);

  function runSearch(value = searchText) {
    const query = value.trim();

    if (!query) {
      return;
    }

    setSearchText(query);
    setShowSuggestions(false);

    const params = new URLSearchParams();

    params.set("q", query);

    if (searchCategory !== "all") {
      params.set("category", searchCategory);
    }

    navigate(`/search?${params.toString()}`);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    runSearch();
  }

  function selectSuggestion(suggestion) {
    setSearchText(suggestion);
    setShowSuggestions(false);

    const params = new URLSearchParams();

    params.set("q", suggestion);

    if (searchCategory !== "all") {
      params.set("category", searchCategory);
    }

    navigate(`/search?${params.toString()}`);
  }

  function quickSearch(query) {
    setSearchText(query);
    setSearchCategory("all");
    setShowSuggestions(false);

    navigate(
      `/search?q=${encodeURIComponent(query)}`
    );
  }

  /* =========================
     LOCATION
  ========================= */

  const [deliveryPincode, setDeliveryPincode] =
    useState(
      localStorage.getItem(
        "bijlikartDeliveryPincode"
      ) || ""
    );

  const [pincodeInput, setPincodeInput] =
    useState(
      localStorage.getItem(
        "bijlikartDeliveryPincode"
      ) || ""
    );

  const [showPincodeBox, setShowPincodeBox] =
    useState(false);

  function openPincodeBox() {
    setPincodeInput(deliveryPincode);
    setShowPincodeBox(true);
  }

  function applyPincode(e) {
    e.preventDefault();

    const cleanPincode =
      pincodeInput.trim();

    if (
      !/^[1-9][0-9]{5}$/.test(cleanPincode)
    ) {
      alert(
        "Please enter a valid 6-digit Indian PIN code."
      );
      return;
    }

    setDeliveryPincode(cleanPincode);

    localStorage.setItem(
      "bijlikartDeliveryPincode",
      cleanPincode
    );

    setShowPincodeBox(false);
  }

  function clearPincode() {
    localStorage.removeItem(
      "bijlikartDeliveryPincode"
    );

    setDeliveryPincode("");
    setPincodeInput("");
    setShowPincodeBox(false);
  }

  /* =========================
     ACCOUNT
  ========================= */

  function handleAccount() {
    if (!customerLoggedIn) {
      navigate("/login");
      return;
    }

    const logout =
      window.confirm(
        `Hi ${firstName}! Do you want to logout?`
      );

    if (logout) {
      localStorage.removeItem(
        "bijlikartCustomerAuth"
      );

      localStorage.removeItem(
        "bijlikartCustomerName"
      );

      localStorage.removeItem(
        "bijlikartCustomerMobile"
      );

      navigate("/");
      window.location.reload();
    }
  }

  return (
    <>
      <header className="bk-header">

        {/* TOP HEADER */}

        <div className="bk-top-row">

          <button
            type="button"
            className="bk-menu"
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            ☰
          </button>

          {/* LOGO */}

          <div
            className="bk-logo"
            onClick={() => navigate("/")}
          >
            <strong>
              ⚡ BIJLIKART
            </strong>

            <small>
              Electronics Marketplace
            </small>
          </div>

          {/* LOCATION */}

          <button
            type="button"
            className="bk-desktop-location"
            onClick={openPincodeBox}
          >
            <span>
              📍
            </span>

            <div>
              <small>
                Deliver to
              </small>

              <strong>
                {deliveryPincode
                  ? `PIN ${deliveryPincode}`
                  : "Select Pincode"}
              </strong>
            </div>
          </button>

          {/* =========================
              DESKTOP SEARCH
          ========================= */}

          <div className="bk-amazon-search-wrapper">

            <form
              className="bk-amazon-search"
              onSubmit={handleSearchSubmit}
            >

              <select
                value={searchCategory}
                onChange={(e) =>
                  setSearchCategory(
                    e.target.value
                  )
                }
              >
                <option value="all">
                  All
                </option>

                <option value="Mobile">
                  Mobiles
                </option>

                <option value="TV">
                  TVs
                </option>

                <option value="AC">
                  AC
                </option>

                <option value="Laptop">
                  Laptops
                </option>

                <option value="Refrigerator">
                  Refrigerators
                </option>

                <option value="Washing Machine">
                  Washing Machines
                </option>

                <option value="Audio">
                  Audio
                </option>
              </select>

              <input
                type="text"
                value={searchText}
                placeholder="Search BIJLIKART"
                autoComplete="off"
                onFocus={() =>
                  setShowSuggestions(true)
                }
                onChange={(e) => {
                  setSearchText(
                    e.target.value
                  );

                  setShowSuggestions(true);
                }}
              />

              {searchText && (
                <button
                  type="button"
                  className="bk-amazon-clear"
                  onClick={() => {
                    setSearchText("");
                    setShowSuggestions(false);
                  }}
                >
                  ×
                </button>
              )}

              <button
                type="submit"
                className="bk-amazon-search-button"
              >
                🔍
              </button>

            </form>

            {/* AUTOCOMPLETE */}

            {showSuggestions &&
              searchText.trim() && (
                <div className="bk-amazon-suggestions">

                  {filteredSuggestions.length >
                  0 ? (
                    filteredSuggestions.map(
                      (suggestion) => (
                        <button
                          type="button"
                          key={suggestion}
                          className="bk-amazon-suggestion"
                          onMouseDown={(e) =>
                            e.preventDefault()
                          }
                          onClick={() =>
                            selectSuggestion(
                              suggestion
                            )
                          }
                        >
                          <span className="bk-search-icon">
                            ⌕
                          </span>

                          <strong>
                            {suggestion}
                          </strong>
                        </button>
                      )
                    )
                  ) : (
                    <button
                      type="button"
                      className="bk-amazon-suggestion"
                      onClick={() =>
                        runSearch()
                      }
                    >
                      <span className="bk-search-icon">
                        ⌕
                      </span>

                      <strong>
                        {searchText}
                      </strong>
                    </button>
                  )}

                </div>
              )}

          </div>

          {/* ACCOUNT */}

          <button
            type="button"
            className="bk-account"
            onClick={handleAccount}
          >
            <span>
              {customerLoggedIn
                ? `Hi, ${firstName}`
                : "Hello, Sign in"}
            </span>

            <strong>
              {customerLoggedIn
                ? "Your Account"
                : "Account"}
            </strong>
          </button>

          {/* ORDERS */}

          <button
            type="button"
            className="bk-orders"
            onClick={() => {
              if (!customerLoggedIn) {
                navigate("/login");
                return;
              }

              navigate("/orders");
            }}
          >
            <span>
              Returns
            </span>

            <strong>
              & Orders
            </strong>
          </button>

          {/* CART */}

          <button
            type="button"
            className="bk-cart"
            onClick={() =>
              navigate("/cart")
            }
          >
            🛒

            <span className="bk-cart-count">
              {cartCount}
            </span>
          </button>

        </div>

        {/* =========================
            MOBILE SEARCH
        ========================= */}

        <div className="bk-mobile-search-area">

          <form
            className="bk-amazon-search"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              value={searchText}
              placeholder="Search BIJLIKART"
              autoComplete="off"
              onFocus={() =>
                setShowSuggestions(true)
              }
              onChange={(e) => {
                setSearchText(
                  e.target.value
                );

                setShowSuggestions(true);
              }}
            />

            {searchText && (
              <button
                type="button"
                className="bk-amazon-clear"
                onClick={() => {
                  setSearchText("");
                  setShowSuggestions(false);
                }}
              >
                ×
              </button>
            )}

            <button
              type="submit"
              className="bk-amazon-search-button"
            >
              🔍
            </button>
          </form>

          {showSuggestions &&
            searchText.trim() && (
              <div className="bk-mobile-amazon-suggestions">

                {filteredSuggestions.length >
                0 ? (
                  filteredSuggestions.map(
                    (suggestion) => (
                      <button
                        type="button"
                        key={suggestion}
                        className="bk-amazon-suggestion"
                        onClick={() =>
                          selectSuggestion(
                            suggestion
                          )
                        }
                      >
                        <span className="bk-search-icon">
                          ⌕
                        </span>

                        <strong>
                          {suggestion}
                        </strong>
                      </button>
                    )
                  )
                ) : (
                  <button
                    type="button"
                    className="bk-amazon-suggestion"
                    onClick={() =>
                      runSearch()
                    }
                  >
                    <span className="bk-search-icon">
                      ⌕
                    </span>

                    <strong>
                      {searchText}
                    </strong>
                  </button>
                )}

              </div>
            )}

        </div>

        {/* CATEGORY BAR */}

        <nav className="bk-category-nav">

          <button
  type="button"
  onClick={() => setShowAllMenu(true)}
>
  ☰ All
</button>

          <button
            onClick={() =>
              quickSearch("mobile")
            }
          >
            Mobiles
          </button>

          <button
            onClick={() =>
              quickSearch("smart tv")
            }
          >
            TVs
          </button>

          <button
            onClick={() =>
              quickSearch("ac")
            }
          >
            ACs
          </button>

          <button
            onClick={() =>
              quickSearch(
                "refrigerator"
              )
            }
          >
            Refrigerators
          </button>

          <button
            onClick={() =>
              quickSearch("laptop")
            }
          >
            Laptops
          </button>

          <button
            onClick={() =>
              quickSearch(
                "washing machine"
              )
            }
          >
            Washing Machines
          </button>

          <button
            onClick={() =>
              quickSearch(
                "headphones"
              )
            }
          >
            Audio
          </button>

          <button
            onClick={() =>
              quickSearch("deal")
            }
          >
            Today's Deals
          </button>

          <button
            onClick={() =>
              navigate(
                "/seller-register"
              )
            }
          >
            Sell
          </button>

        </nav>

        {/* MOBILE LOCATION */}

        <button
          type="button"
          className="bk-mobile-delivery"
          onClick={openPincodeBox}
        >
          <span>
            📍{" "}
            {deliveryPincode
              ? `Deliver to PIN ${deliveryPincode}`
              : "Select delivery pincode"}
          </span>

          <span>›</span>
        </button>

      </header>

      {/* =========================
          LOCATION POPUP
      ========================= */}

      {showPincodeBox && (
        <div
          className="bk-location-overlay"
          onClick={() =>
            setShowPincodeBox(false)
          }
        >
          <div
            className="bk-location-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="bk-location-modal-header">

              <h2>
                Choose your location
              </h2>

              <button
                type="button"
                className="bk-close-location"
                onClick={() =>
                  setShowPincodeBox(false)
                }
              >
                ×
              </button>

            </div>

            <p>
              Enter your PIN code to set
              your delivery location.
            </p>

            <form
              className="bk-pincode-form"
              onSubmit={applyPincode}
            >
              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                autoFocus
                placeholder="Enter 6-digit PIN code"
                value={pincodeInput}
                onChange={(e) =>
                  setPincodeInput(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  )
                }
              />

              <button type="submit">
                Apply
              </button>
            </form>

            {deliveryPincode && (
              <button
                type="button"
                className="bk-clear-location"
                onClick={clearPincode}
              >
                Remove saved pincode
              </button>
            )}

            <div className="bk-location-note">
              📦 Delivery availability
              will be shown according to
              your selected location.
            </div>

          </div>
        </div>
      )}
   {/* =================================
    ALL MENU OVERLAY
================================= */}

{showAllMenu && (
  <div
    className="bk-all-overlay"
    onClick={() => setShowAllMenu(false)}
  >
    <aside
      className="bk-all-drawer"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bk-all-header">
        <div>
          <span>👤</span>

          <strong>
            {customerLoggedIn
              ? `Hello, ${firstName}`
              : "Hello, Sign in"}
          </strong>
        </div>

        <button
          type="button"
          onClick={() => setShowAllMenu(false)}
        >
          ×
        </button>
      </div>

      <div className="bk-all-content">

        <section className="bk-all-section">
          <h2>Shop by Category</h2>

          <button
            onClick={() => {
              setShowAllMenu(false);
              quickSearch("mobile");
            }}
          >
            Mobiles <span>›</span>
          </button>

          <button
            onClick={() => {
              setShowAllMenu(false);
              quickSearch("smart tv");
            }}
          >
            Televisions <span>›</span>
          </button>

          <button
            onClick={() => {
              setShowAllMenu(false);
              quickSearch("ac");
            }}
          >
            Air Conditioners <span>›</span>
          </button>

          <button
            onClick={() => {
              setShowAllMenu(false);
              quickSearch("refrigerator");
            }}
          >
            Refrigerators <span>›</span>
          </button>

          <button
            onClick={() => {
              setShowAllMenu(false);
              quickSearch("washing machine");
            }}
          >
            Washing Machines <span>›</span>
          </button>

          <button
            onClick={() => {
              setShowAllMenu(false);
              quickSearch("laptop");
            }}
          >
            Laptops <span>›</span>
          </button>

          <button
            onClick={() => {
              setShowAllMenu(false);
              quickSearch("headphones");
            }}
          >
            Headphones <span>›</span>
          </button>

          <button
            onClick={() => {
              setShowAllMenu(false);
              quickSearch("speaker");
            }}
          >
            Speakers <span>›</span>
          </button>
        </section>

        <section className="bk-all-section">
          <h2>Shop by Brand</h2>

          {[
            "Samsung",
            "LG",
            "Sony",
            "Whirlpool",
            "HP",
            "Dell",
            "Lenovo",
          ].map((brand) => (
            <button
              type="button"
              key={brand}
              onClick={() => {
                setShowAllMenu(false);
                quickSearch(brand);
              }}
            >
              {brand}
              <span>›</span>
            </button>
          ))}
        </section>

        <section className="bk-all-section">
          <h2>Help & Settings</h2>

          <button
            type="button"
            onClick={() => {
              setShowAllMenu(false);
              handleAccount();
            }}
          >
            {customerLoggedIn
              ? "Your Account"
              : "Sign In"}
            <span>›</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowAllMenu(false);
              navigate("/seller-register");
            }}
          >
            Sell on BIJLIKART
            <span>›</span>
          </button>
        </section>

      </div>
    </aside>
  </div>
)} 
</>
  );
}

export default Navbar;