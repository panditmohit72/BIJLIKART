import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const navigate = useNavigate();
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const resize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", resize);

  return () => window.removeEventListener("resize", resize);
}, []);
  // Handles both:
  // 49999
  // "₹49,999"
  function getPriceNumber(price) {
    if (typeof price === "number") {
      return price;
    }

    return Number(
      String(price)
        .replace("₹", "")
        .replace(/,/g, "")
    );
  }

  function formatPrice(price) {
    return getPriceNumber(price).toLocaleString("en-IN");
  }

  const totalAmount = cart.reduce((total, item) => {
    return (
      total +
      getPriceNumber(item.price) * item.quantity
    );
  }, 0);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          background: "#0d3975",
          color: "white",
          padding: "18px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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

        <strong>
          🛒 {totalItems} Item{totalItems !== 1 ? "s" : ""}
        </strong>
      </header>

      <main
        style={{
          padding: "30px 20px 60px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            border: "none",
            background: "transparent",
            color: "#2563eb",
            cursor: "pointer",
            fontSize: "15px",
            marginBottom: "15px",
          }}
        >
          ← Continue Shopping
        </button>

        <h1 style={{ color: "#172033" }}>
          🛒 Your Shopping Cart
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Review your products before checkout.
        </p>

        {cart.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "60px 30px",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow:
                "0 3px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "60px" }}>
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p
              style={{
                color: "#64748b",
                marginBottom: "25px",
              }}
            >
              Add electronics from trusted local
              sellers in Mathura.
            </p>

            <button
              onClick={() => navigate("/")}
              style={primaryButton}
            >
              Explore Products →
            </button>
          </div>
        ) : (
          <div
           style={{
  display: "grid",
  gridTemplateColumns: isMobile
    ? "1fr"
    : "minmax(0,2fr) minmax(320px,1fr)",
  gap: "25px",
  alignItems: "start",
}}
          >
            {/* CART PRODUCTS */}

            <div>
              {cart.map((item, index) => {
                const subtotal =
                  getPriceNumber(item.price) *
                  item.quantity;

                return (
                  <div
                    key={`${item.id || item.name}-${index}`}
                    style={{
                      display: isMobile ? "block" : "flex",
                      alignItems: "center",
                      gap: "22px",
                      background: "white",
                      padding: "22px",
                      marginBottom: "15px",
                      borderRadius: "14px",
                      boxShadow:
                        "0 3px 12px rgba(0,0,0,0.06)",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        width: "150px",
                        height: "130px",
                        border:
                          "1px solid #e5e7eb",
                        borderRadius: "10px",
                        padding: "10px",
                        boxSizing: "border-box",
                      margin: isMobile ? "0 auto 15px" : "0",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        flex: 1,
                        minWidth: "230px",
                      }}
                    >
                      <span
                        style={{
                          color: "#2563eb",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.category ||
                          "ELECTRONICS"}
                      </span>

                      <h2
                        style={{
                          fontSize: "19px",
                          margin: "7px 0",
                          color: "#172033",
                        }}
                      >
                        {item.name}
                      </h2>

                      {item.rating && (
                        <div
                          style={{
                            marginBottom: "10px",
                          }}
                        >
                          <span
                            style={{
                              background: "#16a34a",
                              color: "white",
                              padding: "4px 7px",
                              borderRadius: "5px",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            {item.rating} ★
                          </span>
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <strong
                          style={{
                            fontSize: "21px",
                          }}
                        >
                          ₹{formatPrice(item.price)}
                        </strong>

                        {item.oldPrice && (
                          <span
                            style={{
                              textDecoration:
                                "line-through",
                              color: "#94a3b8",
                            }}
                          >
                            ₹
                            {formatPrice(
                              item.oldPrice
                            )}
                          </span>
                        )}
                      </div>

                      {item.shop && (
                        <p
                          style={{
                            color: "#64748b",
                            fontSize: "13px",
                          }}
                        >
                          🏪 Sold by{" "}
                          <strong>{item.shop}</strong>
                        </p>
                      )}

                      {/* QUANTITY */}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginTop: "15px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          Quantity:
                        </span>

                        <button
                          onClick={() =>
                            decreaseQuantity(index)
                          }
                          style={quantityButton}
                        >
                          −
                        </button>

                        <strong
                          style={{
                            minWidth: "25px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </strong>

                        <button
                          onClick={() =>
                            increaseQuantity(index)
                          }
                          style={quantityButton}
                        >
                          +
                        </button>

                        <button
                          onClick={() =>
                            removeFromCart(index)
                          }
                          style={{
                            marginLeft: "10px",
                            background: "transparent",
                            color: "#dc2626",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          🗑 Remove
                        </button>
                      </div>
                    </div>

                    <div
                      style={{
                        minWidth: "150px",
                        textAlign: "right",
                      }}
                    >
                      <small
                        style={{
                          color: "#64748b",
                        }}
                      >
                        Subtotal
                      </small>

                      <h3
                        style={{
                          marginTop: "5px",
                          color: "#172033",
                        }}
                      >
                        ₹
                        {subtotal.toLocaleString(
                          "en-IN"
                        )}
                      </h3>

                      <span
                        style={{
                          color: "#16a34a",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        ✓ Free Delivery
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PRICE SUMMARY */}

            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "14px",
                boxShadow:
                  "0 3px 12px rgba(0,0,0,0.06)",
                position: isMobile ? "static" : "sticky",
top: isMobile ? "0" : "20px",
width: "100%",
boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  color: "#172033",
                }}
              >
                Price Details
              </h2>

              <hr
                style={{
                  border: 0,
                  borderTop:
                    "1px solid #e5e7eb",
                }}
              />

              <div style={summaryRow}>
                <span>
                  Price ({totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"})
                </span>

                <span>
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <div style={summaryRow}>
                <span>Delivery Charges</span>

                <strong
                  style={{ color: "#16a34a" }}
                >
                  FREE
                </strong>
              </div>

              <div style={summaryRow}>
                <span>Platform Fee</span>

                <strong
                  style={{ color: "#16a34a" }}
                >
                  ₹0
                </strong>
              </div>

              <hr
                style={{
                  border: 0,
                  borderTop:
                    "1px solid #e5e7eb",
                  margin: "18px 0",
                }}
              />

              <div
                style={{
                  ...summaryRow,
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <span>Total Amount</span>

                <span>
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              <p
                style={{
                  color: "#16a34a",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                ✓ You qualify for FREE local
                delivery
              </p>

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                style={{
                  ...primaryButton,
                  width: "100%",
                  marginTop: "15px",
                  fontSize: "16px",
                }}
              >
                Proceed to Checkout →
              </button>

              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                🔒 Safe checkout
                <br />
                ✓ Verified local sellers
                <br />
                🛡️ Genuine product assurance
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const quantityButton = {
  width: "36px",
  height: "36px",
  border: "1px solid #cbd5e1",
  background: "white",
  borderRadius: "7px",
  fontSize: "20px",
  cursor: "pointer",
};

const primaryButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "13px 22px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  margin: "18px 0",
  color: "#475569",
};

export default Cart;