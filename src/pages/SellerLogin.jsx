import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifiedSeller, setVerifiedSeller] = useState(null);

  const DEMO_OTP = "123456";

  function getSellerApplications() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(
          "bijlikartSellerApplications"
        ) || "[]"
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function findSeller() {
    const cleanName = ownerName
      .trim()
      .toLowerCase();

    const cleanMobile = mobile.trim();

    return getSellerApplications().find(
      (seller) =>
        seller.mobile === cleanMobile &&
        (
          seller.ownerName ||
          seller.owner ||
          ""
        )
          .trim()
          .toLowerCase() === cleanName
    );
  }

  function sendOtp(e) {
    e.preventDefault();

    const cleanName = ownerName.trim();

    if (cleanName.length < 2) {
      alert(
        "Please enter the registered owner name."
      );
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    const applications =
      getSellerApplications();

    const mobileSeller =
      applications.find(
        (seller) =>
          seller.mobile === mobile
      );

    if (!mobileSeller) {
      const register = window.confirm(
        "No seller account is registered with this mobile number.\n\nWould you like to register your shop?"
      );

      if (register) {
        navigate("/seller-register");
      }

      return;
    }

    const seller = findSeller();

    if (!seller) {
      alert(
        "Owner name does not match the registered seller account."
      );
      return;
    }

    const status = (
      seller.status || "Pending"
    ).toLowerCase();

    if (status === "pending") {
      alert(
        `Your seller application is still under review.\n\nApplication ID: ${
          seller.applicationId ||
          seller.id
        }\n\nYou can login after BIJLIKART approves your shop.`
      );

      return;
    }

    if (
      status === "rejected" ||
      status === "blocked" ||
      status === "suspended"
    ) {
      alert(
        `Seller login is currently unavailable.\n\nAccount status: ${seller.status}`
      );

      return;
    }

    if (
      status !== "approved" &&
      status !== "active"
    ) {
      alert(
        `Your seller account is not active yet.\n\nCurrent status: ${seller.status}`
      );

      return;
    }

    setLoading(true);

    setTimeout(() => {
      setVerifiedSeller(seller);
      setOtpSent(true);
      setLoading(false);

      alert(
        "Demo OTP sent successfully.\n\nYour OTP is: 123456"
      );
    }, 500);
  }

  function verifyOtp(e) {
    e.preventDefault();

    if (!verifiedSeller) {
      alert(
        "Seller account verification failed. Please try again."
      );

      resetLogin();
      return;
    }

    if (otp.length !== 6) {
      alert(
        "Please enter the 6-digit OTP."
      );
      return;
    }

    if (otp !== DEMO_OTP) {
      alert(
        "Invalid OTP. Demo OTP is 123456."
      );
      return;
    }

    /*
      Re-check the seller before login.
      This prevents login if status was changed
      after the OTP was requested.
    */

    const currentSeller =
      getSellerApplications().find(
        (seller) =>
          String(
            seller.applicationId ||
            seller.id
          ) ===
          String(
            verifiedSeller.applicationId ||
            verifiedSeller.id
          )
      );

    if (!currentSeller) {
      alert(
        "Seller account could not be found."
      );

      resetLogin();
      return;
    }

    const currentStatus = (
      currentSeller.status || ""
    ).toLowerCase();

    if (
      currentStatus !== "approved" &&
      currentStatus !== "active"
    ) {
      alert(
        `Seller account is not active.\n\nCurrent status: ${
          currentSeller.status ||
          "Pending"
        }`
      );

      resetLogin();
      return;
    }

    localStorage.setItem(
      "bijlikartSellerAuth",
      "true"
    );

    localStorage.setItem(
      "bijlikartSellerMobile",
      currentSeller.mobile
    );

    localStorage.setItem(
      "bijlikartSellerId",
      String(
        currentSeller.applicationId ||
        currentSeller.id
      )
    );

    localStorage.setItem(
      "bijlikartSellerName",
      currentSeller.shopName ||
        currentSeller.shop ||
        ""
    );

    localStorage.setItem(
      "bijlikartSellerOwnerName",
      currentSeller.ownerName ||
        currentSeller.owner ||
        ""
    );

    alert(
      `Welcome to BIJLIKART Seller Portal,\n${
        currentSeller.shopName ||
        currentSeller.shop
      }!`
    );

    navigate("/seller", {
      replace: true,
    });
  }

  function resetLogin() {
    setOtpSent(false);
    setOtp("");
    setVerifiedSeller(null);
  }

  function resendOtp() {
    if (!verifiedSeller) {
      resetLogin();
      return;
    }

    setOtp("");

    alert(
      "Demo OTP resent successfully.\n\nYour OTP is: 123456"
    );
  }

  return (
    <div style={pageStyle}>
      <div style={loginCardStyle}>
        <div style={logoAreaStyle}>
          <div style={logoIconStyle}>
            ⚡
          </div>

          <h1 style={brandStyle}>
            BIJLIKART
          </h1>

          <p style={brandSubtitleStyle}>
            Seller Portal
          </p>
        </div>

        <div style={headingAreaStyle}>
          <h2 style={headingStyle}>
            Seller Login
          </h2>

          <p style={descriptionStyle}>
            Login using your registered
            owner name and mobile number.
          </p>
        </div>

        {!otpSent && (
          <form onSubmit={sendOtp}>
            <label style={labelStyle}>
              Registered Owner Name *
            </label>

            <input
              type="text"
              value={ownerName}
              onChange={(e) =>
                setOwnerName(e.target.value)
              }
              placeholder="Enter registered owner name"
              style={inputStyle}
              autoFocus
            />

            <label style={labelStyle}>
              Registered Mobile Number *
            </label>

            <div style={mobileBoxStyle}>
              <div style={countryCodeStyle}>
                🇮🇳 +91
              </div>

              <input
                type="tel"
                inputMode="numeric"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                placeholder="10-digit mobile number"
                maxLength="10"
                style={mobileInputStyle}
              />
            </div>

            <p style={helperTextStyle}>
              Your details must match your
              BIJLIKART seller registration.
            </p>

            <div style={infoBoxStyle}>
              <span style={{ fontSize: "21px" }}>
                🛡️
              </span>

              <div>
                <strong>
                  Registered sellers only
                </strong>

                <p style={infoTextStyle}>
                  OTP is sent only after your
                  registration and account
                  approval are verified.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...primaryButtonStyle,
                opacity: loading
                  ? 0.7
                  : 1,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Checking Seller..."
                : "Continue & Send OTP →"}
            </button>
          </form>
        )}

        {otpSent && verifiedSeller && (
          <form onSubmit={verifyOtp}>
            <div style={verifiedBoxStyle}>
              <div style={verifiedIconStyle}>
                ✓
              </div>

              <div>
                <strong>
                  Seller Verified
                </strong>

                <p style={verifiedTextStyle}>
                  {verifiedSeller.shopName ||
                    verifiedSeller.shop}
                </p>

                <small>
                  {verifiedSeller.ownerName ||
                    verifiedSeller.owner}
                </small>
              </div>
            </div>

            <div style={sentBoxStyle}>
              <span style={{ fontSize: "24px" }}>
                📱
              </span>

              <div>
                <strong>OTP Sent</strong>

                <p style={sentTextStyle}>
                  +91 {mobile}
                </p>
              </div>
            </div>

            <label style={labelStyle}>
              Enter 6-digit OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              placeholder="••••••"
              maxLength="6"
              style={otpInputStyle}
              autoFocus
            />

            <div style={demoOtpStyle}>
              <strong>
                🧪 Demo Mode
              </strong>

              <span>
                OTP: <strong>123456</strong>
              </span>
            </div>

            <button
              type="submit"
              style={loginButtonStyle}
            >
              ✓ Verify OTP & Open Dashboard
            </button>

            <button
              type="button"
              onClick={resendOtp}
              style={textButtonStyle}
            >
              Resend OTP
            </button>

            <button
              type="button"
              onClick={resetLogin}
              style={textButtonStyle}
            >
              ← Change Login Details
            </button>
          </form>
        )}

        <div style={registerAreaStyle}>
          <p style={registerTextStyle}>
            Haven't registered your shop?
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/seller-register")
            }
            style={registerButtonStyle}
          >
            🏪 Register Your Shop
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={customerButtonStyle}
        >
          ← Back to Customer Website
        </button>
      </div>
    </div>
  );
}

