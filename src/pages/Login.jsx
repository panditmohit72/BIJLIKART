import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("customer");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Demo OTP
  const DEMO_OTP = "123456";

  function sendOtp() {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOtpSent(true);

    alert(
      "Demo OTP sent successfully!\n\nFor demo use OTP: 123456"
    );
  }

  function verifyOtp(e) {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    if (otp !== DEMO_OTP) {
      alert("Incorrect OTP. Demo OTP is 123456.");
      return;
    }

    if (userType === "seller") {
      alert("Seller OTP verified successfully!");
      navigate("/seller");
    } else {
      alert("Customer OTP verified successfully!");
      navigate("/");
    }
  }

  function changeMobileNumber() {
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
            marginBottom: "25px",
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
              marginTop: "0",
              color: "#777",
              fontSize: "13px",
            }}
          >
            by Mohit Sharma
          </p>

          <h2>Login with OTP</h2>

          <p style={{ color: "#666" }}>
            Enter your mobile number to continue
          </p>
        </div>

        <div
          style={{
            display: "flex",
            background: "#f1f5f9",
            padding: "5px",
            borderRadius: "10px",
            marginBottom: "25px",
          }}
        >
          <button
            type="button"
            disabled={otpSent}
            onClick={() => setUserType("customer")}
            style={{
              flex: 1,
              padding: "11px",
              border: "none",
              borderRadius: "8px",
              cursor: otpSent ? "not-allowed" : "pointer",
              fontWeight: "bold",
              background:
                userType === "customer"
                  ? "#2563eb"
                  : "transparent",
              color:
                userType === "customer"
                  ? "white"
                  : "#333",
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
              border: "none",
              borderRadius: "8px",
              cursor: otpSent ? "not-allowed" : "pointer",
              fontWeight: "bold",
              background:
                userType === "seller"
                  ? "#2563eb"
                  : "transparent",
              color:
                userType === "seller"
                  ? "white"
                  : "#333",
            }}
          >
            Seller
          </button>
        </div>

        {!otpSent ? (
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Mobile Number
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
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                style={{
                  flex: 1,
                  padding: "13px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="button"
              onClick={sendOtp}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "14px",
                border: "none",
                borderRadius: "8px",
                background: "#2563eb",
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Send OTP
            </button>
          </div>
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
                width: "100%",
                padding: "15px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "22px",
                textAlign: "center",
                letterSpacing: "8px",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "14px",
                border: "none",
                borderRadius: "8px",
                background: "#16a34a",
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Verify OTP & Login
            </button>

            <button
              type="button"
              onClick={sendOtp}
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "11px",
                border: "none",
                background: "transparent",
                color: "#2563eb",
                cursor: "pointer",
              }}
            >
              Resend OTP
            </button>

            <button
              type="button"
              onClick={changeMobileNumber}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                color: "#666",
                cursor: "pointer",
              }}
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <div
          style={{
            marginTop: "25px",
            padding: "12px",
            background: "#fff7ed",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "13px",
            color: "#9a3412",
          }}
        >
          Demo Login: Use OTP <strong>123456</strong>
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
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;