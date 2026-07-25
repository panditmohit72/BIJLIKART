import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminSettings() {
  const navigate = useNavigate();

  const defaultSettings = {
    marketplaceName: "BIJLIKART",
    supportMobile: "",
    supportEmail: "",
    serviceCity: "Mathura",
    minimumOrderAmount: 0,
    codEnabled: true,
    sellerRegistration: true,
    maintenanceMode: false,
    orderNotifications: true,
  };

  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = JSON.parse(
        localStorage.getItem("bijlikartSettings") || "null"
      );

      return savedSettings
        ? {
            ...defaultSettings,
            ...savedSettings,
          }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  /* =================================
     INPUT CHANGE
  ================================= */

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setSettings((oldSettings) => ({
      ...oldSettings,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSavedMessage("");
  }

  /* =================================
     SAVE SETTINGS
  ================================= */

  function saveSettings(e) {
    e.preventDefault();

    if (!settings.marketplaceName.trim()) {
      alert("Please enter marketplace name.");
      return;
    }

    if (
      settings.supportMobile &&
      !/^[6-9]\d{9}$/.test(settings.supportMobile)
    ) {
      alert("Please enter a valid 10-digit support mobile number.");
      return;
    }

    if (
      Number(settings.minimumOrderAmount) < 0
    ) {
      alert("Minimum order amount cannot be negative.");
      return;
    }

    const finalSettings = {
      ...settings,
      marketplaceName:
        settings.marketplaceName.trim(),

      supportEmail:
        settings.supportEmail.trim(),

      serviceCity:
        settings.serviceCity.trim(),

      minimumOrderAmount:
        Number(settings.minimumOrderAmount),
    };

    localStorage.setItem(
      "bijlikartSettings",
      JSON.stringify(finalSettings)
    );

    setSettings(finalSettings);

    setSavedMessage(
      "✓ Settings saved successfully."
    );

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  }

  /* =================================
     RESET SETTINGS
  ================================= */

  function resetSettings() {
    const confirmed = window.confirm(
      "Reset BIJLIKART settings to default values?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "bijlikartSettings"
    );

    setSettings(defaultSettings);

    setSavedMessage(
      "Settings reset to default."
    );
  }

  /* =================================
     CLEAR DEMO DATA
  ================================= */

  function clearDemoOrders() {
    const confirmed = window.confirm(
      "Delete all demo orders? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "bijlikartOrders"
    );

    alert("All demo orders have been deleted.");
  }

  function clearSellerApplication() {
    const confirmed = window.confirm(
      "Delete saved demo seller application?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "bijlikartSellerApplication"
    );

    alert(
      "Demo seller application deleted."
    );
  }

  /* =================================
     OWNER LOGOUT
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
            className="active"
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
              Marketplace Settings
            </h1>

            <p>
              Control BIJLIKART marketplace
              preferences and system features.
            </p>
          </div>

          <div className="admin-badge">
            👑 Owner Only
          </div>

        </div>

        {/* OWNER NOTICE */}

        <div style={securityNotice}>

          <strong>
            🔐 Owner Protected Settings
          </strong>

          <p
            style={{
              margin: "7px 0 0",
            }}
          >
            These settings control important
            marketplace features and should only
            be changed by the BIJLIKART owner.
          </p>

        </div>

        {/* SAVED MESSAGE */}

        {savedMessage && (
          <div style={successMessage}>
            {savedMessage}
          </div>
        )}

        <form onSubmit={saveSettings}>

          {/* =========================
              MARKETPLACE DETAILS
          ========================= */}

          <section className="admin-section">

            <div className="section-title">

              <div>
                <h2>
                  🏪 Marketplace Details
                </h2>

                <p>
                  Basic information about your
                  BIJLIKART marketplace.
                </p>
              </div>

            </div>

            <div style={formGrid}>

              <SettingInput
                label="Marketplace Name"
                name="marketplaceName"
                value={
                  settings.marketplaceName
                }
                onChange={handleChange}
                placeholder="BIJLIKART"
              />

              <SettingInput
                label="Service City"
                name="serviceCity"
                value={settings.serviceCity}
                onChange={handleChange}
                placeholder="Mathura"
              />

              <SettingInput
                label="Support Mobile Number"
                name="supportMobile"
                value={
                  settings.supportMobile
                }
                onChange={(e) => {
                  const value =
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                  setSettings((old) => ({
                    ...old,
                    supportMobile: value,
                  }));

                  setSavedMessage("");
                }}
                placeholder="10-digit mobile number"
              />

              <SettingInput
                label="Support Email"
                name="supportEmail"
                type="email"
                value={
                  settings.supportEmail
                }
                onChange={handleChange}
                placeholder="support@bijlikart.in"
              />

            </div>

          </section>

          {/* =========================
              ORDER SETTINGS
          ========================= */}

          <section className="admin-section">

            <div className="section-title">

              <div>
                <h2>
                  🛒 Order Settings
                </h2>

                <p>
                  Control customer ordering
                  options.
                </p>
              </div>

            </div>

            <div style={formGrid}>

              <div>

                <label style={labelStyle}>
                  Minimum Order Amount
                </label>

                <div style={moneyInput}>

                  <span>₹</span>

                  <input
                    type="number"
                    min="0"
                    name="minimumOrderAmount"
                    value={
                      settings.minimumOrderAmount
                    }
                    onChange={handleChange}
                    style={borderlessInput}
                  />

                </div>

                <small style={helpText}>
                  Set ₹0 if you do not want a
                  minimum order limit.
                </small>

              </div>

            </div>

            <div style={toggleGrid}>

              <ToggleCard
                icon="💵"
                title="Cash on Delivery"
                description="Allow customers to place Cash on Delivery orders."
                name="codEnabled"
                checked={
                  settings.codEnabled
                }
                onChange={handleChange}
              />

              <ToggleCard
                icon="🔔"
                title="Order Notifications"
                description="Enable marketplace order notifications."
                name="orderNotifications"
                checked={
                  settings.orderNotifications
                }
                onChange={handleChange}
              />

            </div>

          </section>

          {/* =========================
              SELLER SETTINGS
          ========================= */}

          <section className="admin-section">

            <div className="section-title">

              <div>
                <h2>
                  🏪 Seller Settings
                </h2>

                <p>
                  Control seller onboarding
                  options.
                </p>
              </div>

            </div>

            <div style={toggleGrid}>

              <ToggleCard
                icon="📝"
                title="Seller Registration"
                description="Allow new electronics shops to apply to sell on BIJLIKART."
                name="sellerRegistration"
                checked={
                  settings.sellerRegistration
                }
                onChange={handleChange}
              />

            </div>

          </section>

          {/* =========================
              SYSTEM SETTINGS
          ========================= */}

          <section className="admin-section">

            <div className="section-title">

              <div>
                <h2>
                  ⚙️ System Controls
                </h2>

                <p>
                  Important marketplace
                  operating controls.
                </p>
              </div>

            </div>

            <div style={toggleGrid}>

              <ToggleCard
                icon="🚧"
                title="Maintenance Mode"
                description="Temporarily mark the marketplace as under maintenance."
                name="maintenanceMode"
                checked={
                  settings.maintenanceMode
                }
                onChange={handleChange}
                danger
              />

            </div>

            {settings.maintenanceMode && (

              <div style={maintenanceWarning}>

                <strong>
                  ⚠️ Maintenance Mode Enabled
                </strong>

                <p
                  style={{
                    margin: "7px 0 0",
                  }}
                >
                  BIJLIKART is currently marked
                  for maintenance. Later we will
                  connect this setting directly
                  with the customer website.
                </p>

              </div>

            )}

          </section>

          {/* =========================
              SAVE BUTTONS
          ========================= */}

          <section className="admin-section">

            <div style={saveArea}>

              <div>

                <h2
                  style={{
                    margin: "0 0 6px",
                  }}
                >
                  Save Marketplace Settings
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                  }}
                >
                  Changes are saved locally in
                  this demo version.
                </p>

              </div>

              <div style={buttonGroup}>

                <button
                  type="button"
                  onClick={resetSettings}
                  style={resetButton}
                >
                  Reset Defaults
                </button>

                <button
                  type="submit"
                  style={saveButton}
                >
                  💾 Save Settings
                </button>

              </div>

            </div>

          </section>

        </form>

        {/* =========================
            DEMO DATA
        ========================= */}

        <section className="admin-section">

          <div className="section-title">

            <div>
              <h2>
                🧪 Demo Data Controls
              </h2>

              <p>
                Manage temporary testing data
                before production launch.
              </p>
            </div>

          </div>

          <div style={dangerGrid}>

            <div style={dangerCard}>

              <div>
                <h3>
                  Delete Demo Orders
                </h3>

                <p>
                  Remove all orders currently
                  stored in this browser.
                </p>
              </div>

              <button
                onClick={clearDemoOrders}
                style={dangerButton}
              >
                Delete Orders
              </button>

            </div>

            <div style={dangerCard}>

              <div>
                <h3>
                  Delete Seller Application
                </h3>

                <p>
                  Remove the saved demo seller
                  registration application.
                </p>
              </div>

              <button
                onClick={
                  clearSellerApplication
                }
                style={dangerButton}
              >
                Delete Application
              </button>

            </div>

          </div>

        </section>

        {/* =========================
            PRODUCTION NOTICE
        ========================= */}

        <div style={productionNotice}>

          <strong>
            🚀 Demo System
          </strong>

          <p
            style={{
              margin: "8px 0 0",
              lineHeight: "1.6",
            }}
          >
            These settings currently use
            browser localStorage. Before the
            public BIJLIKART launch, settings,
            orders, sellers, customers,
            commissions and permissions will
            need to be connected to a secure
            backend/database.
          </p>

        </div>

      </main>

    </div>
  );
}

