import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const DEMO_OTP = "123456";

  function getRegisteredCustomers() {
    try {
      const savedCustomers =
        localStorage.getItem(
          "bijlikartRegisteredCustomers"
        );

      return savedCustomers
        ? JSON.parse(savedCustomers)
        : [];
    } catch {
      return [];
    }
  }

  function sendOtp(e) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanMobile = mobile.trim();

    if (cleanName.length < 2) {
      alert("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      alert(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    const customers =
      getRegisteredCustomers();

    const alreadyRegistered =
      customers.some(
        (customer) =>
          customer.mobile === cleanMobile
      );

    if (alreadyRegistered) {
      alert(
        "An account with this mobile number already exists. Please login."
      );

      navigate("/login");
      return;
    }

    setOtpSent(true);

    alert(
      "Demo OTP sent successfully!\n\nUse OTP: 123456"
    );
  }

  function verifyAndRegister(e) {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    if (otp !== DEMO_OTP) {
      alert(
        "Incorrect OTP.\n\nDemo OTP is 123456."
      );
      return;
    }

    const cleanName = name.trim();
    const cleanMobile = mobile.trim();

    const customers =
      getRegisteredCustomers();

    const alreadyRegistered =
      customers.some(
        (customer) =>
          customer.mobile === cleanMobile
      );

    if (alreadyRegistered) {
      alert(
        "This mobile number is already registered. Please login."
      );

      navigate("/login");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name: cleanName,
      mobile: cleanMobile,
      registeredAt:
        new Date().toISOString(),
    };

    const updatedCustomers = [
      ...customers,
      newCustomer,
    ];

    localStorage.setItem(
      "bijlikartRegisteredCustomers",
      JSON.stringify(updatedCustomers)
    );

    alert(
      "🎉 Your BIJLIKART account has been created successfully!\n\nYou can now login."
    );

    navigate("/login");
  }

  function changeDetails() {
    setOtpSent(false);
    setOtp("");
  }

  return (
    <div style={pageStyle}>
      <div style={signupCardStyle}>
        {/* LOGO */}

        <div style={logoAreaStyle}>
          <div style={logoStyle}>
            ⚡ BIJLIKART
          </div>

          <div style={taglineStyle}>
            Electronics Marketplace
          </div>
        </div>

        {/* HEADING */}

        <div style={headingAreaStyle}>
          <h1 style={headingStyle}>
            Create your account
          </h1>

          <p style={subheadingStyle}>
            Join BIJLIKART to shop electronics
            from trusted local sellers.
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={sendOtp}>
            {/* NAME */}

            <label style={labelStyle}>
              Full Name
              <span style={requiredStyle}>
                *
              </span>
            </label>

            <input
              type="text"
              value={name}
              autoComplete="name"
              placeholder="Enter your full name"
              onChange={(e) =>
                setName(e.target.value)
              }
              style={inputStyle}
            />

            {/* MOBILE */}

            <label style={mobileLabelStyle}>
              Mobile Number
              <span style={requiredStyle}>
                *
              </span>
            </label>

            <div style={mobileRowStyle}>
              <div style={countryCodeStyle}>
                🇮🇳 +91
              </div>

              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength="10"
                value={mobile}
                placeholder="10-digit mobile number"
                onChange={(e) =>
                  setMobile(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                style={mobileInputStyle}
              />
            </div>

            {/* SECURITY NOTE */}

            <div style={securityBoxStyle}>
              <span style={securityIconStyle}>
                🛡️
              </span>

              <div>
                <strong style={securityTitleStyle}>
                  Password-free account
                </strong>

                <p style={securityTextStyle}>
                  Your mobile number will be
                  verified using a one-time OTP.
                </p>
              </div>
            </div>

            <button
              type="submit"
              style={primaryButtonStyle}
            >
              Send OTP →
            </button>
          </form>
        ) : (
          <form onSubmit={verifyAndRegister}>
            {/* OTP SUCCESS */}

            <div style={otpIconAreaStyle}>
              <div style={otpIconStyle}>
                📱
              </div>

              <h2 style={otpHeadingStyle}>
                Verify your mobile
              </h2>

              <p style={otpDescriptionStyle}>
                We sent a 6-digit OTP to
              </p>

              <strong style={mobileDisplayStyle}>
                +91 {mobile}
              </strong>

              <p style={nameDisplayStyle}>
                Account for{" "}
                <strong>{name.trim()}</strong>
              </p>
            </div>

            {/* OTP */}

            <label style={labelStyle}>
              Enter OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              autoFocus
              value={otp}
              placeholder="• • • • • •"
              onChange={(e) =>
                setOtp(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              style={otpInputStyle}
            />

            <div style={demoOtpStyle}>
              Demo OTP:{" "}
              <strong>123456</strong>
            </div>

            <button
              type="submit"
              style={verifyButtonStyle}
            >
              ✓ Verify & Create Account
            </button>

            <button
              type="button"
              onClick={changeDetails}
              style={secondaryButtonStyle}
            >
              ← Change name or mobile number
            </button>
          </form>
        )}

        {/* LOGIN */}

        <div style={dividerStyle}>
          <span style={dividerLineStyle} />

          <span style={dividerTextStyle}>
            Already registered?
          </span>

          <span style={dividerLineStyle} />
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/login")
          }
          style={loginButtonStyle}
        >
          Login to your account
        </button>

        {/* HOME */}

        <button
          type="button"
          onClick={() => navigate("/")}
          style={homeButtonStyle}
        >
          ← Back to BIJLIKART
        </button>

        <p style={termsStyle}>
          By creating an account, you agree to
          BIJLIKART's Terms & Conditions and
          Privacy Policy.
        </p>
      </div>
    </div>
  );
}

/* =========================================
   STYLES
========================================= */

const pageStyle = {
  minHeight: "100vh",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "30px 18px",

  boxSizing: "border-box",

  background:
    "linear-gradient(135deg, #eaf2ff 0%, #f8fafc 48%, #eef2ff 100%)",
};

const signupCardStyle = {
  width: "100%",
  maxWidth: "450px",

  background: "#ffffff",

  padding: "32px",

  borderRadius: "20px",

  border: "1px solid #e2e8f0",

  boxShadow:
    "0 20px 55px rgba(15, 23, 42, 0.13)",

  boxSizing: "border-box",
};

const logoAreaStyle = {
  textAlign: "center",
  marginBottom: "25px",
};

const logoStyle = {
  color: "#123b7a",

  fontSize: "28px",
  fontWeight: "900",

  letterSpacing: "-0.7px",
};

const taglineStyle = {
  marginTop: "3px",

  color: "#64748b",

  fontSize: "12px",
};

const headingAreaStyle = {
  marginBottom: "24px",
};

const headingStyle = {
  margin: "0 0 7px",

  color: "#0f172a",

  fontSize: "25px",
};

const subheadingStyle = {
  margin: 0,

  color: "#64748b",

  fontSize: "14px",
  lineHeight: 1.6,
};

const labelStyle = {
  display: "block",

  marginBottom: "8px",

  color: "#1e293b",

  fontSize: "14px",
  fontWeight: "700",
};

const mobileLabelStyle = {
  ...labelStyle,
  marginTop: "19px",
};

const requiredStyle = {
  marginLeft: "3px",
  color: "#dc2626",
};

const inputStyle = {
  width: "100%",

  boxSizing: "border-box",

  padding: "14px",

  border: "1px solid #cbd5e1",
  borderRadius: "10px",

  outline: "none",

  color: "#0f172a",

  fontSize: "15px",

  background: "#ffffff",
};

const mobileRowStyle = {
  display: "flex",
  gap: "8px",
};

const countryCodeStyle = {
  padding: "14px 12px",

  border: "1px solid #cbd5e1",
  borderRadius: "10px",

  background: "#f8fafc",

  color: "#334155",

  fontWeight: "700",

  whiteSpace: "nowrap",
};

const mobileInputStyle = {
  ...inputStyle,

  flex: 1,
  minWidth: 0,
};

const securityBoxStyle = {
  marginTop: "20px",

  padding: "14px",

  display: "flex",
  alignItems: "flex-start",

  gap: "11px",

  border: "1px solid #bfdbfe",
  borderRadius: "12px",

  background: "#eff6ff",
};

const securityIconStyle = {
  fontSize: "22px",
};

const securityTitleStyle = {
  display: "block",

  color: "#1e3a8a",

  fontSize: "13px",
};

const securityTextStyle = {
  margin: "4px 0 0",

  color: "#475569",

  fontSize: "12px",
  lineHeight: 1.5,
};

const primaryButtonStyle = {
  width: "100%",

  marginTop: "22px",

  padding: "14px",

  border: "none",
  borderRadius: "10px",

  background:
    "linear-gradient(135deg, #2563eb, #1d4ed8)",

  color: "#ffffff",

  fontSize: "15px",
  fontWeight: "800",

  cursor: "pointer",

  boxShadow:
    "0 8px 18px rgba(37, 99, 235, 0.22)",
};

const otpIconAreaStyle = {
  textAlign: "center",

  marginBottom: "23px",
};

const otpIconStyle = {
  width: "62px",
  height: "62px",

  margin: "0 auto 12px",

  display: "grid",
  placeItems: "center",

  borderRadius: "50%",

  background: "#eff6ff",

  fontSize: "29px",
};

const otpHeadingStyle = {
  margin: "0 0 7px",

  color: "#0f172a",

  fontSize: "21px",
};

const otpDescriptionStyle = {
  margin: "0 0 3px",

  color: "#64748b",

  fontSize: "13px",
};

const mobileDisplayStyle = {
  color: "#1d4ed8",

  fontSize: "16px",
};

const nameDisplayStyle = {
  margin: "8px 0 0",

  color: "#475569",

  fontSize: "13px",
};

const otpInputStyle = {
  width: "100%",

  boxSizing: "border-box",

  padding: "15px",

  border: "2px solid #bfdbfe",
  borderRadius: "11px",

  outline: "none",

  textAlign: "center",

  fontSize: "23px",
  fontWeight: "700",

  letterSpacing: "7px",
};

const demoOtpStyle = {
  marginTop: "12px",

  padding: "10px",

  borderRadius: "9px",

  background: "#fff7ed",

  color: "#9a3412",

  textAlign: "center",

  fontSize: "12px",
};

const verifyButtonStyle = {
  ...primaryButtonStyle,

  background:
    "linear-gradient(135deg, #16a34a, #15803d)",
};

const secondaryButtonStyle = {
  width: "100%",

  marginTop: "12px",

  padding: "10px",

  border: "none",

  background: "transparent",

  color: "#2563eb",

  fontWeight: "700",

  cursor: "pointer",
};

const dividerStyle = {
  margin: "26px 0 17px",

  display: "flex",
  alignItems: "center",

  gap: "10px",
};

const dividerLineStyle = {
  height: "1px",

  flex: 1,

  background: "#e2e8f0",
};

const dividerTextStyle = {
  color: "#94a3b8",

  fontSize: "11px",

  whiteSpace: "nowrap",
};

const loginButtonStyle = {
  width: "100%",

  padding: "13px",

  border: "1px solid #94a3b8",
  borderRadius: "10px",

  background: "#ffffff",

  color: "#334155",

  fontWeight: "700",

  cursor: "pointer",
};

const homeButtonStyle = {
  display: "block",

  margin: "17px auto 0",

  border: "none",

  background: "transparent",

  color: "#2563eb",

  fontWeight: "600",

  cursor: "pointer",
};

const termsStyle = {
  margin: "22px 0 0",

  color: "#94a3b8",

  textAlign: "center",

  fontSize: "10px",
  lineHeight: 1.5,
};

export default CustomerSignup;