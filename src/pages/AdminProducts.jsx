import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: "BKP001",
      name: "Samsung Smart TV",
      seller: "Sharma Electronics",
      category: "Television",
      price: "₹49,999",
      stock: 8,
      status: "Approved",
    },
    {
      id: "BKP002",
      name: "LG Air Conditioner",
      seller: "Krishna Electronics",
      category: "Air Conditioner",
      price: "₹39,999",
      stock: 5,
      status: "Pending",
    },
    {
      id: "BKP003",
      name: "Whirlpool Fridge",
      seller: "Royal Appliances",
      category: "Refrigerator",
      price: "₹27,999",
      stock: 12,
      status: "Pending",
    },
    {
      id: "BKP004",
      name: "HP Laptop",
      seller: "Sharma Electronics",
      category: "Laptop",
      price: "₹62,999",
      stock: 4,
      status: "Approved",
    },
  ]);

  function changeStatus(id, newStatus) {
    setProducts((oldProducts) =>
      oldProducts.map((product) =>
        product.id === id
          ? { ...product, status: newStatus }
          : product
      )
    );
  }

  function removeProduct(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (confirmDelete) {
      setProducts((oldProducts) =>
        oldProducts.filter((product) => product.id !== id)
      );
    }
  }

  const approvedCount = products.filter(
    (product) => product.status === "Approved"
  ).length;

  const pendingCount = products.filter(
    (product) => product.status === "Pending"
  ).length;

  const rejectedCount = products.filter(
    (product) => product.status === "Rejected"
  ).length;

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>⚡ BIJLIKART</h2>
          <p>Admin Panel</p>
        </div>

        <div className="admin-menu">

          <button onClick={() => navigate("/admin")}>
            📊 Dashboard
          </button>

          <button onClick={() => navigate("/admin/sellers")}>
            🏪 Sellers
          </button>

          <button
            className="active"
            onClick={() => navigate("/admin/products")}
          >
            📦 Products
          </button>

          <button onClick={() => navigate("/admin/orders")}>
            🛒 Orders
          </button>

          <button onClick={() => navigate("/admin/commission")}>
            💰 Commission
          </button>

          <button onClick={() => navigate("/admin/customers")}>
            👥 Customers
          </button>

          <button onClick={() => navigate("/admin/settings")}>
            ⚙️ Settings
          </button>

        </div>

        <button
          className="website-btn"
          onClick={() => navigate("/")}
        >
          ← Customer Website
        </button>

      </aside>

      <main className="admin-main">

        <div className="admin-header">

          <div>
            <h1>Product Management</h1>

            <p>
              Manage products listed by BIJLIKART sellers.
            </p>
          </div>

          <div className="admin-badge">
            👑 Super Admin
          </div>

        </div>

        <div className="admin-stats">

          <div className="stat-card">
            <span>📦</span>
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>

          <div className="stat-card">
            <span>✅</span>
            <p>Approved</p>
            <h2>{approvedCount}</h2>
          </div>

          <div className="stat-card">
            <span>⏳</span>
            <p>Pending Approval</p>
            <h2>{pendingCount}</h2>
          </div>

          <div className="stat-card">
            <span>❌</span>
            <p>Rejected</p>
            <h2>{rejectedCount}</h2>
          </div>

        </div>

        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>Marketplace Products</h2>

              <p>
                Review products submitted by sellers.
              </p>
            </div>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product</th>
                  <th>Seller</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {products.map((product) => (

                  <tr key={product.id}>

                    <td>{product.id}</td>

                    <td>
                      <strong>{product.name}</strong>
                    </td>

                    <td>{product.seller}</td>

                    <td>{product.category}</td>

                    <td>{product.price}</td>

                    <td>{product.stock}</td>

                    <td>

                      {product.status === "Approved" && (
                        <span
                          style={{
                            color: "#15803d",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ Approved
                        </span>
                      )}

                      {product.status === "Pending" && (
                        <span className="pending">
                          Pending
                        </span>
                      )}

                      {product.status === "Rejected" && (
                        <span
                          style={{
                            color: "#dc2626",
                            fontWeight: "bold",
                          }}
                        >
                          ❌ Rejected
                        </span>
                      )}

                    </td>

                    <td>

                      <button
                        className="approve-btn"
                        onClick={() =>
                          changeStatus(
                            product.id,
                            "Approved"
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          changeStatus(
                            product.id,
                            "Rejected"
                          )
                        }
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          removeProduct(product.id)
                        }
                        style={{
                          border: "none",
                          background: "#374151",
                          color: "white",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          marginLeft: "7px",
                        }}
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminProducts;