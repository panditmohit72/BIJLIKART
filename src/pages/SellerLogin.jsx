import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const DEMO_OTP = "123456";

  // ================================
  // SEND OTP
  // ================================

  function sendOtp(e) {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);

      alert(
        "Demo OTP sent successfully.\n\nYour OTP is: 123456"
      );
    }, 500);
  }

  // ================================
  // VERIFY OTP
  // ================================

  function verifyOtp(e) {
    e.preventDefault();

    if (!otpSent) {
      alert("Please send OTP first.");
      return;
    }

    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    if (otp !== DEMO_OTP) {
      alert("Invalid OTP. Please try again.");
      return;
    }

    // DEMO AUTHENTICATION
    // Later backend will return actual seller details.

    localStorage.setItem(
      "bijlikartSellerAuth",
      "true"
    );

    localStorage.setItem(
      "bijlikartSellerMobile",
      mobile
    );

    localStorage.setItem(
      "bijlikartSellerId",
      "BKS-DEMO-001"
    );

    localStorage.setItem(
      "bijlikartSellerName",
      "Demo Electronics Store"
    );

    navigate("/seller", {
      replace: true,
    });
  }

  // ================================
  // CHANGE MOBILE
  // ================================

  function changeMobile() {
    setOtpSent(false);
    setOtp("");
  }

  // ================================
  // RESEND OTP
  // ================================

  function resendOtp() {
    setOtp("");

    alert(
      "Demo OTP resent successfully.\n\nYour OTP is: 123456"
    );
  }

  return (
    <div style={pageStyle}>
      <div style={loginCardStyle}>

        {/* LOGO */}

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

        {/* HEADING */}

        <div style={headingAreaStyle}>
          <h2 style={headingStyle}>
            Seller Login
          </h2>

          <p style={descriptionStyle}>
            Login with your registered mobile
            number to manage your BIJLIKART shop.
          </p>
        </div>

        {/* ============================
            MOBILE STEP
        ============================ */}

        {!otpSent && (
          <form onSubmit={sendOtp}>
            <label style={labelStyle}>
              Registered Mobile Number
            </label>

            <div style={mobileBoxStyle}>
              <div style={countryCodeStyle}>
                +91
              </div>

              <input
                type="tel"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                placeholder="Enter 10-digit mobile"
                maxLength="10"
                style={mobileInputStyle}
                autoFocus
              />
            </div>

            <p style={helperTextStyle}>
              OTP will be sent to your registered
              seller mobile number.
            </p>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...primaryButtonStyle,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP →"}
            </button>
          </form>
        )}

        {/* ============================
            OTP STEP
        ============================ */}

        {otpSent && (
          <form onSubmit={verifyOtp}>

            <div style={sentBoxStyle}>
              <div style={sentIconStyle}>
                📱
              </div>

              <div>
                <strong>
                  OTP Sent
                </strong>

                <p style={sentTextStyle}>
                  OTP sent to +91 {mobile}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={changeMobile}
              style={changeNumberStyle}
            >
              ✏️ Change Mobile Number
            </button>

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
                Use OTP:{" "}
                <strong>123456</strong>
              </span>
            </div>

            <button
              type="submit"
              style={primaryButtonStyle}
            >
              ✓ Verify OTP & Login
            </button>

            <button
              type="button"
              onClick={resendOtp}
              style={resendButtonStyle}
            >
              Didn't receive OTP? Resend OTP
            </button>
          </form>
        )}

        {/* SECURITY */}

        <div style={securityBoxStyle}>
          <span style={{ fontSize: "20px" }}>
            🔐
          </span>

          <div>
            <strong>
              Secure Seller Access
            </strong>

            <p style={securityTextStyle}>
              Only registered BIJLIKART sellers
              can access the Seller Panel.
            </p>
          </div>
        </div>

        {/* REGISTER */}

        <div style={registerAreaStyle}>
          <p style={registerTextStyle}>
            Not registered as a seller?
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

        {/* CUSTOMER WEBSITE */}

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

/* =====================================
   STYLES
===================================== */

const pageStyle = {
  minHeight: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  padding: "30px 20px",

  boxSizing: "border-box",

  background:
    "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #dbeafe 100%)",

  fontFamily: "Arial, sans-serif",
};

const loginCardStyle = {
  width: "100%",
  maxWidth: "470px",

  background: "white",

  padding: "38px",

  borderRadius: "18px",

  boxShadow:
    "0 15px 45px rgba(15, 47, 95, 0.14)",

  boxSizing: "border-box",
};

const logoAreaStyle = {
  textAlign: "center",
  marginBottom: "28px",
};

const logoIconStyle = {
  width: "65px",
  height: "65px",

  margin: "0 auto 12px",

  borderRadius: "16px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  fontSize: "32px",

  background: "#2563eb",
  color: "white",
};

const brandStyle = {
  margin: 0,
  color: "#0f2f5f",
  fontSize: "28px",
};

const brandSubtitleStyle = {
  marginTop: "5px",
  marginBottom: 0,

  color: "#64748b",

  fontWeight: "bold",
};

const headingAreaStyle = {
  marginBottom: "25px",
};

const headingStyle = {
  marginBottom: "8px",
  color: "#0f172a",
};

const descriptionStyle = {
  margin: 0,

  color: "#64748b",

  lineHeight: "1.6",
};

const labelStyle = {
  display: "block",

  marginTop: "17px",
  marginBottom: "8px",

  color: "#334155",

  fontWeight: "bold",
};

const mobileBoxStyle = {
  width: "100%",

  display: "flex",

  border: "1px solid #cbd5e1",

  borderRadius: "9px",

  overflow: "hidden",

  boxSizing: "border-box",

  background: "white",
};

const countryCodeStyle = {
  padding: "13px",

  background: "#f1f5f9",

  borderRight: "1px solid #cbd5e1",

  color: "#475569",

  fontWeight: "bold",
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

  lineHeight: "1.5",

  marginTop: "8px",
};

const primaryButtonStyle = {
  width: "100%",

  marginTop: "20px",

  padding: "14px",

  border: "none",

  borderRadius: "9px",

  background: "#2563eb",

  color: "white",

  fontSize: "16px",

  fontWeight: "bold",

  cursor: "pointer",
};

const sentBoxStyle = {
  display: "flex",

  gap: "12px",

  alignItems: "center",

  padding: "15px",

  background: "#f0fdf4",

  border: "1px solid #bbf7d0",

  borderRadius: "10px",

  color: "#166534",
};

const sentIconStyle = {
  fontSize: "25px",
};

const sentTextStyle = {
  margin: "4px 0 0",

  fontSize: "13px",
};

const changeNumberStyle = {
  border: "none",

  background: "transparent",

  color: "#2563eb",

  cursor: "pointer",

  fontWeight: "bold",

  padding: "12px 0 0",
};

const otpInputStyle = {
  width: "100%",

  padding: "15px",

  boxSizing: "border-box",

  border: "1px solid #cbd5e1",

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

const resendButtonStyle = {
  width: "100%",

  marginTop: "10px",

  padding: "11px",

  border: "none",

  background: "transparent",

  color: "#2563eb",

  cursor: "pointer",

  fontWeight: "bold",
};

const securityBoxStyle = {
  display: "flex",

  gap: "10px",

  marginTop: "25px",

  padding: "14px",

  borderRadius: "10px",

  background: "#f8fafc",

  border: "1px solid #e2e8f0",

  color: "#334155",
};

const securityTextStyle = {
  margin: "5px 0 0",

  color: "#64748b",

  fontSize: "12px",

  lineHeight: "1.5",
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

  background: "white",

  color: "#475569",

  cursor: "pointer",

  fontWeight: "bold",
};

export default SellerLogin;