import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout from Owner Panel?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("bijlikartAdminAuth");
    localStorage.removeItem("bijlikartAdminRole");

    navigate("/admin-login", { replace: true });
  }

  return (
    <div className="admin-layout">

      {/* ================= SIDEBAR ================= */}

      <aside
        className="admin-sidebar"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >

        <div className="admin-logo">
          <h2>⚡ BIJLIKART</h2>
          <p>Owner Panel</p>
        </div>

        {/* MENU */}

        <div
          className="admin-menu"
          style={{
            flex: 1,
          }}
        >

          <button
            className="active"
            onClick={() => navigate("/admin")}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/sellers")}
          >
            🏪 Sellers
          </button>

          <button
            onClick={() => navigate("/admin/products")}
          >
            📦 Products
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
          >
            🛒 Orders
          </button>

          <button
            onClick={() => navigate("/admin/commission")}
          >
            💰 Commission
          </button>

          <button
            onClick={() => navigate("/admin/customers")}
          >
            👥 Customers
          </button>

          {/* OWNER ONLY */}

          <button
            onClick={() => navigate("/admin/team")}
          >
            👨‍💼 Team & Permissions
          </button>

          <button
            onClick={() => navigate("/admin/settings")}
          >
            ⚙️ Settings
          </button>

        </div>

        {/* ================= BOTTOM BUTTONS ================= */}

        <div
          style={{
            padding: "15px 18px 25px 18px",
            marginTop: "auto",
          }}
        >

          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "8px",
              border: "1px solid #5faeff",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            ← Customer Website
          </button>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "8px",
              border: "none",
              background: "#dc2626",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🚪 Owner Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN AREA ================= */}

      <main className="admin-main">

        {/* HEADER */}

        <div className="admin-header">

          <div>
            <h1>Admin Dashboard</h1>

            <p>
              Manage your BIJLIKART marketplace.
            </p>
          </div>

          <div className="admin-badge">
            👑 Owner / Super Admin
          </div>

        </div>

        {/* ================= FIRST STATS ================= */}

        <div className="admin-stats">

          <div className="stat-card">
            <span>🏪</span>
            <p>Total Sellers</p>
            <h2>20</h2>
          </div>

          <div className="stat-card">
            <span>📦</span>
            <p>Total Products</p>
            <h2>248</h2>
          </div>

          <div className="stat-card">
            <span>🛒</span>
            <p>Total Orders</p>
            <h2>126</h2>
          </div>

          <div className="stat-card">
            <span>💰</span>
            <p>Total Sales</p>
            <h2>₹18,45,750</h2>
          </div>

        </div>

        {/* ================= SECOND STATS ================= */}

        <div className="admin-stats second-row">

          <div className="stat-card">
            <span>💵</span>
            <p>BIJLIKART Commission</p>
            <h2>₹1,32,480</h2>
          </div>

          <div className="stat-card">
            <span>👥</span>
            <p>Customers</p>
            <h2>342</h2>
          </div>

          <div className="stat-card">
            <span>⏳</span>
            <p>Pending Sellers</p>
            <h2>4</h2>
          </div>

          <div className="stat-card">
            <span>🚚</span>
            <p>Active Orders</p>
            <h2>18</h2>
          </div>

        </div>

        {/* ================= SELLER APPROVAL ================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>Seller Approval Requests</h2>

              <p>
                Review new shops requesting to join
                BIJLIKART.
              </p>
            </div>

            <button
              className="view-all"
              onClick={() =>
                navigate("/admin/sellers")
              }
            >
              View All
            </button>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Seller ID</th>
                  <th>Shop Name</th>
                  <th>Owner</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>BKSELL01</td>
                  <td>Sharma Electronics</td>
                  <td>Rahul Sharma</td>
                  <td>Mathura</td>

                  <td>
                    <span className="pending">
                      Pending
                    </span>
                  </td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() =>
                        navigate("/admin/sellers")
                      }
                    >
                      Review
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>BKSELL02</td>
                  <td>Krishna Electronics</td>
                  <td>Amit Verma</td>
                  <td>Mathura</td>

                  <td>
                    <span className="pending">
                      Pending
                    </span>
                  </td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() =>
                        navigate("/admin/sellers")
                      }
                    >
                      Review
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>BKSELL03</td>
                  <td>Royal Appliances</td>
                  <td>Deepak Singh</td>
                  <td>Mathura</td>

                  <td>
                    <span className="pending">
                      Pending
                    </span>
                  </td>

                  <td>
                    <button
                      className="approve-btn"
                      onClick={() =>
                        navigate("/admin/sellers")
                      }
                    >
                      Review
                    </button>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

        {/* ================= RECENT ORDERS ================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>Recent Orders</h2>

              <p>
                Latest BIJLIKART marketplace orders.
              </p>
            </div>

            <button
              className="view-all"
              onClick={() =>
                navigate("/admin/orders")
              }
            >
              View All
            </button>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Seller</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>BK1001</td>
                  <td>Samsung Smart TV</td>
                  <td>Sharma Electronics</td>
                  <td>₹49,999</td>

                  <td>
                    <span className="new-order">
                      New Order
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>BK1002</td>
                  <td>LG Air Conditioner</td>
                  <td>Krishna Electronics</td>
                  <td>₹39,999</td>

                  <td>
                    <span className="processing">
                      Processing
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>BK1003</td>
                  <td>Whirlpool Fridge</td>
                  <td>Royal Appliances</td>
                  <td>₹27,999</td>

                  <td>
                    <span className="delivered">
                      Delivered
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;