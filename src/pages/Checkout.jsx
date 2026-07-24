import { useNavigate } from "react-router-dom";

function Checkout({ cart }) {
  const navigate = useNavigate();

  const getPriceNumber = (price) => {
    return Number(price.replace("₹", "").replace(/,/g, ""));
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + getPriceNumber(item.price) * item.quantity;
  }, 0);

  const handleOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/");
      return;
    }

    alert(
      "Demo Order Placed Successfully! BIJLIKART will confirm your order shortly."
    );
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <button
        onClick={() => navigate("/cart")}
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

      <h1>⚡ BIJLIKART Checkout</h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Complete your details to place your demo order.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "30px",
        }}
      >
        <form
          onSubmit={handleOrder}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Delivery Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            required
            style={inputStyle}
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="House / Street / Locality"
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="City"
            defaultValue="Mathura"
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="PIN Code"
            required
            style={inputStyle}
          />

          <h2 style={{ marginTop: "25px" }}>
            Payment Method
          </h2>

          <label
            style={{
              display: "block",
              margin: "15px 0",
            }}
          >
            <input
              type="radio"
              name="payment"
              defaultChecked
            />{" "}
            Cash on Delivery — Demo
          </label>

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
              marginTop: "20px",
            }}
          >
            Place Demo Order
          </button>
        </form>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            height: "fit-content",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>No products in cart.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.name}
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "15px 0",
                }}
              >
                <strong>{item.name}</strong>

                <p>
                  {item.quantity} × {item.price}
                </p>
              </div>
            ))
          )}

          <h2
            style={{
              marginTop: "20px",
            }}
          >
            Total: ₹{totalAmount.toLocaleString("en-IN")}
          </h2>

          <p
            style={{
              fontSize: "13px",
              color: "#777",
              marginTop: "15px",
            }}
          >
            This checkout is currently for BIJLIKART's demonstration
            and pilot testing.
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default Checkout;