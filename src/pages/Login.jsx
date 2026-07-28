import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("customer");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const DEMO_OTP = "123456";

  function sendOtp() {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOtpSent(true);
    alert("Demo OTP sent!\nUse OTP: 123456");
  }

  function verifyOtp(e) {
    e.preventDefault();

    if (otp !== DEMO_OTP) {
      alert("Incorrect OTP. Demo OTP is 123456.");
      return;
    }

    if (userType === "seller") {
      alert("Please use the dedicated Seller Login.");
      navigate("/seller-login");
      return;
    }

    setOtpVerified(true);
  }

  function completeCustomerLogin(e) {
    e.preventDefault();

    const cleanName = customerName.trim();

    if (cleanName.length < 2) {
      alert("Please enter your name.");
      return;
    }

    localStorage.setItem("bijlikartCustomerAuth", "true");
    localStorage.setItem("bijlikartCustomerName", cleanName);
    localStorage.setItem("bijlikartCustomerMobile", mobile);

    navigate("/");
  }

  function changeMobileNumber() {
    setOtpSent(false);
    setOtpVerified(false);
    setOtp("");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eaeded",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,.12)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h1 style={{ color: "#123b7a", margin: 0 }}>
            ⚡ BIJLIKART
          </h1>

          <p
            style={{
              margin: "4px 0 20px",
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            Electronics Marketplace
          </p>

          <h2 style={{ marginBottom: "5px" }}>
            {otpVerified ? "Welcome to BIJLIKART" : "Sign in"}
          </h2>

          <p style={{ color: "#666", marginTop: 0 }}>
            {otpVerified
              ? "Tell us your name to finish setting up your account."
              : "Login securely using your mobile number"}
          </p>
        </div>

        {!otpVerified && (
          <>
            <div
              style={{
                display: "flex",
                background: "#f1f5f9",
                padding: "5px",
                borderRadius: "9px",
                marginBottom: "22px",
              }}
            >
              <button
                type="button"
                disabled={otpSent}
                onClick={() => setUserType("customer")}
                style={{
                  flex: 1,
                  padding: "11px",
                  border: 0,
                  borderRadius: "7px",
                  fontWeight: "700",
                  cursor: "pointer",
                  background:
                    userType === "customer" ? "#2563eb" : "transparent",
                  color: userType === "customer" ? "white" : "#333",
                }}
              >
                Customer
              </button>

              <button
                type="button"
                disabled={otpSent}
                onClick={() => setUserType("seller")}
                style={{
                  flex: 1,
                  padding: "11px",
                  border: 0,
                  borderRadius: "7px",
                  fontWeight: "700",
                  cursor: "pointer",
                  background:
                    userType === "seller" ? "#2563eb" : "transparent",
                  color: userType === "seller" ? "white" : "#333",
                }}
              >
                Seller
              </button>
            </div>

            {!otpSent ? (
              <>
                <label
                  style={{
                    display: "block",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}
                >
                  Mobile Number
                </label>

                <div style={{ display: "flex", gap: "8px" }}>
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
                    value={mobile}
                    placeholder="10-digit mobile number"
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, ""))
                    }
                    style={{
                      flex: 1,
                      minWidth: 0,
                      padding: "13px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "15px",
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={sendOtp}
                  style={{
                    width: "100%",
                    marginTop: "22px",
                    padding: "14px",
                    border: 0,
                    borderRadius: "8px",
                    background: "#2563eb",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Continue
                </button>
              </>
            ) : (
              <form onSubmit={verifyOtp}>
                <p style={{ textAlign: "center", color: "#555" }}>
                  OTP sent to <strong>+91 {mobile}</strong>
                </p>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "15px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "22px",
                    textAlign: "center",
                    letterSpacing: "7px",
                  }}
                />

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    marginTop: "18px",
                    padding: "14px",
                    border: 0,
                    borderRadius: "8px",
                    background: "#16a34a",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Verify OTP
                </button>

                <button
                  type="button"
                  onClick={changeMobileNumber}
                  style={{
                    width: "100%",
                    marginTop: "12px",
                    border: 0,
                    background: "transparent",
                    color: "#2563eb",
                    cursor: "pointer",
                  }}
                >
                  Change mobile number
                </button>
              </form>
            )}
          </>
        )}

        {otpVerified && (
          <form onSubmit={completeCustomerLogin}>
            <label
              style={{
                display: "block",
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              Your Name
            </label>

            <input
              type="text"
              autoFocus
              value={customerName}
              placeholder="Enter your name"
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "18px",
                padding: "14px",
                border: 0,
                borderRadius: "8px",
                background: "#2563eb",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Continue to BIJLIKART
            </button>
          </form>
        )}

        {!otpVerified && (
          <div
            style={{
              marginTop: "22px",
              padding: "11px",
              background: "#fff7ed",
              borderRadius: "7px",
              textAlign: "center",
              fontSize: "13px",
              color: "#9a3412",
            }}
          >
            Demo OTP: <strong>123456</strong>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            display: "block",
            margin: "18px auto 0",
            border: 0,
            background: "transparent",
            color: "#2563eb",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;