/* =================================
   STYLES
================================= */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px 20px",
  boxSizing: "border-box",
  background:
    "linear-gradient(135deg,#eff6ff 0%,#f8fafc 50%,#dbeafe 100%)",
  fontFamily: "Arial, sans-serif",
};

const loginCardStyle = {
  width: "100%",
  maxWidth: "470px",
  background: "#ffffff",
  padding: "38px",
  borderRadius: "20px",
  boxSizing: "border-box",
  boxShadow:
    "0 18px 50px rgba(15,47,95,.15)",
};

const logoAreaStyle = {
  textAlign: "center",
  marginBottom: "27px",
};

const logoIconStyle = {
  width: "65px",
  height: "65px",
  margin: "0 auto 12px",
  borderRadius: "17px",
  display: "grid",
  placeItems: "center",
  fontSize: "31px",
  background:
    "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#ffffff",
  boxShadow:
    "0 9px 22px rgba(37,99,235,.24)",
};

const brandStyle = {
  margin: 0,
  color: "#0f2f5f",
  fontSize: "28px",
};

const brandSubtitleStyle = {
  margin: "5px 0 0",
  color: "#64748b",
  fontWeight: "bold",
};

const headingAreaStyle = {
  marginBottom: "24px",
};

const headingStyle = {
  margin: "0 0 8px",
  color: "#0f172a",
};

