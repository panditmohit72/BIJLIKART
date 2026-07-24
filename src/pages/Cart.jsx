import { useNavigate } from "react-router-dom";

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const navigate = useNavigate();

  const getPriceNumber = (price) => {
    return Number(price.replace("₹", "").replace(/,/g, ""));
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + getPriceNumber(item.price) * item.quantity;
  }, 0);

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1100px",
        margin: "auto",
      }}
    >
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div>
          <h2>Your cart is empty.</h2>

          <button
            onClick={() => navigate("/")}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ← Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                background: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "150px",
                  height: "120px",
                  objectFit: "contain",
                }}
              />

              <div style={{ flex: 1 }}>
                <h2>{item.name}</h2>

                <p>{item.rating}</p>

                <h3>{item.price}</h3>

                <p>
                  <del>{item.oldPrice}</del>
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    margin: "12px 0",
                  }}
                >
                  <button
                    onClick={() => decreaseQuantity(index)}
                    style={{
                      width: "36px",
                      height: "36px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    −
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    onClick={() => increaseQuantity(index)}
                    style={{
                      width: "36px",
                      height: "36px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    background: "#e53935",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Remove
                </button>
              </div>

              <strong>
                Subtotal: ₹
                {(
                  getPriceNumber(item.price) * item.quantity
                ).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              marginTop: "25px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2>
              Total: ₹{totalAmount.toLocaleString("en-IN")}
            </h2>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: "13px 22px",
                  border: "1px solid #2563eb",
                  background: "white",
                  color: "#2563eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ← Continue Shopping
              </button>

              <button
                onClick={() => navigate("/checkout")}
                style={{
                  padding: "13px 30px",
                  border: "none",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;