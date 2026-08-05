import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerRegistration() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [submittedApplication, setSubmittedApplication] =
    useState(null);

  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    mobile: "",
    email: "",
    gstin: "",
    address: "",
    city: "Mathura",
    pincode: "",
    category: "",
    delivery: "seller",
    agree: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((oldData) => ({
      ...oldData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.shopName.trim()) {
      alert("Please enter your shop name.");
      return;
    }

    if (!formData.ownerName.trim()) {
      alert("Please enter owner name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.address.trim()) {
      alert("Please enter shop address.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    if (!formData.category) {
      alert("Please select your main product category.");
      return;
    }

    if (!formData.agree) {
      alert(
        "Please accept the BIJLIKART seller terms to continue."
      );
      return;
    }

    // Create unique seller/application ID
    const applicationId =
      "BKS" + Date.now().toString().slice(-7);

    const application = {
      id: applicationId,
      applicationId: applicationId,

      shop: formData.shopName.trim(),
      shopName: formData.shopName.trim(),

      owner: formData.ownerName.trim(),
      ownerName: formData.ownerName.trim(),

      mobile: formData.mobile,
      email: formData.email.trim(),
      gstin: formData.gstin.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      pincode: formData.pincode,
      category: formData.category,
      delivery: formData.delivery,

      status: "Pending",

      submittedAt: new Date().toLocaleString("en-IN"),
    };

    // ==========================================
    // SAVE APPLICATION IN SELLER APPLICATION LIST
    // ==========================================

    let oldApplications = [];

    try {
      oldApplications = JSON.parse(
        localStorage.getItem(
          "bijlikartSellerApplications"
        ) || "[]"
      );

      if (!Array.isArray(oldApplications)) {
        oldApplications = [];
      }
    } catch (error) {
      oldApplications = [];
    }

    const updatedApplications = [
      application,
      ...oldApplications,
    ];

    localStorage.setItem(
      "bijlikartSellerApplications",
      JSON.stringify(updatedApplications)
    );

    // Keep latest application separately too
    localStorage.setItem(
      "bijlikartSellerApplication",
      JSON.stringify(application)
    );

    setSubmittedApplication(application);
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ==========================================
  // SUCCESS PAGE
  // ==========================================

  if (submitted && submittedApplication) {
    return (
      <div style={pageStyle}>
        <header style={headerStyle}>
          <div
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <h2 style={{ margin: 0 }}>
              ⚡ BIJLIKART
            </h2>

            <small>
              Local Electronics Marketplace
            </small>
          </div>

          <button
            onClick={() => navigate("/")}
            style={headerButtonStyle}
          >
            Customer Website
          </button>
        </header>

        <main style={successWrapperStyle}>
          <div style={successCardStyle}>
            <div
              style={{
                fontSize: "70px",
                marginBottom: "10px",
              }}
            >
              ✅
            </div>

            <h1
              style={{
                color: "#172033",
                marginBottom: "10px",
              }}
            >
              Application Submitted!
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                lineHeight: "1.7",
              }}
            >
              Thank you for applying to sell on BIJLIKART.
              Your shop application has been sent for
              verification and approval.
            </p>

            <div style={applicationBoxStyle}>
              <div>
                <span style={smallLabelStyle}>
                  APPLICATION ID
                </span>

                <strong>
                  {submittedApplication.applicationId}
                </strong>
              </div>

              <div>
                <span style={smallLabelStyle}>
                  SHOP NAME
                </span>

                <strong>
                  {submittedApplication.shopName}
                </strong>
              </div>

              <div>
                <span style={smallLabelStyle}>
                  STATUS
                </span>

                <strong
                  style={{
                    color: "#d97706",
                  }}
                >
                  ⏳ Pending Approval
                </strong>
              </div>
            </div>

            <div style={nextStepsStyle}>
              <h3>What happens next?</h3>

              <p>
                1. BIJLIKART will review your shop details.
              </p>

              <p>
                2. Your shop and documents will be verified.
              </p>

              <p>
                3. After approval, your Seller Account will
                be activated.
              </p>

              <p>
                4. You can then add products, receive orders
                and manage your shop from the Seller
                Dashboard.
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              style={primaryButtonStyle}
            >
              ← Back to BIJLIKART
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // REGISTRATION PAGE
  // ==========================================

  return (
    <div style={pageStyle}>
      {/* HEADER */}

      <header style={headerStyle}>
        <div
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <h2 style={{ margin: 0 }}>
            ⚡ BIJLIKART
          </h2>

          <small>Seller Partner Program</small>
        </div>

        <button
          onClick={() => navigate("/")}
          style={headerButtonStyle}
        >
          ← Customer Website
        </button>
      </header>

      {/* HERO */}

      <section style={heroStyle}>
        <span style={{ fontSize: "45px" }}>
          🏪
        </span>

        <h1
          style={{
            margin: "12px 0 8px",
            fontSize: "36px",
          }}
        >
          Sell on BIJLIKART
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "auto",
            lineHeight: "1.7",
            opacity: 0.9,
          }}
        >
          Take your electronics shop online and reach
          customers across Mathura through the BIJLIKART
          local marketplace.
        </p>
      </section>

      <main style={mainStyle}>
        {/* BENEFITS */}

        <div style={benefitsGridStyle}>
          <BenefitCard
            icon="📱"
            title="Sell Online"
            text="Show your products to local customers online."
          />

          <BenefitCard
            icon="🛒"
            title="Receive Orders"
            text="Manage customer orders from your seller panel."
          />

          <BenefitCard
            icon="📦"
            title="Manage Products"
            text="Update product prices, stock and offers."
          />

          <BenefitCard
            icon="📊"
            title="Track Business"
            text="View orders, sales and earnings from one dashboard."
          />
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          style={formCardStyle}
        >
          <div style={{ marginBottom: "28px" }}>
            <span
              style={{
                color: "#1688e8",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              SELLER REGISTRATION
            </span>

            <h2
              style={{
                margin: "7px 0",
                color: "#172033",
              }}
            >
              Register Your Electronics Shop
            </h2>

            <p
              style={{
                color: "#64748b",
                margin: 0,
              }}
            >
              Enter your business details to apply as a
              BIJLIKART seller.
            </p>
          </div>

          <div style={formGridStyle}>
            <InputField
              label="Shop Name *"
              name="shopName"
              placeholder="Example: Sharma Electronics"
              value={formData.shopName}
              onChange={handleChange}
            />

            <InputField
              label="Owner Name *"
              name="ownerName"
              placeholder="Shop owner's full name"
              value={formData.ownerName}
              onChange={handleChange}
            />

            <InputField
              label="Mobile Number *"
              name="mobile"
              placeholder="10-digit mobile number"
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);

                setFormData((oldData) => ({
                  ...oldData,
                  mobile: value,
                }));
              }}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="business@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              label="GSTIN (Optional for Demo)"
              name="gstin"
              placeholder="Enter GSTIN if available"
              value={formData.gstin}
              onChange={handleChange}
            />

            <div>
              <label style={labelStyle}>
                Main Product Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">
                  Select Category
                </option>

                <option value="Multi Brand Electronics">
                  Multi Brand Electronics
                </option>

                <option value="TV & Home Entertainment">
                  TV & Home Entertainment
                </option>

                <option value="AC & Cooling">
                  AC & Cooling
                </option>

                <option value="Home Appliances">
                  Home Appliances
                </option>

                <option value="Laptop & Computer">
                  Laptop & Computer
                </option>

                <option value="Mobile & Accessories">
                  Mobile & Accessories
                </option>
              </select>
            </div>
          </div>

          {/* ADDRESS */}

          <div style={{ marginTop: "20px" }}>
            <label style={labelStyle}>
              Shop Address *
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter complete shop address"
              rows="4"
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              ...formGridStyle,
              marginTop: "20px",
            }}
          >
            <InputField
              label="City *"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <InputField
              label="PIN Code *"
              name="pincode"
              placeholder="Example: 281001"
              value={formData.pincode}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);

                setFormData((oldData) => ({
                  ...oldData,
                  pincode: value,
                }));
              }}
            />
          </div>

          {/* DELIVERY */}

          <div style={deliverySectionStyle}>
            <h3>🚚 Order Delivery Preference</h3>

            <label style={radioStyle}>
              <input
                type="radio"
                name="delivery"
                value="seller"
                checked={
                  formData.delivery === "seller"
                }
                onChange={handleChange}
              />

              <span>
                <strong>Seller Delivery</strong>

                <br />

                <small>
                  My shop will deliver orders to customers.
                </small>
              </span>
            </label>

            <label style={radioStyle}>
              <input
                type="radio"
                name="delivery"
                value="bijlikart"
                checked={
                  formData.delivery === "bijlikart"
                }
                onChange={handleChange}
              />

              <span>
                <strong>BIJLIKART Delivery</strong>

                <br />

                <small>
                  Use BIJLIKART delivery service when
                  available.
                </small>
              </span>
            </label>
          </div>

          {/* TERMS */}

          <label style={termsStyle}>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />

            <span>
              I confirm that the information provided is
              correct and I agree to the BIJLIKART Seller
              Terms & Marketplace Policies.
            </span>
          </label>

          <button
            type="submit"
            style={submitButtonStyle}
          >
            Submit Shop for Approval →
          </button>

          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "12px",
              marginBottom: 0,
            }}
          >
            Demo registration — backend document verification
            will be connected before production launch.
          </p>
        </form>
      </main>
    </div>
  );
}

