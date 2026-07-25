import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminCustomers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  /* ================================
     AMOUNT
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

    const amount = Number(
      String(rawAmount)
        .replace("₹", "")
        .replace(/,/g, "")
        .trim()
    );

    return Number.isNaN(amount) ? 0 : amount;
  }

  /* ================================
     LOAD CUSTOMERS FROM ORDERS
  ================================= */

  function loadCustomers() {
    const savedOrders = JSON.parse(
      localStorage.getItem("bijlikartOrders") || "[]"
    );

    const customerMap = {};

    savedOrders.forEach((order, index) => {
      const name =
        order.customerName ||
        order.customer?.name ||
        order.name ||
        "Customer";

      const mobile =
        order.mobile ||
        order.customer?.mobile ||
        order.phone ||
        "Not Available";

      const address =
        order.address ||
        order.customer?.address ||
        order.deliveryAddress ||
        "Not Available";

      const city =
        order.city ||
        order.customer?.city ||
        "Mathura";

      const pincode =
        order.pincode ||
        order.customer?.pincode ||
        "";

      const amount = getAmount(order);

      /*
        Mobile is used as primary demo customer ID.
        If mobile is missing, name is used.
      */

      const customerKey =
        mobile !== "Not Available"
          ? mobile
          : `${name}-${index}`;

      if (!customerMap[customerKey]) {
        customerMap[customerKey] = {
          id:
            "BKC" +
            String(
              Object.keys(customerMap).length + 1
            ).padStart(4, "0"),

          name,
          mobile,
          address,
          city,
          pincode,

          totalOrders: 0,
          totalSpent: 0,

          status: "Active",

          orders: [],

          lastOrder:
            order.createdAt ||
            order.orderDate ||
            order.date ||
            order.placedAt ||
            "Recent",
        };
      }

      customerMap[customerKey].totalOrders += 1;

      customerMap[customerKey].totalSpent += amount;

      customerMap[customerKey].orders.push({
        ...order,
        amount,
      });

      customerMap[customerKey].lastOrder =
        order.createdAt ||
        order.orderDate ||
        order.date ||
        order.placedAt ||
        customerMap[customerKey].lastOrder;
    });

    const customerList =
      Object.values(customerMap);

    /*
      Restore manually disabled customers
    */

    const savedStatuses = JSON.parse(
      localStorage.getItem(
        "bijlikartCustomerStatuses"
      ) || "{}"
    );

    const finalCustomers =
      customerList.map((customer) => ({
        ...customer,
        status:
          savedStatuses[customer.mobile] ||
          "Active",
      }));

    setCustomers(finalCustomers);
  }

  /* ================================
     CUSTOMER STATUS
  ================================= */

  function toggleCustomerStatus(customer) {
    const newStatus =
      customer.status === "Active"
        ? "Blocked"
        : "Active";

    const updatedCustomers =
      customers.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      );

    setCustomers(updatedCustomers);

    const savedStatuses = JSON.parse(
      localStorage.getItem(
        "bijlikartCustomerStatuses"
      ) || "{}"
    );

    savedStatuses[customer.mobile] =
      newStatus;

    localStorage.setItem(
      "bijlikartCustomerStatuses",
      JSON.stringify(savedStatuses)
    );
  }

  /* ================================
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

  /* ================================
     STATS
  ================================= */

  const totalCustomers =
    customers.length;

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status === "Active"
    ).length;

  const blockedCustomers =
    customers.filter(
      (customer) =>
        customer.status === "Blocked"
    ).length;

  const totalCustomerOrders =
    customers.reduce(
      (total, customer) =>
        total + customer.totalOrders,
      0
    );

  const totalCustomerSpend =
    customers.reduce(
      (total, customer) =>
        total + customer.totalSpent,
      0
    );

  /* ================================
     SEARCH
  ================================= */

  const filteredCustomers =
    customers.filter((customer) => {
      const query =
        search.toLowerCase().trim();

      if (!query) {
        return true;
      }

      return (
        customer.name
          .toLowerCase()
          .includes(query) ||
        customer.mobile
          .toLowerCase()
          .includes(query) ||
        customer.id
          .toLowerCase()
          .includes(query) ||
        customer.city
          .toLowerCase()
          .includes(query)
      );
    });

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
            className="active"
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
            style={customerWebsiteButton}
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
              Customer Management
            </h1>

            <p>
              View customers and their
              BIJLIKART order activity.
            </p>
          </div>

          <div className="admin-badge">
            👑 Owner Panel
          </div>

        </div>

        {/* =========================
            STATS
        ========================= */}

        <div className="admin-stats">

          <div className="stat-card">
            <span>👥</span>

            <p>
              Total Customers
            </p>

            <h2>
              {totalCustomers}
            </h2>
          </div>

          <div className="stat-card">
            <span>✅</span>

            <p>
              Active Customers
            </p>

            <h2>
              {activeCustomers}
            </h2>
          </div>

          <div className="stat-card">
            <span>🛒</span>

            <p>
              Customer Orders
            </p>

            <h2>
              {totalCustomerOrders}
            </h2>
          </div>

          <div className="stat-card">
            <span>💳</span>

            <p>
              Customer Spend
            </p>

            <h2>
              ₹
              {totalCustomerSpend.toLocaleString(
                "en-IN"
              )}
            </h2>
          </div>

        </div>

        {/* =========================
            CUSTOMER TABLE
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>
                All Customers
              </h2>

              <p>
                Customers are created
                automatically from
                marketplace orders.
              </p>
            </div>

            <button
              onClick={loadCustomers}
              style={refreshButton}
            >
              🔄 Refresh
            </button>

          </div>

          {/* SEARCH */}

          <div style={searchBox}>

            <span
              style={{
                fontSize: "20px",
              }}
            >
              🔎
            </span>

            <input
              type="text"
              placeholder="Search customer by name, mobile, ID or city..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={searchInput}
            />

          </div>

          {customers.length === 0 ? (

            <div style={emptyBox}>

              <div
                style={{
                  fontSize: "60px",
                }}
              >
                👥
              </div>

              <h2>
                No Customers Yet
              </h2>

              <p>
                Customers will
                automatically appear
                here after they place
                orders on BIJLIKART.
              </p>

              <button
                onClick={() =>
                  navigate("/")
                }
                style={primaryButton}
              >
                Open Customer Website →
              </button>

            </div>

          ) : filteredCustomers.length === 0 ? (

            <div style={emptyBox}>
              <h2>
                No Customer Found
              </h2>

              <p>
                Try another name,
                mobile number or
                customer ID.
              </p>
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
                    <th>
                      Customer ID
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      City
                    </th>

                    <th>
                      Orders
                    </th>

                    <th>
                      Total Spent
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

                  {filteredCustomers.map(
                    (customer) => (

                      <tr
                        key={
                          customer.id
                        }
                      >

                        <td>
                          <strong>
                            {customer.id}
                          </strong>
                        </td>

                        <td>
                          <strong>
                            {customer.name}
                          </strong>
                        </td>

                        <td>
                          {customer.mobile}
                        </td>

                        <td>
                          📍 {customer.city}
                        </td>

                        <td>
                          <strong>
                            {
                              customer.totalOrders
                            }
                          </strong>
                        </td>

                        <td>
                          <strong>
                            ₹
                            {customer.totalSpent.toLocaleString(
                              "en-IN"
                            )}
                          </strong>
                        </td>

                        <td>

                          {customer.status ===
                          "Active" ? (

                            <strong
                              style={{
                                color:
                                  "#15803d",
                              }}
                            >
                              ● Active
                            </strong>

                          ) : (

                            <strong
                              style={{
                                color:
                                  "#dc2626",
                              }}
                            >
                              ● Blocked
                            </strong>

                          )}

                        </td>

                        <td>

                          <div
                            style={{
                              display: "flex",
                              gap: "7px",
                              flexWrap: "wrap",
                            }}
                          >

                            <button
                              onClick={() =>
                                setSelectedCustomer(
                                  customer
                                )
                              }
                              style={
                                viewButton
                              }
                            >
                              View
                            </button>

                            <button
                              onClick={() =>
                                toggleCustomerStatus(
                                  customer
                                )
                              }
                              style={{
                                ...statusButton,

                                background:
                                  customer.status ===
                                  "Active"
                                    ? "#dc2626"
                                    : "#16a34a",
                              }}
                            >
                              {customer.status ===
                              "Active"
                                ? "Block"
                                : "Activate"}
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

          {blockedCustomers > 0 && (
            <p
              style={{
                marginTop: "20px",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Blocked customers:{" "}
              <strong>
                {blockedCustomers}
              </strong>
            </p>
          )}

        </section>

        {/* =========================
            CUSTOMER DETAILS
        ========================= */}

        {selectedCustomer && (

          <section className="admin-section">

            <div className="section-title">

              <div>
                <h2>
                  Customer Details
                </h2>

                <p>
                  Complete customer and
                  order information.
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedCustomer(
                    null
                  )
                }
                style={closeButton}
              >
                ✕ Close
              </button>

            </div>

            <div style={detailsGrid}>

              <DetailCard
                label="CUSTOMER ID"
                value={
                  selectedCustomer.id
                }
              />

              <DetailCard
                label="NAME"
                value={
                  selectedCustomer.name
                }
              />

              <DetailCard
                label="MOBILE"
                value={
                  selectedCustomer.mobile
                }
              />

              <DetailCard
                label="CITY"
                value={
                  selectedCustomer.city
                }
              />

              <DetailCard
                label="TOTAL ORDERS"
                value={
                  selectedCustomer.totalOrders
                }
              />

              <DetailCard
                label="TOTAL SPENT"
                value={`₹${selectedCustomer.totalSpent.toLocaleString(
                  "en-IN"
                )}`}
              />

            </div>

            {/* ADDRESS */}

            <div style={addressBox}>

              <span style={smallLabel}>
                DELIVERY ADDRESS
              </span>

              <strong>
                {selectedCustomer.address}
              </strong>

              <p
                style={{
                  margin:
                    "6px 0 0",
                  color: "#64748b",
                }}
              >
                {selectedCustomer.city}

                {selectedCustomer.pincode
                  ? ` - ${selectedCustomer.pincode}`
                  : ""}
              </p>

            </div>

            {/* ORDER HISTORY */}

            <h3
              style={{
                marginTop: "30px",
              }}
            >
              🛒 Order History
            </h3>

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
                      Amount
                    </th>

                    <th>
                      Payment
                    </th>

                    <th>
                      Order Status
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {selectedCustomer.orders.map(
                    (order, index) => (

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
                          ₹
                          {order.amount.toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td>
                          {order.paymentMethod ||
                            order.payment ||
                            "Cash on Delivery"}
                        </td>

                        <td>
                          <OrderStatus
                            status={
                              order.status ||
                              "New Order"
                            }
                          />
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

/* ================================
   DETAIL CARD
================================= */

function DetailCard({
  label,
  value,
}) {
  return (
    <div style={detailCard}>

      <span style={smallLabel}>
        {label}
      </span>

      <strong
        style={{
          display: "block",
          marginTop: "6px",
          fontSize: "16px",
        }}
      >
        {value}
      </strong>

    </div>
  );
}

/* ================================
   ORDER STATUS
================================= */

function OrderStatus({ status }) {
  let color = "#2563eb";

  if (
    status === "New Order" ||
    status === "Pending"
  ) {
    color = "#d97706";
  }

  if (
    status === "Delivered"
  ) {
    color = "#15803d";
  }

  if (
    status === "Cancelled"
  ) {
    color = "#dc2626";
  }

  return (
    <strong style={{ color }}>
      {status}
    </strong>
  );
}

/* ================================
   STYLES
================================= */

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
  padding: "10px 16px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  margin: "20px 0",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "5px 14px",
};

const searchInput = {
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  padding: "12px 5px",
  fontSize: "15px",
};

const viewButton = {
  padding: "8px 13px",
  border: "none",
  borderRadius: "6px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const statusButton = {
  padding: "8px 13px",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const closeButton = {
  padding: "9px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "7px",
  background: "white",
  cursor: "pointer",
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

const detailsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const detailCard = {
  padding: "18px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
};

const smallLabel = {
  display: "block",
  fontSize: "11px",
  color: "#94a3b8",
  fontWeight: "bold",
};

const addressBox = {
  marginTop: "20px",
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  padding: "20px",
  borderRadius: "10px",
};

export default AdminCustomers;