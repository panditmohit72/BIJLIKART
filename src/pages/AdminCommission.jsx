import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminCommission() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [defaultCommission, setDefaultCommission] =
    useState(() => {
      const savedRate = localStorage.getItem(
        "bijlikartDefaultCommission"
      );

      return savedRate ? Number(savedRate) : 10;
    });

  const [newDefaultCommission, setNewDefaultCommission] =
    useState(defaultCommission);

  const [commissionInputs, setCommissionInputs] =
    useState({});

  useEffect(() => {
    loadOrders();
  }, []);

  /* =================================
     LOAD ORDERS
  ================================= */

  function loadOrders() {
    const savedOrders = JSON.parse(
      localStorage.getItem("bijlikartOrders") || "[]"
    );

    const normalizedOrders = savedOrders.map(
      (order, index) => ({
        ...order,

        id:
          order.id ||
          `BKORDER${1001 + index}`,

        commissionRate:
          order.commissionRate !== undefined
            ? Number(order.commissionRate)
            : defaultCommission,

        settlementStatus:
          order.settlementStatus || "Pending",
      })
    );

    setOrders(normalizedOrders);

    const inputs = {};

    normalizedOrders.forEach((order) => {
      inputs[order.id] =
        order.commissionRate;
    });

    setCommissionInputs(inputs);
  }

  /* =================================
     PRICE / AMOUNT
  ================================= */

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

    const cleanedAmount = Number(
      String(rawAmount)
        .replace("₹", "")
        .replace(/,/g, "")
        .trim()
    );

    return Number.isNaN(cleanedAmount)
      ? 0
      : cleanedAmount;
  }

  /* =================================
     COMMISSION CALCULATION
  ================================= */

  function getCommission(amount, rate) {
    return Math.round(
      (amount * Number(rate || 0)) / 100
    );
  }

  function getSellerAmount(amount, rate) {
    return (
      amount -
      getCommission(amount, rate)
    );
  }

  /* =================================
     SAVE ORDERS
  ================================= */

  function saveOrders(updatedOrders) {
    setOrders(updatedOrders);

    localStorage.setItem(
      "bijlikartOrders",
      JSON.stringify(updatedOrders)
    );
  }

  /* =================================
     DEFAULT COMMISSION
  ================================= */

  function saveDefaultCommission() {
    const rate = Number(
      newDefaultCommission
    );

    if (
      Number.isNaN(rate) ||
      rate < 0 ||
      rate > 100
    ) {
      alert(
        "Commission must be between 0% and 100%."
      );

      return;
    }

    setDefaultCommission(rate);

    localStorage.setItem(
      "bijlikartDefaultCommission",
      String(rate)
    );

    alert(
      `Default commission set to ${rate}%. New orders can use this rate.`
    );
  }

  /* =================================
     ORDER COMMISSION INPUT
  ================================= */

  function changeCommissionInput(
    orderId,
    value
  ) {
    setCommissionInputs((old) => ({
      ...old,
      [orderId]: value,
    }));
  }

  /* =================================
     APPLY ORDER COMMISSION
  ================================= */

  function applyOrderCommission(orderId) {
    const rate = Number(
      commissionInputs[orderId]
    );

    if (
      Number.isNaN(rate) ||
      rate < 0 ||
      rate > 100
    ) {
      alert(
        "Commission must be between 0% and 100%."
      );

      return;
    }

    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              commissionRate: rate,
            }
          : order
    );

    saveOrders(updatedOrders);

    alert(
      `Commission updated to ${rate}% for ${orderId}.`
    );
  }

  /* =================================
     USE DEFAULT RATE
  ================================= */

  function useDefaultRate(orderId) {
    setCommissionInputs((old) => ({
      ...old,
      [orderId]: defaultCommission,
    }));

    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              commissionRate:
                defaultCommission,
            }
          : order
    );

    saveOrders(updatedOrders);
  }

  /* =================================
     SETTLEMENT
  ================================= */

  function markSettled(orderId) {
    const confirmed = window.confirm(
      "Mark this seller payment as settled?"
    );

    if (!confirmed) {
      return;
    }

    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              settlementStatus:
                "Settled",
              settledAt:
                new Date().toLocaleString(
                  "en-IN"
                ),
            }
          : order
    );

    saveOrders(updatedOrders);
  }

  function markPending(orderId) {
    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              settlementStatus:
                "Pending",
              settledAt: null,
            }
          : order
    );

    saveOrders(updatedOrders);
  }

  /* =================================
     LOGOUT
  ================================= */

  function logoutOwner() {
    const confirmed = window.confirm(
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

  /* =================================
     TOTALS
  ================================= */

  const totalSales = orders.reduce(
    (total, order) =>
      total + getAmount(order),
    0
  );

  const totalCommission =
    orders.reduce((total, order) => {
      const amount = getAmount(order);

      const rate =
        order.commissionRate ??
        defaultCommission;

      return (
        total +
        getCommission(amount, rate)
      );
    }, 0);

  const totalSellerPayable =
    orders.reduce((total, order) => {
      const amount = getAmount(order);

      const rate =
        order.commissionRate ??
        defaultCommission;

      return (
        total +
        getSellerAmount(
          amount,
          rate
        )
      );
    }, 0);

  const settledAmount =
    orders.reduce((total, order) => {
      if (
        order.settlementStatus !==
        "Settled"
      ) {
        return total;
      }

      const amount = getAmount(order);

      const rate =
        order.commissionRate ??
        defaultCommission;

      return (
        total +
        getSellerAmount(
          amount,
          rate
        )
      );
    }, 0);

  const pendingSettlement =
    totalSellerPayable -
    settledAmount;

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
          <h2>⚡ BIJLIKART</h2>

          <p>Owner Panel</p>
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
            className="active"
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
              Commission & Settlements
            </h1>

            <p>
              Control BIJLIKART
              commission and seller
              payouts.
            </p>
          </div>

          <div className="admin-badge">
            👑 Owner Only
          </div>

        </div>

        {/* SECURITY */}

        <div style={securityBox}>

          <strong>
            🔐 Owner Protected Financial
            Controls
          </strong>

          <p
            style={{
              margin:
                "7px 0 0",
            }}
          >
            Only the owner can change
            marketplace commission rates
            and seller settlements.
          </p>

        </div>

        {/* =========================
            STATS
        ========================= */}

        <div className="admin-stats">

          <div className="stat-card">

            <span>💳</span>

            <p>
              Marketplace Sales
            </p>

            <h2>
              ₹
              {totalSales.toLocaleString(
                "en-IN"
              )}
            </h2>

          </div>

          <div className="stat-card">

            <span>💰</span>

            <p>
              BIJLIKART Earnings
            </p>

            <h2>
              ₹
              {totalCommission.toLocaleString(
                "en-IN"
              )}
            </h2>

          </div>

          <div className="stat-card">

            <span>🏪</span>

            <p>
              Seller Payable
            </p>

            <h2>
              ₹
              {totalSellerPayable.toLocaleString(
                "en-IN"
              )}
            </h2>

          </div>

          <div className="stat-card">

            <span>⏳</span>

            <p>
              Pending Settlement
            </p>

            <h2>
              ₹
              {Math.max(
                pendingSettlement,
                0
              ).toLocaleString(
                "en-IN"
              )}
            </h2>

          </div>

        </div>

        {/* =========================
            DEFAULT COMMISSION
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>
                Default Commission
              </h2>

              <p>
                Set the standard
                commission rate for new
                marketplace orders.
              </p>
            </div>

          </div>

          <div style={defaultBox}>

            <div>

              <span style={smallLabel}>
                CURRENT DEFAULT RATE
              </span>

              <h1
                style={{
                  margin:
                    "6px 0",
                  color: "#2563eb",
                }}
              >
                {defaultCommission}%
              </h1>

              <p
                style={{
                  color: "#64748b",
                  margin: 0,
                }}
              >
                Existing order rates
                remain independently
                editable.
              </p>

            </div>

            <div style={rateControl}>

              <div>

                <label style={labelStyle}>
                  New Default Commission
                </label>

                <div style={inputGroup}>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={
                      newDefaultCommission
                    }
                    onChange={(e) =>
                      setNewDefaultCommission(
                        e.target.value
                      )
                    }
                    style={
                      commissionInput
                    }
                  />

                  <span>%</span>

                </div>

              </div>

              <button
                onClick={
                  saveDefaultCommission
                }
                style={
                  saveDefaultButton
                }
              >
                Save Default Rate
              </button>

            </div>

          </div>

        </section>

        {/* =========================
            ORDER COMMISSION
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>

              <h2>
                Order-wise Commission
              </h2>

              <p>
                Set a different
                commission percentage
                for individual orders.
              </p>

            </div>

            <button
              onClick={loadOrders}
              style={refreshButton}
            >
              🔄 Refresh Orders
            </button>

          </div>

          {orders.length === 0 ? (

            <div style={emptyBox}>

              <div
                style={{
                  fontSize: "55px",
                }}
              >
                🛒
              </div>

              <h2>
                No Orders Yet
              </h2>

              <p>
                Customer orders will
                appear here automatically
                after checkout.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/admin/orders"
                  )
                }
                style={
                  primaryButton
                }
              >
                Go to Orders →
              </button>

            </div>

          ) : (

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

                    <th>Order Amount</th>

                    <th>
                      Commission %
                    </th>

                    <th>
                      BIJLIKART Earns
                    </th>

                    <th>
                      Seller Gets
                    </th>

                    <th>
                      Settlement
                    </th>

                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {orders.map(
                    (
                      order,
                      index
                    ) => {
                      const amount =
                        getAmount(
                          order
                        );

                      const rate =
                        order.commissionRate ??
                        defaultCommission;

                      const commission =
                        getCommission(
                          amount,
                          rate
                        );

                      const sellerAmount =
                        getSellerAmount(
                          amount,
                          rate
                        );

                      const status =
                        order.settlementStatus ||
                        "Pending";

                      return (

                        <tr
                          key={
                            order.id ||
                            index
                          }
                        >

                          {/* ORDER ID */}

                          <td>

                            <strong>
                              {order.id}
                            </strong>

                          </td>

                          {/* CUSTOMER */}

                          <td>

                            <strong>
                              {order.customerName ||
                                order
                                  .customer
                                  ?.name ||
                                order.name ||
                                "Customer"}
                            </strong>

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
                              {order.mobile ||
                                order
                                  .customer
                                  ?.mobile ||
                                ""}
                            </div>

                          </td>

                          {/* ORDER VALUE */}

                          <td>

                            <strong>
                              ₹
                              {amount.toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                          </td>

                          {/* COMMISSION CONTROL */}

                          <td>

                            <div
                              style={{
                                display:
                                  "flex",
                                gap: "6px",
                                alignItems:
                                  "center",
                              }}
                            >

                              <input
                                type="number"
                                min="0"
                                max="100"
                                step="0.1"
                                value={
                                  commissionInputs[
                                    order.id
                                  ] ??
                                  rate
                                }
                                onChange={(
                                  e
                                ) =>
                                  changeCommissionInput(
                                    order.id,
                                    e.target
                                      .value
                                  )
                                }
                                style={{
                                  width:
                                    "70px",
                                  padding:
                                    "8px",
                                  border:
                                    "1px solid #d1d5db",
                                  borderRadius:
                                    "6px",
                                }}
                              />

                              <strong>
                                %
                              </strong>

                            </div>

                          </td>

                          {/* BIJLIKART */}

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

                          </td>

                          {/* SELLER */}

                          <td>

                            <strong
                              style={{
                                color:
                                  "#15803d",
                              }}
                            >
                              ₹
                              {sellerAmount.toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                          </td>

                          {/* SETTLEMENT */}

                          <td>

                            {status ===
                            "Settled" ? (

                              <strong
                                style={{
                                  color:
                                    "#15803d",
                                }}
                              >
                                ✅ Settled
                              </strong>

                            ) : (

                              <strong
                                style={{
                                  color:
                                    "#d97706",
                                }}
                              >
                                ⏳ Pending
                              </strong>

                            )}

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div
                              style={{
                                display:
                                  "flex",
                                flexDirection:
                                  "column",
                                gap: "6px",
                                minWidth:
                                  "130px",
                              }}
                            >

                              <button
                                onClick={() =>
                                  applyOrderCommission(
                                    order.id
                                  )
                                }
                                style={
                                  applyButton
                                }
                              >
                                ✓ Apply Rate
                              </button>

                              <button
                                onClick={() =>
                                  useDefaultRate(
                                    order.id
                                  )
                                }
                                style={
                                  defaultButton
                                }
                              >
                                Use Default
                              </button>

                              {status ===
                              "Settled" ? (

                                <button
                                  onClick={() =>
                                    markPending(
                                      order.id
                                    )
                                  }
                                  style={
                                    pendingButton
                                  }
                                >
                                  Mark Pending
                                </button>

                              ) : (

                                <button
                                  onClick={() =>
                                    markSettled(
                                      order.id
                                    )
                                  }
                                  style={
                                    settleButton
                                  }
                                >
                                  Mark Settled
                                </button>

                              )}

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* =========================
            EXAMPLE
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>
                How Commission Works
              </h2>

              <p>
                Example of BIJLIKART
                marketplace settlement.
              </p>
            </div>

          </div>

          <div style={exampleGrid}>

            <div style={exampleCard}>
              <span style={smallLabel}>
                ORDER VALUE
              </span>

              <h2>₹50,000</h2>
            </div>

            <div style={exampleCard}>
              <span style={smallLabel}>
                COMMISSION
              </span>

              <h2>
                {defaultCommission}%
              </h2>
            </div>

            <div style={exampleCard}>
              <span style={smallLabel}>
                BIJLIKART EARNS
              </span>

              <h2>
                ₹
                {getCommission(
                  50000,
                  defaultCommission
                ).toLocaleString(
                  "en-IN"
                )}
              </h2>
            </div>

            <div style={exampleCard}>
              <span style={smallLabel}>
                SELLER GETS
              </span>

              <h2>
                ₹
                {getSellerAmount(
                  50000,
                  defaultCommission
                ).toLocaleString(
                  "en-IN"
                )}
              </h2>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

/* =================================
   STYLES
================================= */

const securityBox = {
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  color: "#7c2d12",
  padding: "18px",
  borderRadius: "12px",
  marginTop: "25px",
};

const defaultBox = {
  marginTop: "20px",
  padding: "25px",
  borderRadius: "12px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "30px",
  alignItems: "center",
};

const rateControl = {
  display: "flex",
  gap: "15px",
  alignItems: "end",
  flexWrap: "wrap",
};

const inputGroup = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const commissionInput = {
  width: "120px",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "16px",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "7px",
  color: "#334155",
};

const smallLabel = {
  display: "block",
  fontSize: "11px",
  color: "#94a3b8",
  fontWeight: "bold",
};

const saveDefaultButton = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
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

const applyButton = {
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const defaultButton = {
  padding: "8px",
  border: "1px solid #2563eb",
  borderRadius: "6px",
  background: "white",
  color: "#2563eb",
  cursor: "pointer",
};

const settleButton = {
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  background: "#16a34a",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const pendingButton = {
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  background: "#f59e0b",
  color: "white",
  cursor: "pointer",
};

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

const emptyBox = {
  textAlign: "center",
  padding: "60px 20px",
  color: "#64748b",
};

const primaryButton = {
  marginTop: "10px",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const exampleGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const exampleCard = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  padding: "20px",
  borderRadius: "10px",
};

export default AdminCommission;