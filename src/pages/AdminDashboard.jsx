import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [sellers, setSellers] = useState([]);

  const [defaultCommission, setDefaultCommission] =
    useState(() => {
      const savedRate = localStorage.getItem(
        "bijlikartDefaultCommission"
      );

      return savedRate ? Number(savedRate) : 10;
    });

  // =================================
  // LOAD DASHBOARD DATA
  // =================================

  useEffect(() => {
    loadDashboardData();

    function handleFocus() {
      loadDashboardData();
    }

    function handleStorage() {
      loadDashboardData();
    }

    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function loadDashboardData() {
    loadOrders();
    loadSellers();

    const savedRate = localStorage.getItem(
      "bijlikartDefaultCommission"
    );

    if (savedRate !== null) {
      setDefaultCommission(Number(savedRate));
    }
  }

  // =================================
  // LOAD ORDERS
  // =================================

  function loadOrders() {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("bijlikartOrders") || "[]"
      );

      if (Array.isArray(savedOrders)) {
        setOrders(savedOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Order loading error:", error);
      setOrders([]);
    }
  }

  // =================================
  // LOAD SELLERS
  // =================================

  function loadSellers() {
    let allSellers = [];

    // Multiple seller storage formats supported
    // because earlier demo versions used
    // different localStorage keys.

    try {
      const sellerApplications = JSON.parse(
        localStorage.getItem(
          "bijlikartSellerApplications"
        ) || "[]"
      );

      if (Array.isArray(sellerApplications)) {
        allSellers = [
          ...allSellers,
          ...sellerApplications,
        ];
      }
    } catch (error) {
      console.error(
        "Seller applications load error:",
        error
      );
    }

    try {
      const demoSellers = JSON.parse(
        localStorage.getItem(
          "bijlikartDemoSellers"
        ) || "[]"
      );

      if (Array.isArray(demoSellers)) {
        allSellers = [
          ...allSellers,
          ...demoSellers,
        ];
      }
    } catch (error) {
      console.error(
        "Demo sellers load error:",
        error
      );
    }

    // Older SellerRegistration.jsx saved
    // one application using this key.

    try {
      const singleSeller = JSON.parse(
        localStorage.getItem(
          "bijlikartSellerApplication"
        ) || "null"
      );

      if (
        singleSeller &&
        typeof singleSeller === "object"
      ) {
        const alreadyExists = allSellers.some(
          (seller) =>
            getSellerId(seller) ===
            getSellerId(singleSeller)
        );

        if (!alreadyExists) {
          allSellers.unshift(singleSeller);
        }
      }
    } catch (error) {
      console.error(
        "Single seller load error:",
        error
      );
    }

    setSellers(allSellers);
  }

  // =================================
  // MONEY HELPERS
  // =================================

  function getAmount(order) {
    const rawAmount =
      order.totalAmount ??
      order.total ??
      order.amount ??
      order.orderTotal ??
      0;

    if (typeof rawAmount === "number") {
      return rawAmount;
    }

    const amount = Number(
      String(rawAmount)
        .replace("₹", "")
        .replace(/,/g, "")
        .trim()
    );

    return Number.isNaN(amount)
      ? 0
      : amount;
  }

  function getCommissionRate(order) {
    if (
      order.commissionRate !== undefined &&
      order.commissionRate !== null &&
      order.commissionRate !== ""
    ) {
      const rate = Number(
        order.commissionRate
      );

      return Number.isNaN(rate)
        ? defaultCommission
        : rate;
    }

    return defaultCommission;
  }

  function getCommissionAmount(order) {
    const amount = getAmount(order);

    const rate =
      getCommissionRate(order);

    return Math.round(
      (amount * rate) / 100
    );
  }

  function getSellerPayable(order) {
    return (
      getAmount(order) -
      getCommissionAmount(order)
    );
  }

  // =================================
  // ORDER HELPERS
  // =================================

  function getCustomerName(order) {
    if (
      typeof order.customer === "string" &&
      order.customer.trim()
    ) {
      return order.customer;
    }

    return (
      order.customerName ||
      order.customer?.name ||
      order.name ||
      "Customer"
    );
  }

  function getCustomerMobile(order) {
    return (
      order.phone ||
      order.mobile ||
      order.customer?.phone ||
      order.customer?.mobile ||
      ""
    );
  }

  function getProductName(order) {
    if (order.product) {
      return order.product;
    }

    if (
      Array.isArray(order.items) &&
      order.items.length > 0
    ) {
      return order.items
        .map(
          (item) =>
            item.name ||
            item.product ||
            "Product"
        )
        .join(", ");
    }

    return "Order Products";
  }

  function getSellerName(order) {
    return (
      order.shop ||
      order.seller ||
      order.sellerName ||
      "Demo Electronics Store"
    );
  }

  function getOrderQuantity(order) {
    if (order.quantity !== undefined) {
      return Number(order.quantity) || 1;
    }

    if (
      Array.isArray(order.items) &&
      order.items.length > 0
    ) {
      return order.items.reduce(
        (total, item) =>
          total +
          Number(item.quantity || 1),
        0
      );
    }

    return 1;
  }

  // =================================
  // SELLER HELPERS
  // =================================

  function getSellerId(seller) {
    return (
      seller.id ||
      seller.applicationId ||
      seller.sellerId ||
      seller.mobile ||
      "BIJLIKART-SELLER"
    );
  }

  function getShopName(seller) {
    return (
      seller.shop ||
      seller.shopName ||
      seller.businessName ||
      "Shop"
    );
  }

  function getOwnerName(seller) {
    return (
      seller.owner ||
      seller.ownerName ||
      seller.name ||
      "-"
    );
  }

  // =================================
  // ORDER STATS
  // =================================

  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (total, order) =>
      total + getAmount(order),
    0
  );

  const totalCommission = orders.reduce(
    (total, order) =>
      total +
      getCommissionAmount(order),
    0
  );

  const totalSellerPayable =
    orders.reduce(
      (total, order) =>
        total +
        getSellerPayable(order),
      0
    );

  const settledSellerAmount =
    orders.reduce((total, order) => {
      if (
        order.settlementStatus !==
        "Settled"
      ) {
        return total;
      }

      return (
        total +
        getSellerPayable(order)
      );
    }, 0);

  const pendingSettlement =
    Math.max(
      totalSellerPayable -
        settledSellerAmount,
      0
    );

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "New Order" ||
        order.status === "Pending"
    ).length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status === "Delivered"
    ).length;

  // =================================
  // PRODUCTS ORDERED
  // =================================

  const productsOrdered =
    orders.reduce(
      (total, order) =>
        total +
        getOrderQuantity(order),
      0
    );

  // =================================
  // CUSTOMERS
  // =================================

  const customerKeys =
    orders
      .map((order) => {
        const mobile =
          getCustomerMobile(order);

        if (mobile) {
          return mobile;
        }

        return getCustomerName(order);
      })
      .filter(Boolean);

  const totalCustomers =
    new Set(customerKeys).size;

  // =================================
  // SELLER STATS
  // =================================

  const pendingSellers =
    sellers.filter(
      (seller) =>
        seller.status === "Pending"
    );

  const approvedSellers =
    sellers.filter(
      (seller) =>
        seller.status === "Approved"
    );

  const rejectedSellers =
    sellers.filter(
      (seller) =>
        seller.status === "Rejected"
    );

  // =================================
  // RECENT ORDERS
  // =================================

  const recentOrders =
    [...orders]
      .sort((a, b) => {
        const dateA =
          new Date(
            a.createdAt ||
            a.date ||
            0
          ).getTime();

        const dateB =
          new Date(
            b.createdAt ||
            b.date ||
            0
          ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);

  // =================================
  // LOGOUT
  // =================================

  function logoutOwner() {
    const confirmed =
      window.confirm(
        "Logout from Owner Panel?"
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "bijlikartAdminAuth"
    );

    localStorage.removeItem(
      "bijlikartAdminRole"
    );

    navigate("/admin-login", {
      replace: true,
    });
  }

  // =================================
  // UI
  // =================================

  return (
    <div className="admin-layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className="admin-sidebar"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >

        <div className="admin-logo">

          <h2>
            ⚡ BIJLIKART
          </h2>

          <p>
            Owner Panel
          </p>

        </div>

        <div className="admin-menu">

          <button
            className="active"
            onClick={() =>
              navigate("/admin")
            }
          >
            📊 Dashboard
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/sellers"
              )
            }
          >
            🏪 Sellers
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
          >
            📦 Products
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/orders"
              )
            }
          >
            🛒 Orders
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/commission"
              )
            }
          >
            💰 Commission
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/customers"
              )
            }
          >
            👥 Customers
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/team"
              )
            }
          >
            👨‍💼 Team & Permissions
          </button>

          <button
            onClick={() =>
              navigate(
                "/admin/settings"
              )
            }
          >
            ⚙️ Settings
          </button>

        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "30px",
          }}
        >

          <button
            onClick={() =>
              navigate("/")
            }
            style={
              customerWebsiteButton
            }
          >
            ← Customer Website
          </button>

          <button
            onClick={logoutOwner}
            style={logoutButton}
          >
            🚪 Owner Logout
          </button>

        </div>

      </aside>

      {/* =========================
          MAIN
      ========================= */}

      <main className="admin-main">

        {/* HEADER */}

        <div className="admin-header">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Live overview of your BIJLIKART marketplace.
            </p>

          </div>

          <div className="admin-badge">
            👑 Owner / Super Admin
          </div>

        </div>

        {/* =========================
            MAIN STATS
        ========================= */}

        <div className="admin-stats">

          <DashboardCard
            icon="🛒"
            label="Total Orders"
            value={totalOrders}
          />

          <DashboardCard
            icon="💳"
            label="Marketplace Sales"
            value={`₹${totalSales.toLocaleString(
              "en-IN"
            )}`}
          />

          <DashboardCard
            icon="💰"
            label="BIJLIKART Earnings"
            value={`₹${totalCommission.toLocaleString(
              "en-IN"
            )}`}
          />

          <DashboardCard
            icon="🏪"
            label="Seller Payable"
            value={`₹${totalSellerPayable.toLocaleString(
              "en-IN"
            )}`}
          />

        </div>

        {/* =========================
            SECOND STATS
        ========================= */}

        <div
          className="admin-stats"
          style={{
            marginTop: "20px",
          }}
        >

          <DashboardCard
            icon="⏳"
            label="Pending Settlement"
            value={`₹${pendingSettlement.toLocaleString(
              "en-IN"
            )}`}
          />

          <DashboardCard
            icon="👥"
            label="Customers"
            value={totalCustomers}
          />

          <DashboardCard
            icon="📦"
            label="Products Ordered"
            value={productsOrdered}
          />

          <DashboardCard
            icon="🏬"
            label="Registered Sellers"
            value={sellers.length}
          />

        </div>

        {/* =========================
            ORDER STATUS
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>

              <h2>
                Marketplace Overview
              </h2>

              <p>
                Current BIJLIKART marketplace activity.
              </p>

            </div>

            <button
              onClick={
                loadDashboardData
              }
              style={refreshButton}
            >
              🔄 Refresh Dashboard
            </button>

          </div>

          <div style={overviewGrid}>

            <OverviewCard
              icon="🆕"
              title="New / Pending Orders"
              value={pendingOrders}
            />

            <OverviewCard
              icon="✅"
              title="Delivered Orders"
              value={deliveredOrders}
            />

            <OverviewCard
              icon="⏳"
              title="Pending Sellers"
              value={pendingSellers.length}
            />

            <OverviewCard
              icon="✅"
              title="Approved Sellers"
              value={approvedSellers.length}
            />

            <OverviewCard
              icon="❌"
              title="Rejected Sellers"
              value={rejectedSellers.length}
            />

            <OverviewCard
              icon="📊"
              title="Default Commission"
              value={`${defaultCommission}%`}
            />

          </div>

        </section>

        {/* =========================
            SELLER APPROVAL REQUESTS
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>

              <h2>
                Seller Approval Requests
              </h2>

              <p>
                Shops waiting for BIJLIKART approval.
              </p>

            </div>

            <button
              className="view-all"
              onClick={() =>
                navigate(
                  "/admin/sellers"
                )
              }
            >
              View All
            </button>

          </div>

          <div
            className="table-wrapper"
            style={{
              overflowX: "auto",
            }}
          >

            <table>

              <thead>

                <tr>
                  <th>
                    Seller ID
                  </th>

                  <th>
                    Shop Name
                  </th>

                  <th>
                    Owner
                  </th>

                  <th>
                    City
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Action
                  </th>
                </tr>

              </thead>

              <tbody>

                {pendingSellers.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      style={emptyTableCell}
                    >
                      No pending seller applications.
                    </td>

                  </tr>

                ) : (

                  pendingSellers
                    .slice(0, 5)
                    .map(
                      (
                        seller,
                        index
                      ) => (

                        <tr
                          key={
                            getSellerId(
                              seller
                            ) ||
                            index
                          }
                        >

                          <td>
                            <strong>
                              {getSellerId(
                                seller
                              )}
                            </strong>
                          </td>

                          <td>
                            {getShopName(
                              seller
                            )}
                          </td>

                          <td>
                            {getOwnerName(
                              seller
                            )}
                          </td>

                          <td>
                            {seller.city ||
                              "Mathura"}
                          </td>

                          <td>

                            <strong
                              style={{
                                color:
                                  "#d97706",
                              }}
                            >
                              ⏳ Pending
                            </strong>

                          </td>

                          <td>

                            <button
                              onClick={() =>
                                navigate(
                                  "/admin/sellers"
                                )
                              }
                              style={
                                reviewButton
                              }
                            >
                              Review
                            </button>

                          </td>

                        </tr>
                      )
                    )
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* =========================
            RECENT ORDERS
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>

              <h2>
                Recent Orders
              </h2>

              <p>
                Latest real customer orders from BIJLIKART checkout.
              </p>

            </div>

            <button
              className="view-all"
              onClick={() =>
                navigate(
                  "/admin/orders"
                )
              }
            >
              View All
            </button>

          </div>

          <div
            className="table-wrapper"
            style={{
              overflowX: "auto",
            }}
          >

            <table>

              <thead>

                <tr>
                  <th>
                    Order ID
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Product
                  </th>

                  <th>
                    Seller
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Commission
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Settlement
                  </th>
                </tr>

              </thead>

              <tbody>

                {recentOrders.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      style={emptyTableCell}
                    >
                      🛒 No customer orders yet.
                    </td>

                  </tr>

                ) : (

                  recentOrders.map(
                    (
                      order,
                      index
                    ) => {

                      const rate =
                        getCommissionRate(
                          order
                        );

                      const commission =
                        getCommissionAmount(
                          order
                        );

                      return (

                        <tr
                          key={
                            order.id ||
                            index
                          }
                        >

                          <td>

                            <strong>
                              {order.id ||
                                `BKORDER${
                                  1001 +
                                  index
                                }`}
                            </strong>

                          </td>

                          <td>

                            <strong>
                              {getCustomerName(
                                order
                              )}
                            </strong>

                            {getCustomerMobile(
                              order
                            ) && (

                              <div
                                style={{
                                  fontSize:
                                    "12px",
                                  color:
                                    "#64748b",
                                  marginTop:
                                    "4px",
                                }}
                              >
                                {getCustomerMobile(
                                  order
                                )}
                              </div>

                            )}

                          </td>

                          <td
                            style={{
                              maxWidth:
                                "230px",
                            }}
                          >
                            {getProductName(
                              order
                            )}
                          </td>

                          <td>
                            {getSellerName(
                              order
                            )}
                          </td>

                          <td>

                            <strong>
                              ₹
                              {getAmount(
                                order
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                          </td>

                          <td>

                            <strong
                              style={{
                                color:
                                  "#2563eb",
                              }}
                            >
                              ₹
                              {commission.toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                            <div
                              style={{
                                fontSize:
                                  "11px",
                                color:
                                  "#64748b",
                                marginTop:
                                  "4px",
                              }}
                            >
                              {rate}%
                            </div>

                          </td>

                          <td>

                            <OrderStatus
                              status={
                                order.status ||
                                "New Order"
                              }
                            />

                          </td>

                          <td>

                            {order.settlementStatus ===
                            "Settled" ? (

                              <strong
                                style={{
                                  color:
                                    "#15803d",
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                ✅ Settled
                              </strong>

                            ) : (

                              <strong
                                style={{
                                  color:
                                    "#d97706",
                                  whiteSpace:
                                    "nowrap",
                                }}
                              >
                                ⏳ Pending
                              </strong>

                            )}

                          </td>

                        </tr>
                      );
                    }
                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* =========================
            FINANCIAL SUMMARY
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>

              <h2>
                Financial Summary
              </h2>

              <p>
                Live commission and seller settlement summary.
              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/admin/commission"
                )
              }
              style={
                commissionButton
              }
            >
              Manage Commission →
            </button>

          </div>

          <div style={financialGrid}>

            <FinancialCard
              label="MARKETPLACE SALES"
              value={`₹${totalSales.toLocaleString(
                "en-IN"
              )}`}
            />

            <FinancialCard
              label="BIJLIKART EARNINGS"
              value={`₹${totalCommission.toLocaleString(
                "en-IN"
              )}`}
            />

            <FinancialCard
              label="SELLER PAYABLE"
              value={`₹${totalSellerPayable.toLocaleString(
                "en-IN"
              )}`}
            />

            <FinancialCard
              label="PENDING SETTLEMENT"
              value={`₹${pendingSettlement.toLocaleString(
                "en-IN"
              )}`}
            />

          </div>

        </section>

      </main>

    </div>
  );
}

// =================================
// DASHBOARD CARD
// =================================

function DashboardCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="stat-card">

      <span>
        {icon}
      </span>

      <p>
        {label}
      </p>

      <h2>
        {value}
      </h2>

    </div>
  );
}

// =================================
// OVERVIEW CARD
// =================================

function OverviewCard({
  icon,
  title,
  value,
}) {
  return (
    <div style={overviewCard}>

      <div
        style={{
          fontSize: "28px",
        }}
      >
        {icon}
      </div>

      <p
        style={{
          color: "#64748b",
          marginBottom: "7px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: 0,
          color: "#172033",
        }}
      >
        {value}
      </h2>

    </div>
  );
}

// =================================
// FINANCIAL CARD
// =================================

function FinancialCard({
  label,
  value,
}) {
  return (
    <div style={financialCard}>

      <span
        style={{
          color: "#64748b",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {label}
      </span>

      <h2
        style={{
          marginBottom: 0,
          color: "#172033",
        }}
      >
        {value}
      </h2>

    </div>
  );
}

// =================================
// ORDER STATUS
// =================================

function OrderStatus({ status }) {
  let color = "#d97706";
  let icon = "🟡";

  if (status === "Confirmed") {
    color = "#2563eb";
    icon = "🔵";
  }

  if (status === "Processing") {
    color = "#7c3aed";
    icon = "🟣";
  }

  if (
    status ===
    "Out for Delivery"
  ) {
    color = "#0891b2";
    icon = "🚚";
  }

  if (status === "Delivered") {
    color = "#15803d";
    icon = "🟢";
  }

  if (status === "Cancelled") {
    color = "#dc2626";
    icon = "🔴";
  }

  return (
    <strong
      style={{
        color,
        whiteSpace: "nowrap",
      }}
    >
      {icon} {status}
    </strong>
  );
}

// =================================
// STYLES
// =================================

const customerWebsiteButton = {
  width: "100%",
  padding: "11px",
  borderRadius: "8px",
  border: "1px solid #5faeff",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  marginBottom: "9px",
};

const logoutButton = {
  width: "100%",
  padding: "11px",
  borderRadius: "8px",
  border: "none",
  background: "#dc2626",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const refreshButton = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const reviewButton = {
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const commissionButton = {
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const overviewGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const overviewCard = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  padding: "20px",
  borderRadius: "10px",
};

const financialGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const financialCard = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  padding: "22px",
  borderRadius: "10px",
};

const emptyTableCell = {
  textAlign: "center",
  padding: "35px",
  color: "#64748b",
};

export default AdminDashboard;