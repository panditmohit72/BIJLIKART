import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // DEMO ONLY
  // Real OTP integration later will replace this.
  const DEMO_OWNER_MOBILE = "9012144399";
  const DEMO_OTP = "123456";

  function sendOtp() {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (mobile !== DEMO_OWNER_MOBILE) {
      alert("This mobile number is not authorized as BIJLIKART Owner.");
      return;
    }

    setOtpSent(true);

    alert(
      "Demo Owner OTP sent!\n\nDemo OTP: 123456"
    );
  }

  function verifyOtp(e) {
    e.preventDefault();

    if (otp !== DEMO_OTP) {
      alert("Incorrect OTP.");
      return;
    }

    localStorage.setItem("bijlikartAdminAuth", "true");
    localStorage.setItem("bijlikartAdminRole", "owner");

    alert("Owner verification successful!");

    navigate("/admin");
  }

  function changeNumber() {
    setOtpSent(false);
    setOtp("");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "white",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 5px 25px rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "#123b7a",
              marginBottom: "5px",
            }}
          >
            ⚡ BIJLIKART
          </h1>

          <p
            style={{
              color: "#777",
              marginTop: "0",
            }}
          >
            Management Security
          </p>

          <h2>👑 Owner Login</h2>

          <p style={{ color: "#666" }}>
            Restricted access for BIJLIKART Owner
          </p>
        </div>

        {!otpSent ? (
          <>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Owner Mobile Number
            </label>

            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <div
                style={{
                  padding: "13px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  background: "#f8fafc",
                }}
              >
                +91
              </div>

              <input
                type="tel"
                maxLength="10"
                placeholder="Enter registered mobile"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                style={inputStyle}
              />
            </div>

            <button
              onClick={sendOtp}
              style={primaryButton}
            >
              Send Owner OTP
            </button>
          </>
        ) : (
          <form onSubmit={verifyOtp}>
            <p
              style={{
                textAlign: "center",
                color: "#555",
              }}
            >
              OTP sent to
              <br />
              <strong>+91 {mobile}</strong>
            </p>

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Enter 6-digit OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="• • • • • •"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              style={{
                ...inputStyle,
                textAlign: "center",
                fontSize: "22px",
                letterSpacing: "7px",
              }}
            />

            <button
              type="submit"
              style={{
                ...primaryButton,
                background: "#16a34a",
              }}
            >
              Verify & Enter Owner Panel
            </button>

            <button
              type="button"
              onClick={changeNumber}
              style={secondaryButton}
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <div
          style={{
            background: "#fff7ed",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "25px",
            textAlign: "center",
            fontSize: "13px",
            color: "#9a3412",
          }}
        >
          Demo Owner Mobile:
          <strong> 9999999999</strong>
          <br />
          Demo OTP:
          <strong> 123456</strong>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            display: "block",
            margin: "20px auto 0",
            border: "none",
            background: "transparent",
            color: "#2563eb",
            cursor: "pointer",
          }}
        >
          ← Customer Website
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  width: "100%",
  padding: "13px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const primaryButton = {
  width: "100%",
  marginTop: "22px",
  padding: "14px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};

const secondaryButton = {
  width: "100%",
  marginTop: "12px",
  padding: "11px",
  border: "none",
  background: "transparent",
  color: "#2563eb",
  cursor: "pointer",
};

export default AdminLogin;