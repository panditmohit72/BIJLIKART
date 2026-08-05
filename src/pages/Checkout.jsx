import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Mathura",
    pincode: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(null);
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  // ================================
  // PRICE NUMBER
  // ================================

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

  // ================================
  // TOTAL AMOUNT
  // ================================

  const totalAmount = cart.reduce(
    (total, item) => {
      return (
        total +
        getPriceNumber(item.price) *
          item.quantity
      );
    },
    0
  );

  // ================================
  // CUSTOMER FORM
  // ================================

  function handleChange(e) {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ================================
  // GENERATE ORDER ID
  // ================================

  function generateOrderId() {
    return `BK${Date.now()
      .toString()
      .slice(-8)}`;
  }

  // ================================
  // PLACE ORDER
  // ================================

  function handleOrder(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/");
      return;
    }

    if (customer.phone.length !== 10) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (customer.pincode.length !== 6) {
      alert(
        "Please enter a valid 6-digit PIN code."
      );
      return;
    }

    const mainOrderId = generateOrderId();

    const today = new Date();

    const orderDate =
      today.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    /*
      One cart can contain multiple products.

      For our current seller demo,
      each product becomes an order entry
      so it can appear properly inside
      Seller Dashboard.
    */

    const newOrders = cart.map(
      (item, index) => {
        const productPrice =
          getPriceNumber(item.price);

        return {
          id:
            index === 0
              ? mainOrderId
              : `${mainOrderId}-${index + 1}`,

          customer: customer.name,

          phone: customer.phone,

          product: item.name,

          quantity: item.quantity,

          amount:
            productPrice *
            item.quantity,

          payment:
            "Cash on Delivery",

          address: `${customer.address}, ${customer.city} - ${customer.pincode}`,

          date: orderDate,

          status: "New Order",

          shop:
            item.shop ||
            "Demo Electronics Store",

          createdAt:
            new Date().toISOString(),
        };
      }
    );

    // ================================
    // SAVE ORDERS TO LOCAL STORAGE
    // ================================

    try {
      const oldOrders =
        JSON.parse(
          localStorage.getItem(
            "bijlikartOrders"
          )
        ) || [];

      const updatedOrders = [
        ...newOrders,
        ...oldOrders,
      ];

      localStorage.setItem(
        "bijlikartOrders",
        JSON.stringify(updatedOrders)
      );

      // Save success information

      setOrderSuccess({
        orderId: mainOrderId,
        total: totalAmount,
        items: cart.length,
      });
    } catch (error) {
      console.error(
        "Order save error:",
        error
      );

      alert(
        "Unable to save the demo order. Please try again."
      );
    }
  }

  // ================================
  // ORDER SUCCESS SCREEN
  // ================================

  if (orderSuccess) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "650px",
            background: "white",
            padding: "45px",
            borderRadius: "18px",
            boxShadow:
              "0 5px 25px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#dcfce7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px",
              fontSize: "38px",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              color: "#16a34a",
              marginBottom: "10px",
            }}
          >
            Order Placed Successfully!
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "17px",
            }}
          >
            Thank you for shopping on
            BIJLIKART.
          </p>

          <div
            style={{
              background: "#f8fafc",
              padding: "22px",
              borderRadius: "12px",
              margin: "30px 0",
            }}
          >
            <p
              style={{
                color: "#64748b",
                marginBottom: "5px",
              }}
            >
              ORDER ID
            </p>

            <h2
              style={{
                color: "#2563eb",
                marginTop: 0,
              }}
            >
              {orderSuccess.orderId}
            </h2>

            <p>
              <strong>
                Order Total:
              </strong>{" "}
              ₹
              {orderSuccess.total.toLocaleString(
                "en-IN"
              )}
            </p>

            <p>
              <strong>
                Products:
              </strong>{" "}
              {orderSuccess.items}
            </p>

            <p
              style={{
                marginBottom: 0,
              }}
            >
              <strong>
                Payment:
              </strong>{" "}
              Cash on Delivery
            </p>
          </div>

          <div
            style={{
              background: "#eff6ff",
              border:
                "1px solid #bfdbfe",
              padding: "16px",
              borderRadius: "10px",
              color: "#1e40af",
              marginBottom: "25px",
            }}
          >
            🏪 Your order has been sent
            to the seller for confirmation.
          </div>

          <button
            onClick={() =>
              navigate("/")
            }
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ================================
  // CHECKOUT SCREEN
  // ================================

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <button
        onClick={() =>
          navigate("/cart")
        }
        style={{
          border: "none",
          background: "transparent",
          color: "#2563eb",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        ← Back to Cart
      </button>

      <h1>
        ⚡ BIJLIKART Checkout
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Complete your delivery details
        to place your order.
      </p>

      <div
       style={{
  display: "grid",
  gridTemplateColumns: isMobile
    ? "1fr"
    : "minmax(0,1.5fr) minmax(320px,1fr)",
  gap: "25px",
}}
      >
        {/* DELIVERY FORM */}

        <form
          onSubmit={handleOrder}
          style={{
            background: "white",
            padding: isMobile ? "18px" : "30px",
             width: "100%",
             boxSizing: "border-box",
            borderRadius: "15px",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>
            📍 Delivery Details
          </h2>

          <label style={labelStyle}>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            style={inputStyle}
          />

          <label style={labelStyle}>
            Mobile Number
          </label>

          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            required
            maxLength="10"
            pattern="[0-9]{10}"
            style={inputStyle}
          />

          <label style={labelStyle}>
            House / Street / Locality
          </label>

          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="Enter complete delivery address"
            required
            rows="3"
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />

          <label style={labelStyle}>
            City
          </label>

          <input
            type="text"
            name="city"
            value={customer.city}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>
            PIN Code
          </label>

          <input
            type="text"
            name="pincode"
            value={customer.pincode}
            onChange={handleChange}
            placeholder="281001"
            required
            maxLength="6"
            pattern="[0-9]{6}"
            style={inputStyle}
          />

          {/* PAYMENT */}

          <h2
            style={{
              marginTop: "30px",
            }}
          >
            💳 Payment Method
          </h2>

          <div
            style={{
              border:
                "1px solid #bfdbfe",
              background: "#eff6ff",
              padding: "16px",
              borderRadius: "10px",
              marginTop: "15px",
            }}
          >
            <label
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="payment"
                defaultChecked
              />

              <strong>
                Cash on Delivery
              </strong>
            </label>

            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginBottom: 0,
                marginLeft: "25px",
              }}
            >
              Demo payment option for
              BIJLIKART pilot testing.
            </p>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "25px",
            }}
          >
            Place Order — ₹
            {totalAmount.toLocaleString(
              "en-IN"
            )}
          </button>
        </form>

        {/* ORDER SUMMARY */}

        <div
          style={{
            background: "white",
            padding: isMobile ? "18px" : "25px",
            width: "100%",
          boxSizing: "border-box",
            borderRadius: "15px",
            height: "fit-content",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>
            🛒 Order Summary
          </h2>

          {cart.length === 0 ? (
            <p>
              No products in cart.
            </p>
          ) : (
            cart.map(
              (item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  style={{
                    borderBottom:
                      "1px solid #e5e7eb",
                    padding: "15px 0",
                  }}
                >
                  <strong>
                    {item.name}
                  </strong>

                  {item.shop && (
                    <p
                      style={{
                        color:
                          "#64748b",
                        fontSize:
                          "13px",
                        margin:
                          "6px 0",
                      }}
                    >
                      🏪 Sold by{" "}
                      {item.shop}
                    </p>
                  )}

                  <p
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    {item.quantity} × ₹
                    {getPriceNumber(
                      item.price
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <strong
                    style={{
                      display:
                        "block",
                      marginTop:
                        "8px",
                      color:
                        "#2563eb",
                    }}
                  >
                    ₹
                    {(
                      getPriceNumber(
                        item.price
                      ) *
                      item.quantity
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              )
            )
          )}

          <div
            style={{
              marginTop: "20px",
              borderTop:
                "2px solid #e5e7eb",
              paddingTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >
              <span>
                Order Total
              </span>

              <h2
                style={{
                  margin: 0,
                  color:
                    "#2563eb",
                }}
              >
                ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </h2>
            </div>
          </div>

          <div
            style={{
              background: "#f0fdf4",
              border:
                "1px solid #bbf7d0",
              padding: "14px",
              borderRadius: "10px",
              marginTop: "20px",
              color: "#166534",
              fontSize: "13px",
            }}
          >
            ✓ This order will be sent
            to the seller after you
            place it.
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "7px",
  marginBottom: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "16px",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginTop: "15px",
  color: "#334155",
};

export default Checkout;