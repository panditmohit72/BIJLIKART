import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminSellers() {
  const navigate = useNavigate();

  const [sellers, setSellers] = useState([
    {
      id: "BKSELL01",
      shop: "Sharma Electronics",
      owner: "Rahul Sharma",
      mobile: "9876543210",
      city: "Mathura",
      status: "Pending",
    },
    {
      id: "BKSELL02",
      shop: "Krishna Electronics",
      owner: "Amit Verma",
      mobile: "9876501234",
      city: "Mathura",
      status: "Pending",
    },
    {
      id: "BKSELL03",
      shop: "Royal Appliances",
      owner: "Deepak Singh",
      mobile: "9812345678",
      city: "Mathura",
      status: "Approved",
    },
  ]);

  function changeStatus(id, newStatus) {
    setSellers((oldSellers) =>
      oldSellers.map((seller) =>
        seller.id === id
          ? { ...seller, status: newStatus }
          : seller
      )
    );
  }

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

          <button
            className="active"
            onClick={() => navigate("/admin/sellers")}
          >
            🏪 Sellers
          </button>

          <button onClick={() => navigate("/admin/products")}>
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
            <h1>Seller Management</h1>
            <p>
              Manage all shops registered on BIJLIKART.
            </p>
          </div>

          <div className="admin-badge">
            👑 Super Admin
          </div>

        </div>


        <div className="admin-stats">

          <div className="stat-card">
            <span>🏪</span>
            <p>Total Sellers</p>
            <h2>{sellers.length}</h2>
          </div>

          <div className="stat-card">
            <span>✅</span>
            <p>Approved</p>

            <h2>
              {
                sellers.filter(
                  (seller) => seller.status === "Approved"
                ).length
              }
            </h2>
          </div>

          <div className="stat-card">
            <span>⏳</span>
            <p>Pending</p>

            <h2>
              {
                sellers.filter(
                  (seller) => seller.status === "Pending"
                ).length
              }
            </h2>
          </div>

          <div className="stat-card">
            <span>❌</span>
            <p>Rejected</p>

            <h2>
              {
                sellers.filter(
                  (seller) => seller.status === "Rejected"
                ).length
              }
            </h2>
          </div>

        </div>


        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>All Sellers</h2>
              <p>
                Approve or reject seller registration requests.
              </p>
            </div>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Seller ID</th>
                  <th>Shop Name</th>
                  <th>Owner</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {sellers.map((seller) => (

                  <tr key={seller.id}>

                    <td>{seller.id}</td>

                    <td>
                      <strong>{seller.shop}</strong>
                    </td>

                    <td>{seller.owner}</td>

                    <td>{seller.mobile}</td>

                    <td>{seller.city}</td>

                    <td>

                      {seller.status === "Pending" && (
                        <span className="pending">
                          Pending
                        </span>
                      )}

                      {seller.status === "Approved" && (
                        <span
                          style={{
                            color: "#15803d",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ Approved
                        </span>
                      )}

                      {seller.status === "Rejected" && (
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
                            seller.id,
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
                            seller.id,
                            "Rejected"
                          )
                        }
                      >
                        Reject
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

export default AdminSellers;