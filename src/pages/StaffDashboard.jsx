import { useNavigate } from "react-router-dom";

function StaffDashboard() {
  const navigate = useNavigate();

  const staffName =
    localStorage.getItem("bijlikartStaffName") || "Employee";

  const staffRole =
    localStorage.getItem("bijlikartStaffRole") || "";

  function handleLogout() {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    localStorage.removeItem("bijlikartStaffAuth");
    localStorage.removeItem("bijlikartStaffRole");
    localStorage.removeItem("bijlikartStaffName");

    navigate("/staff-login", {
      replace: true,
    });
  }

  function getRoleName() {
    if (staffRole === "operations") {
      return "Operations Staff";
    }

    if (staffRole === "products") {
      return "Product Staff";
    }

    if (staffRole === "support") {
      return "Support Staff";
    }

    return "BIJLIKART Staff";
  }

  const canAccessSellers =
    staffRole === "operations";

  const canAccessProducts =
    staffRole === "products";

  const canAccessOrders =
    staffRole === "operations" ||
    staffRole === "support";

  const canAccessCustomers =
    staffRole === "support";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background: "#123b7a",
          color: "white",
          padding: "18px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
            }}
          >
            ⚡ BIJLIKART
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              opacity: 0.8,
            }}
          >
            Staff Management Panel
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              textAlign: "right",
            }}
          >
            <strong>{staffName}</strong>

            <div
              style={{
                fontSize: "13px",
                opacity: 0.8,
                marginTop: "3px",
              }}
            >
              {getRoleName()}
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              border: "none",
              background: "#dc2626",
              color: "white",
              padding: "10px 16px",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* MAIN */}

      <main
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "35px 25px",
        }}
      >
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              marginBottom: "7px",
            }}
          >
            Welcome, {staffName}
          </h1>

          <p
            style={{
              color: "#6b7280",
              margin: 0,
            }}
          >
            You can only access the sections assigned
            to your employee role.
          </p>
        </div>

        {/* ROLE BOX */}

        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "30px",
          }}
        >
          <strong>👨‍💼 Your Role: {getRoleName()}</strong>

          <p
            style={{
              color: "#475569",
              marginBottom: 0,
            }}
          >
            Owner-only financial, commission, team and
            security controls are restricted.
          </p>
        </div>

        {/* AVAILABLE SECTIONS */}

        <h2>Your Work Areas</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {canAccessSellers && (
            <StaffCard
              icon="🏪"
              title="Sellers"
              description="Review and manage seller requests."
              onClick={() =>
                navigate("/staff/sellers")
              }
            />
          )}

          {canAccessProducts && (
            <StaffCard
              icon="📦"
              title="Products"
              description="Manage marketplace products."
              onClick={() =>
                navigate("/staff/products")
              }
            />
          )}

          {canAccessOrders && (
            <StaffCard
              icon="🛒"
              title="Orders"
              description="View and manage customer orders."
              onClick={() =>
                navigate("/staff/orders")
              }
            />
          )}

          {canAccessCustomers && (
            <StaffCard
              icon="👥"
              title="Customers"
              description="Handle customer support and accounts."
              onClick={() =>
                navigate("/staff/customers")
              }
            />
          )}
        </div>

        {/* OWNER-ONLY AREA */}

        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "25px",
            borderRadius: "14px",
            boxShadow:
              "0 3px 15px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
            }}
          >
            🔒 Restricted Owner Controls
          </h2>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            The following areas cannot be accessed
            from a Staff account:
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <RestrictedBadge text="💰 Commission" />

            <RestrictedBadge text="💳 Settlements" />

            <RestrictedBadge text="👨‍💼 Team & Permissions" />

            <RestrictedBadge text="⚙️ Owner Settings" />

            <RestrictedBadge text="📊 Sensitive Financial Reports" />
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "30px",
            border: "none",
            background: "transparent",
            color: "#2563eb",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          ← Customer Website
        </button>
      </main>
    </div>
  );
}

function StaffCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "14px",
        boxShadow:
          "0 3px 15px rgba(0,0,0,0.07)",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          fontSize: "35px",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#6b7280",
          marginBottom: 0,
          lineHeight: "1.5",
        }}
      >
        {description}
      </p>
    </div>
  );
}

function RestrictedBadge({ text }) {
  return (
    <span
      style={{
        background: "#fee2e2",
        color: "#991b1b",
        padding: "9px 13px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      🔒 {text}
    </span>
  );
}

export default StaffDashboard;