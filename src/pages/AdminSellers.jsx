import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const demoSellers = [
  {
    id: "BKSELL01",
    shop: "Sharma Electronics",
    owner: "Rahul Sharma",
    mobile: "9876543210",
    city: "Mathura",
    status: "Pending",
    demo: true,
  },
  {
    id: "BKSELL02",
    shop: "Krishna Electronics",
    owner: "Amit Verma",
    mobile: "9876501234",
    city: "Mathura",
    status: "Pending",
    demo: true,
  },
  {
    id: "BKSELL03",
    shop: "Royal Appliances",
    owner: "Deepak Singh",
    mobile: "9812345678",
    city: "Mathura",
    status: "Approved",
    demo: true,
  },
];

function AdminSellers() {
  const navigate = useNavigate();

  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    loadSellers();
  }, []);

  function loadSellers() {
    const registeredSellers = JSON.parse(
      localStorage.getItem("bijlikartSellerApplications") ||
        "[]"
    );

    const savedDemoSellers = JSON.parse(
      localStorage.getItem("bijlikartDemoSellers") ||
        "null"
    );

    const currentDemoSellers =
      savedDemoSellers || demoSellers;

    if (!savedDemoSellers) {
      localStorage.setItem(
        "bijlikartDemoSellers",
        JSON.stringify(demoSellers)
      );
    }

    setSellers([
      ...registeredSellers,
      ...currentDemoSellers,
    ]);
  }

  function changeStatus(id, newStatus) {
    const registeredSellers = JSON.parse(
      localStorage.getItem("bijlikartSellerApplications") ||
        "[]"
    );

    const registeredSellerExists =
      registeredSellers.some(
        (seller) => seller.id === id
      );

    if (registeredSellerExists) {
      const updatedApplications =
        registeredSellers.map((seller) =>
          seller.id === id
            ? {
                ...seller,
                status: newStatus,
                reviewedAt:
                  new Date().toLocaleString("en-IN"),
              }
            : seller
        );

      localStorage.setItem(
        "bijlikartSellerApplications",
        JSON.stringify(updatedApplications)
      );

      // Update latest application too
      const latestApplication = JSON.parse(
        localStorage.getItem(
          "bijlikartSellerApplication"
        ) || "null"
      );

      if (
        latestApplication &&
        latestApplication.id === id
      ) {
        localStorage.setItem(
          "bijlikartSellerApplication",
          JSON.stringify({
            ...latestApplication,
            status: newStatus,
            reviewedAt:
              new Date().toLocaleString("en-IN"),
          })
        );
      }

      if (newStatus === "Approved") {
        const approvedSeller =
          updatedApplications.find(
            (seller) => seller.id === id
          );

        localStorage.setItem(
          "bijlikartApprovedSeller",
          JSON.stringify(approvedSeller)
        );
      }
    } else {
      const savedDemoSellers = JSON.parse(
        localStorage.getItem("bijlikartDemoSellers") ||
          JSON.stringify(demoSellers)
      );

      const updatedDemoSellers =
        savedDemoSellers.map((seller) =>
          seller.id === id
            ? {
                ...seller,
                status: newStatus,
              }
            : seller
        );

      localStorage.setItem(
        "bijlikartDemoSellers",
        JSON.stringify(updatedDemoSellers)
      );
    }

    setSellers((oldSellers) =>
      oldSellers.map((seller) =>
        seller.id === id
          ? {
              ...seller,
              status: newStatus,
            }
          : seller
      )
    );

    if (newStatus === "Approved") {
      alert("Seller approved successfully!");
    }

    if (newStatus === "Rejected") {
      alert("Seller application rejected.");
    }
  }

  function getSellerId(seller) {
    return (
      seller.id ||
      seller.applicationId ||
      "BIJLIKART"
    );
  }

  function getShopName(seller) {
    return (
      seller.shop ||
      seller.shopName ||
      "Shop"
    );
  }

  function getOwnerName(seller) {
    return (
      seller.owner ||
      seller.ownerName ||
      "-"
    );
  }

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}

      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>⚡ BIJLIKART</h2>
          <p>Admin Panel</p>
        </div>

        <div className="admin-menu">
          <button
            onClick={() =>
              navigate("/admin")
            }
          >
            📊 Dashboard
          </button>

          <button
            className="active"
            onClick={() =>
              navigate("/admin/sellers")
            }
          >
            🏪 Sellers
          </button>

          <button
            onClick={() =>
              navigate("/admin/products")
            }
          >
            📦 Products
          </button>

          <button
            onClick={() =>
              navigate("/admin/orders")
            }
          >
            🛒 Orders
          </button>

          <button
            onClick={() =>
              navigate("/admin/commission")
            }
          >
            💰 Commission
          </button>

          <button
            onClick={() =>
              navigate("/admin/customers")
            }
          >
            👥 Customers
          </button>

          <button
            onClick={() =>
              navigate("/admin/settings")
            }
          >
            ⚙️ Settings
          </button>
        </div>

        <button
          className="website-btn"
          onClick={() =>
            navigate("/")
          }
        >
          ← Customer Website
        </button>
      </aside>

      {/* MAIN */}

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>
              Seller Management
            </h1>

            <p>
              Manage all shops registered on BIJLIKART.
            </p>
          </div>

          <div className="admin-badge">
            👑 Super Admin
          </div>
        </div>

        {/* STATS */}

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
                  (seller) =>
                    seller.status ===
                    "Approved"
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
                  (seller) =>
                    seller.status ===
                    "Pending"
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
                  (seller) =>
                    seller.status ===
                    "Rejected"
                ).length
              }
            </h2>
          </div>
        </div>

        {/* SELLERS */}

        <section className="admin-section">
          <div className="section-title">
            <div>
              <h2>
                All Sellers
              </h2>

              <p>
                Approve or reject seller registration
                requests.
              </p>
            </div>

            <button
              onClick={loadSellers}
              style={{
                border: "none",
                background: "#2563eb",
                color: "white",
                padding: "10px 16px",
                borderRadius: "7px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🔄 Refresh
            </button>
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
                {sellers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No seller applications found.
                    </td>
                  </tr>
                ) : (
                  sellers.map((seller) => {
                    const sellerId =
                      getSellerId(seller);

                    return (
                      <tr key={sellerId}>
                        <td>
                          {sellerId}
                        </td>

                        <td>
                          <strong>
                            {getShopName(
                              seller
                            )}
                          </strong>
                        </td>

                        <td>
                          {getOwnerName(
                            seller
                          )}
                        </td>

                        <td>
                          {seller.mobile ||
                            "-"}
                        </td>

                        <td>
                          {seller.city ||
                            "-"}
                        </td>

                        <td>
                          {seller.status ===
                            "Pending" && (
                            <span className="pending">
                              ⏳ Pending
                            </span>
                          )}

                          {seller.status ===
                            "Approved" && (
                            <span
                              style={{
                                color:
                                  "#15803d",
                                fontWeight:
                                  "bold",
                              }}
                            >
                              ✅ Approved
                            </span>
                          )}

                          {seller.status ===
                            "Rejected" && (
                            <span
                              style={{
                                color:
                                  "#dc2626",
                                fontWeight:
                                  "bold",
                              }}
                            >
                              ❌ Rejected
                            </span>
                          )}
                        </td>

                        <td>
                          {seller.status ===
                            "Pending" && (
                            <>
                              <button
                                className="approve-btn"
                                onClick={() =>
                                  changeStatus(
                                    sellerId,
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
                                    sellerId,
                                    "Rejected"
                                  )
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {seller.status ===
                            "Approved" && (
                            <span
                              style={{
                                color:
                                  "#15803d",
                                fontWeight:
                                  "bold",
                              }}
                            >
                              Seller Active
                            </span>
                          )}

                          {seller.status ===
                            "Rejected" && (
                            <button
                              className="approve-btn"
                              onClick={() =>
                                changeStatus(
                                  sellerId,
                                  "Approved"
                                )
                              }
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminSellers;