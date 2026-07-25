import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // ================================
  // LOAD ORDERS
  // ================================

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("bijlikartOrders") || "[]"
      );

      setOrders(
        Array.isArray(savedOrders) ? savedOrders : []
      );
    } catch (error) {
      console.error("Order loading error:", error);
      setOrders([]);
    }
  }

  // ================================
  // UPDATE ORDER STATUS
  // ================================

  function updateOrderStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
          }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "bijlikartOrders",
      JSON.stringify(updatedOrders)
    );
  }

  // ================================
  // OWNER LOGOUT
  // ================================

  function logoutOwner() {
    const confirmed = window.confirm(
      "Logout from Owner Panel?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("bijlikartAdminAuth");
    localStorage.removeItem("bijlikartAdminRole");

    navigate("/admin-login", {
      replace: true,
    });
  }

  // ================================
  // GET AMOUNT AS NUMBER
  // ================================

  function getAmountNumber(amount) {
    const number = Number(
      String(amount || 0)
        .replace("₹", "")
        .replace(/,/g, "")
        .trim()
    );

    return Number.isNaN(number) ? 0 : number;
  }

  // ================================
  // TOTAL ORDER VALUE
  // ================================

  const totalSales = orders.reduce(
    (total, order) => {
      const amount =
        order.total !== undefined
          ? order.total
          : order.amount;

      return total + getAmountNumber(amount);
    },
    0
  );

  // ================================
  // PENDING ORDERS
  // ================================

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "New Order" ||
      order.status === "Pending"
  ).length;

  // ================================
  // DELIVERED ORDERS
  // ================================

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // ================================
  // UI
  // ================================

  return (
    <div className="admin-layout">

      {/* ============================
          SIDEBAR
      ============================ */}

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
          <h2>⚡ BIJLIKART</h2>
          <p>Owner Panel</p>
        </div>

        <div className="admin-menu">

          <button
            onClick={() => navigate("/admin")}
          >
            📊 Dashboard
          </button>

          <button
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
            className="active"
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
              navigate("/admin/team")
            }
          >
            👨‍💼 Team & Permissions
          </button>

          <button
            onClick={() =>
              navigate("/admin/settings")
            }
          >
            ⚙️ Settings
          </button>

        </div>

        {/* SIDEBAR BOTTOM */}

        <div
          style={{
            marginTop: "auto",
            paddingTop: "30px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={customerButtonStyle}
          >
            ← Customer Website
          </button>

          <button
            onClick={logoutOwner}
            style={logoutButtonStyle}
          >
            🚪 Owner Logout
          </button>
        </div>

      </aside>

      {/* ============================
          MAIN CONTENT
      ============================ */}

      <main className="admin-main">

        {/* HEADER */}

        <div className="admin-header">

          <div>
            <h1>Order Management</h1>

            <p>
              View and manage all BIJLIKART marketplace
              orders.
            </p>
          </div>

          <div className="admin-badge">
            👑 Owner Panel
          </div>

        </div>

        {/* ============================
            STATS
        ============================ */}

        <div className="admin-stats">

          <div className="stat-card">
            <span>🛒</span>

            <p>Total Orders</p>

            <h2>{orders.length}</h2>
          </div>

          <div className="stat-card">
            <span>🆕</span>

            <p>New / Pending</p>

            <h2>{pendingOrders}</h2>
          </div>

          <div className="stat-card">
            <span>✅</span>

            <p>Delivered</p>

            <h2>{deliveredOrders}</h2>
          </div>

          <div className="stat-card">
            <span>💰</span>

            <p>Order Value</p>

            <h2>
              ₹{totalSales.toLocaleString("en-IN")}
            </h2>
          </div>

        </div>

        {/* ============================
            ORDER SECTION
        ============================ */}

        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>Marketplace Orders</h2>

              <p>
                Orders placed by BIJLIKART customers
                will appear here.
              </p>
            </div>

            <button
              onClick={loadOrders}
              style={refreshButtonStyle}
            >
              🔄 Refresh Orders
            </button>

          </div>

          {/* NO ORDERS */}

          {orders.length === 0 ? (

            <div style={emptyStyle}>

              <div
                style={{
                  fontSize: "55px",
                }}
              >
                🛒
              </div>

              <h2>No Orders Yet</h2>

              <p>
                Place a demo order from the customer
                website and it will appear here.
              </p>

              <button
                onClick={() => navigate("/")}
                style={shopButtonStyle}
              >
                Open Customer Website →
              </button>

            </div>

          ) : (

            /* ============================
                ORDER TABLE
            ============================ */

            <div
              className="table-wrapper"
              style={{
                overflowX: "auto",
              }}
            >

              <table>

                <thead>

                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Mobile</th>
                    <th>Products</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Manage</th>
                  </tr>

                </thead>

                <tbody>

                  {orders.map((order, index) => {

                    // ========================
                    // CUSTOMER NAME
                    // ========================

                    let customerName = "Customer";

                    if (
                      typeof order.customer === "string" &&
                      order.customer.trim()
                    ) {
                      customerName =
                        order.customer;
                    } else if (
                      order.customerName
                    ) {
                      customerName =
                        order.customerName;
                    } else if (
                      order.customer &&
                      typeof order.customer === "object" &&
                      order.customer.name
                    ) {
                      customerName =
                        order.customer.name;
                    } else if (order.name) {
                      customerName =
                        order.name;
                    }

                    // ========================
                    // MOBILE NUMBER
                    // ========================

                    let customerMobile = "—";

                    if (order.phone) {
                      customerMobile =
                        order.phone;
                    } else if (order.mobile) {
                      customerMobile =
                        order.mobile;
                    } else if (
                      order.customer &&
                      typeof order.customer === "object"
                    ) {
                      customerMobile =
                        order.customer.phone ||
                        order.customer.mobile ||
                        "—";
                    }

                    // ========================
                    // PRODUCT NAME
                    // ========================

                    let productNames =
                      "Order Products";

                    if (
                      Array.isArray(order.items) &&
                      order.items.length > 0
                    ) {
                      productNames =
                        order.items
                          .map(
                            (item) =>
                              item.name ||
                              item.product ||
                              "Product"
                          )
                          .join(", ");
                    } else if (order.product) {
                      productNames =
                        order.product;
                    }

                    // ========================
                    // QUANTITY
                    // ========================

                    let quantity =
                      order.quantity || 1;

                    if (
                      Array.isArray(order.items) &&
                      order.items.length > 0
                    ) {
                      quantity =
                        order.items.reduce(
                          (total, item) =>
                            total +
                            Number(
                              item.quantity || 1
                            ),
                          0
                        );
                    }

                    // ========================
                    // AMOUNT
                    // ========================

                    const amount =
                      order.total !== undefined
                        ? order.total
                        : order.amount || 0;

                    const numericAmount =
                      getAmountNumber(amount);

                    // ========================
                    // PAYMENT
                    // ========================

                    const paymentMethod =
                      order.payment ||
                      order.paymentMethod ||
                      "Cash on Delivery";

                    // ========================
                    // STATUS
                    // ========================

                    const currentStatus =
                      order.status ||
                      "New Order";

                    return (

                      <tr
                        key={
                          order.id ||
                          `order-${index}`
                        }
                      >

                        {/* ORDER ID */}

                        <td>
                          <strong>
                            {order.id ||
                              `BK${1000 + index}`}
                          </strong>
                        </td>

                        {/* CUSTOMER NAME */}

                        <td>
                          <strong>
                            {customerName}
                          </strong>
                        </td>

                        {/* MOBILE */}

                        <td>
                          {customerMobile}
                        </td>

                        {/* PRODUCT */}

                        <td
                          style={{
                            maxWidth: "250px",
                          }}
                        >
                          {productNames}
                        </td>

                        {/* QUANTITY */}

                        <td>
                          {quantity}
                        </td>

                        {/* AMOUNT */}

                        <td>
                          <strong>
                            ₹
                            {numericAmount.toLocaleString(
                              "en-IN"
                            )}
                          </strong>
                        </td>

                        {/* PAYMENT */}

                        <td>
                          {paymentMethod}
                        </td>

                        {/* STATUS */}

                        <td>
                          <OrderStatus
                            status={currentStatus}
                          />
                        </td>

                        {/* MANAGE */}

                        <td>

                          <select
                            value={currentStatus}
                            onChange={(e) =>
                              updateOrderStatus(
                                order.id,
                                e.target.value
                              )
                            }
                            style={selectStyle}
                          >

                            <option value="New Order">
                              New Order
                            </option>

                            <option value="Confirmed">
                              Confirmed
                            </option>

                            <option value="Processing">
                              Processing
                            </option>

                            <option value="Out for Delivery">
                              Out for Delivery
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

/* =================================
   ORDER STATUS COMPONENT
================================= */

function OrderStatus({ status }) {

  let color = "#2563eb";
  let icon = "🔵";

  if (
    status === "New Order" ||
    status === "Pending"
  ) {
    color = "#d97706";
    icon = "🟡";
  }

  if (status === "Confirmed") {
    color = "#2563eb";
    icon = "🔵";
  }

  if (status === "Processing") {
    color = "#7c3aed";
    icon = "🟣";
  }

  if (status === "Out for Delivery") {
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

/* =================================
   STYLES
================================= */

const customerButtonStyle = {
  width: "100%",
  padding: "11px",
  borderRadius: "8px",
  border: "1px solid #5faeff",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  marginBottom: "9px",
};

const logoutButtonStyle = {
  width: "100%",
  padding: "11px",
  borderRadius: "8px",
  border: "none",
  background: "#dc2626",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const refreshButtonStyle = {
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const shopButtonStyle = {
  marginTop: "10px",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const selectStyle = {
  padding: "9px",
  borderRadius: "7px",
  border: "1px solid #d1d5db",
  background: "white",
  cursor: "pointer",
};

const emptyStyle = {
  textAlign: "center",
  padding: "60px 20px",
  color: "#64748b",
};

export default AdminOrders;