/* =================================
   INPUT COMPONENT
================================= */

function SettingInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label style={labelStyle}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyle}
      />

    </div>
  );
}

/* =================================
   TOGGLE CARD
================================= */

function ToggleCard({
  icon,
  title,
  description,
  name,
  checked,
  onChange,
  danger = false,
}) {
  return (
    <label
      style={{
        ...toggleCard,

        border: checked
          ? danger
            ? "1px solid #fca5a5"
            : "1px solid #93c5fd"
          : "1px solid #e2e8f0",

        background: checked
          ? danger
            ? "#fef2f2"
            : "#eff6ff"
          : "#f8fafc",
      }}
    >

      <div style={toggleInfo}>

        <span
          style={{
            fontSize: "27px",
          }}
        >
          {icon}
        </span>

        <div>

          <strong
            style={{
              color: "#172033",
            }}
          >
            {title}
          </strong>

          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            {description}
          </p>

        </div>

      </div>

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
          flexShrink: 0,
        }}
      />

    </label>
  );
}

/* =================================
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

const securityNotice = {
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  color: "#7c2d12",
  padding: "18px",
  borderRadius: "12px",
  marginTop: "25px",
};

const successMessage = {
  background: "#f0fdf4",
  border: "1px solid #86efac",
  color: "#15803d",
  padding: "14px 18px",
  borderRadius: "10px",
  marginTop: "20px",
  fontWeight: "bold",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  color: "#334155",
  fontSize: "14px",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
  outline: "none",
  fontSize: "14px",
};

const moneyInput = {
  display: "flex",
  alignItems: "center",
  gap: "7px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  padding: "0 12px",
  background: "white",
};

const borderlessInput = {
  flex: 1,
  padding: "12px 0",
  border: "none",
  outline: "none",
  fontSize: "14px",
};

const helpText = {
  display: "block",
  marginTop: "7px",
  color: "#94a3b8",
};

const toggleGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const toggleCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
  borderRadius: "12px",
  cursor: "pointer",
};

const toggleInfo = {
  display: "flex",
  alignItems: "flex-start",
  gap: "13px",
};

const maintenanceWarning = {
  marginTop: "20px",
  padding: "17px",
  borderRadius: "10px",
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#991b1b",
};

const saveArea = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const buttonGroup = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const resetButton = {
  padding: "12px 18px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  background: "white",
  color: "#334155",
  cursor: "pointer",
  fontWeight: "bold",
};

const saveButton = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const dangerGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const dangerCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
  border: "1px solid #fecaca",
  borderRadius: "12px",
  background: "#fffafa",
};

const dangerButton = {
  border: "none",
  borderRadius: "7px",
  padding: "10px 14px",
  background: "#dc2626",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

const productionNotice = {
  margin: "25px 0 40px",
  padding: "20px",
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: "12px",
  color: "#1e40af",
};

export default AdminSettings;