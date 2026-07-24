import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Samsung Smart TV",
      price: "₹49,999",
      stock: 8,
    },
    {
      id: 2,
      name: "LG Air Conditioner",
      price: "₹39,999",
      stock: 5,
    },
  ]);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");

  function addProduct(e) {
    e.preventDefault();

    if (!productName || !productPrice || !productStock) {
      alert("Please fill all product details.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: `₹${Number(productPrice).toLocaleString("en-IN")}`,
      stock: Number(productStock),
    };

    setProducts([...products, newProduct]);

    setProductName("");
    setProductPrice("");
    setProductStock("");

    alert("Product added successfully!");
    setActivePage("products");
  }

  function deleteProduct(id) {
    setProducts(products.filter((product) => product.id !== id));
  }

  const menuButton = (page, text) => (
    <button
      onClick={() => setActivePage(page)}
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "8px",
        border: "none",
        borderRadius: "8px",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "15px",
        background: activePage === page ? "#2563eb" : "transparent",
        color: activePage === page ? "white" : "#dbeafe",
      }}
    >
      {text}
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* SIDEBAR */}

      <aside
        style={{
          width: "240px",
          background: "#0f2f5f",
          padding: "25px 18px",
          color: "white",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginBottom: "3px" }}>⚡ BIJLIKART</h2>

        <p
          style={{
            fontSize: "12px",
            color: "#bfdbfe",
            marginBottom: "30px",
          }}
        >
          Seller Panel
        </p>

        {menuButton("dashboard", "📊 Dashboard")}
        {menuButton("add", "➕ Add Product")}
        {menuButton("products", "📦 My Products")}
        {menuButton("orders", "🛍️ Orders")}
        {menuButton("earnings", "💰 Earnings")}
        {menuButton("profile", "🏪 Shop Profile")}

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "13px",
            marginTop: "30px",
            border: "1px solid #93c5fd",
            borderRadius: "8px",
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Customer Website
        </button>
      </aside>

      {/* MAIN AREA */}

      <main
        style={{
          flex: 1,
          padding: "35px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1 style={{ marginBottom: "5px" }}>Seller Dashboard</h1>

            <p style={{ color: "#666" }}>
              Welcome to your BIJLIKART seller panel.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "12px 18px",
              borderRadius: "10px",
            }}
          >
            🏪 <strong>Demo Electronics Store</strong>
          </div>
        </div>

        {/* DASHBOARD */}

        {activePage === "dashboard" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              <StatCard
                title="Total Products"
                value={products.length}
                icon="📦"
              />

              <StatCard
                title="New Orders"
                value="3"
                icon="🛍️"
              />

              <StatCard
                title="Sales"
                value="₹1,17,997"
                icon="💰"
              />

              <StatCard
                title="Store Rating"
                value="4.8 ⭐"
                icon="⭐"
              />
            </div>

            <div
              style={{
                background: "white",
                marginTop: "30px",
                padding: "25px",
                borderRadius: "14px",
              }}
            >
              <h2>Recent Orders</h2>

              <OrderTable />
            </div>
          </>
        )}

        {/* ADD PRODUCT */}

        {activePage === "add" && (
          <div style={cardStyle}>
            <h2>Add New Product</h2>

            <form onSubmit={addProduct}>
              <label style={labelStyle}>Product Name</label>

              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Example: Sony Smart TV"
                style={inputStyle}
              />

              <label style={labelStyle}>Selling Price ₹</label>

              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="49999"
                style={inputStyle}
              />

              <label style={labelStyle}>Available Stock</label>

              <input
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(e.target.value)}
                placeholder="10"
                style={inputStyle}
              />

              <button
                type="submit"
                style={{
                  marginTop: "20px",
                  padding: "13px 25px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* PRODUCTS */}

        {activePage === "products" && (
          <div style={cardStyle}>
            <h2>My Products</h2>

            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={cellStyle}>Product</th>
                  <th style={cellStyle}>Price</th>
                  <th style={cellStyle}>Stock</th>
                  <th style={cellStyle}>Status</th>
                  <th style={cellStyle}>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={cellStyle}>{product.name}</td>
                    <td style={cellStyle}>{product.price}</td>
                    <td style={cellStyle}>{product.stock}</td>

                    <td style={cellStyle}>
                      <span style={{ color: "green" }}>
                        ● Active
                      </span>
                    </td>

                    <td style={cellStyle}>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        style={{
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ORDERS */}

        {activePage === "orders" && (
          <div style={cardStyle}>
            <h2>Customer Orders</h2>
            <OrderTable />
          </div>
        )}

        {/* EARNINGS */}

        {activePage === "earnings" && (
          <div style={cardStyle}>
            <h2>💰 Earnings & Settlement</h2>

            <h1>₹1,17,997</h1>
            <p>Total demo sales</p>

            <hr style={{ margin: "25px 0" }} />

            <p>
              Platform Commission: <strong>₹11,800</strong>
            </p>

            <p>
              Seller Settlement: <strong>₹1,06,197</strong>
            </p>

            <p style={{ color: "#777", marginTop: "20px" }}>
              These figures are demonstration data only.
            </p>
          </div>
        )}

        {/* PROFILE */}

        {activePage === "profile" && (
          <div style={cardStyle}>
            <h2>🏪 Shop Profile</h2>

            <p>
              <strong>Shop:</strong> Demo Electronics Store
            </p>

            <p>
              <strong>Location:</strong> Mathura, Uttar Pradesh
            </p>

            <p>
              <strong>Seller Status:</strong>{" "}
              <span style={{ color: "green" }}>Approved ✓</span>
            </p>

            <p>
              <strong>Seller ID:</strong> BKS-DEMO-001
            </p>

            <p>
              <strong>Marketplace:</strong> BIJLIKART
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div
      style={{
        background: "white",
        padding: "22px",
        borderRadius: "14px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ fontSize: "28px" }}>{icon}</div>

      <p style={{ color: "#777" }}>{title}</p>

      <h2>{value}</h2>
    </div>
  );
}

function OrderTable() {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>Order ID</th>
          <th style={cellStyle}>Product</th>
          <th style={cellStyle}>Amount</th>
          <th style={cellStyle}>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={cellStyle}>BK1001</td>
          <td style={cellStyle}>Samsung Smart TV</td>
          <td style={cellStyle}>₹49,999</td>
          <td style={cellStyle}>🟢 New Order</td>
        </tr>

        <tr>
          <td style={cellStyle}>BK1002</td>
          <td style={cellStyle}>LG Air Conditioner</td>
          <td style={cellStyle}>₹39,999</td>
          <td style={cellStyle}>🟡 Processing</td>
        </tr>

        <tr>
          <td style={cellStyle}>BK1003</td>
          <td style={cellStyle}>Whirlpool Fridge</td>
          <td style={cellStyle}>₹27,999</td>
          <td style={cellStyle}>🔵 Delivered</td>
        </tr>
      </tbody>
    </table>
  );
}

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "14px",
  boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
};

const inputStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "7px",
  marginBottom: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "15px",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginTop: "15px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const cellStyle = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left",
};

export default SellerDashboard;