// ==========================================
// INPUT COMPONENT
// ==========================================

function InputField({
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

// ==========================================
// BENEFIT CARD
// ==========================================

function BenefitCard({
  icon,
  title,
  text,
}) {
  return (
    <div style={benefitCardStyle}>
      <div style={{ fontSize: "30px" }}>
        {icon}
      </div>

      <strong
        style={{
          display: "block",
          margin: "10px 0 5px",
          color: "#172033",
        }}
      >
        {title}
      </strong>

      <span
        style={{
          color: "#64748b",
          fontSize: "13px",
          lineHeight: "1.5",
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f7fb",
  fontFamily: "Arial, sans-serif",
};

const headerStyle = {
  background: "#0d3975",
  color: "white",
  padding: "17px 6%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

const headerButtonStyle = {
  border: "1px solid rgba(255,255,255,0.5)",
  background: "transparent",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
};

const heroStyle = {
  background:
    "linear-gradient(135deg, #0d3975, #1688e8)",
  color: "white",
  textAlign: "center",
  padding: "55px 20px",
};

const mainStyle = {
  maxWidth: "1050px",
  margin: "auto",
  padding: "35px 20px 60px",
};

const benefitsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "15px",
  marginBottom: "30px",
};

const benefitCardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow:
    "0 3px 15px rgba(0,0,0,0.05)",
};

const formCardStyle = {
  background: "white",
  padding: "35px",
  borderRadius: "16px",
  boxShadow:
    "0 5px 25px rgba(0,0,0,0.07)",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#334155",
  fontWeight: "bold",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px",
  border: "1px solid #d8dee8",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  background: "white",
};

const deliverySectionStyle = {
  marginTop: "25px",
  background: "#f8fafc",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
};

const radioStyle = {
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  marginTop: "15px",
  cursor: "pointer",
  color: "#475569",
};

const termsStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  marginTop: "25px",
  color: "#475569",
  lineHeight: "1.5",
  fontSize: "13px",
};

const submitButtonStyle = {
  width: "100%",
  marginTop: "25px",
  padding: "15px",
  border: "none",
  borderRadius: "9px",
  background: "#1688e8",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const successWrapperStyle = {
  maxWidth: "700px",
  margin: "60px auto",
  padding: "20px",
};

const successCardStyle = {
  background: "white",
  padding: "45px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow:
    "0 6px 30px rgba(0,0,0,0.08)",
};

const applicationBoxStyle = {
  margin: "30px 0",
  background: "#f8fafc",
  padding: "20px",
  borderRadius: "12px",
  display: "grid",
  gap: "18px",
  textAlign: "left",
};

const smallLabelStyle = {
  display: "block",
  color: "#94a3b8",
  fontSize: "10px",
  marginBottom: "4px",
};

const nextStepsStyle = {
  background: "#eff6ff",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "left",
  color: "#475569",
  lineHeight: "1.5",
};

const primaryButtonStyle = {
  marginTop: "25px",
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "9px",
  background: "#1688e8",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default SellerRegistration;