const descriptionStyle = {
  margin: 0,
  color: "#64748b",
  lineHeight: 1.6,
};

const labelStyle = {
  display: "block",
  margin: "17px 0 8px",
  color: "#334155",
  fontWeight: "bold",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px",
  border: "1px solid #cbd5e1",
  borderRadius: "9px",
  outline: "none",
  fontSize: "15px",
};

const mobileBoxStyle = {
  width: "100%",
  display: "flex",
  border: "1px solid #cbd5e1",
  borderRadius: "9px",
  overflow: "hidden",
  background: "#ffffff",
};

const countryCodeStyle = {
  padding: "13px",
  background: "#f1f5f9",
  borderRight: "1px solid #cbd5e1",
  color: "#475569",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

const mobileInputStyle = {
  flex: 1,
  minWidth: 0,
  padding: "13px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};

const helperTextStyle = {
  color: "#94a3b8",
  fontSize: "12px",
  lineHeight: 1.5,
  marginTop: "8px",
};

const infoBoxStyle = {
  marginTop: "18px",
  padding: "14px",
  display: "flex",
  gap: "11px",
  borderRadius: "11px",
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  color: "#1e3a8a",
};

const infoTextStyle = {
  margin: "4px 0 0",
  color: "#475569",
  fontSize: "12px",
  lineHeight: 1.5,
};

const primaryButtonStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "14px",
  border: "none",
  borderRadius: "9px",
  background:
    "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "bold",
};

const verifiedBoxStyle = {
  padding: "14px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  borderRadius: "11px",
  background: "#f0fdf4",
  border: "1px solid #bbf7d0",
  color: "#166534",
};

const verifiedIconStyle = {
  width: "38px",
  height: "38px",
  flex: "0 0 38px",
  display: "grid",
  placeItems: "center",
  borderRadius: "50%",
  background: "#16a34a",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
};

const verifiedTextStyle = {
  margin: "3px 0",
  fontWeight: "bold",
};

const sentBoxStyle = {
  marginTop: "13px",
  padding: "13px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderRadius: "10px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
};

const sentTextStyle = {
  margin: "3px 0 0",
  color: "#64748b",
  fontSize: "13px",
};

const otpInputStyle = {
  width: "100%",
  padding: "15px",
  boxSizing: "border-box",
  border: "2px solid #bfdbfe",
  borderRadius: "9px",
  outline: "none",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "8px",
};

const demoOtpStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  marginTop: "12px",
  padding: "12px",
  borderRadius: "8px",
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  color: "#9a3412",
  fontSize: "13px",
};

const loginButtonStyle = {
  ...primaryButtonStyle,
  background:
    "linear-gradient(135deg,#16a34a,#15803d)",
  cursor: "pointer",
};

const textButtonStyle = {
  width: "100%",
  marginTop: "10px",
  padding: "8px",
  border: "none",
  background: "transparent",
  color: "#2563eb",
  fontWeight: "bold",
  cursor: "pointer",
};

const registerAreaStyle = {
  marginTop: "25px",
  paddingTop: "20px",
  borderTop: "1px solid #e2e8f0",
  textAlign: "center",
};

const registerTextStyle = {
  margin: "0 0 8px",
  color: "#64748b",
};

const registerButtonStyle = {
  border: "none",
  background: "transparent",
  color: "#2563eb",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};

const customerButtonStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "9px",
  background: "#ffffff",
  color: "#475569",
  cursor: "pointer",
  fontWeight: "bold",
};

export default SellerLogin;