import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [staffMember, setStaffMember] = useState(null);

  // =========================
  // DEMO STAFF DATABASE
  // =========================

  const demoStaff = [
    {
      name: "Aman Sharma",
      mobile: "8888888888",
      role: "operations",
      roleName: "Operations Staff",
    },
    {
      name: "Rohit Verma",
      mobile: "7777777777",
      role: "products",
      roleName: "Product Staff",
    },
    {
      name: "Neeraj Singh",
      mobile: "6666666666",
      role: "support",
      roleName: "Support Staff",
    },
  ];

  const DEMO_OTP = "123456";

  // =========================
  // SEND OTP
  // =========================

  function sendOtp() {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const employee = demoStaff.find(
      (staff) => staff.mobile === mobile
    );

    if (!employee) {
      alert(
        "This mobile number is not registered as BIJLIKART Staff."
      );
      return;
    }

    setStaffMember(employee);
    setOtpSent(true);

    alert(
      `Demo OTP sent to ${employee.name}!\n\nDemo OTP: 123456`
    );
  }

  // =========================
  // VERIFY OTP
  // =========================

  function verifyOtp(e) {
    e.preventDefault();

    if (!staffMember) {
      alert("Staff account not found.");
      return;
    }

    if (otp !== DEMO_OTP) {
      alert("Incorrect OTP.");
      return;
    }

    // Remove any existing Owner login.
    // Staff should never inherit Owner access.

    localStorage.removeItem("bijlikartAdminAuth");
    localStorage.removeItem("bijlikartAdminRole");

    // Save Staff login

    localStorage.setItem(
      "bijlikartStaffAuth",
      "true"
    );

    localStorage.setItem(
      "bijlikartStaffRole",
      staffMember.role
    );

    localStorage.setItem(
      "bijlikartStaffName",
      staffMember.name
    );

    alert(
      `Welcome ${staffMember.name}!\nRole: ${staffMember.roleName}`
    );

    // Go to Staff Dashboard

    navigate("/staff", {
      replace: true,
    });
  }

  // =========================
  // CHANGE MOBILE NUMBER
  // =========================

  function changeNumber() {
    setMobile("");
    setOtp("");
    setOtpSent(false);
    setStaffMember(null);
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
          maxWidth: "440px",
          background: "white",
          padding: "35px",
          borderRadius: "16px",
          boxShadow:
            "0 5px 25px rgba(0,0,0,0.10)",
        }}
      >
        {/* LOGO */}

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
              marginTop: "0",
              color: "#777",
            }}
          >
            Management System
          </p>

          <h2>👨‍💼 Staff Login</h2>

          <p
            style={{
              color: "#666",
            }}
          >
            Login using your registered employee mobile number
          </p>
        </div>

        {/* MOBILE SCREEN */}

        {!otpSent ? (
          <>
            <label style={labelStyle}>
              Employee Mobile Number
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
                placeholder="Registered mobile number"
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
              type="button"
              onClick={sendOtp}
              style={primaryButton}
            >
              Send Staff OTP
            </button>
          </>
        ) : (
          /* OTP SCREEN */

          <form onSubmit={verifyOtp}>
            <div
              style={{
                background: "#eff6ff",
                padding: "15px",
                borderRadius: "9px",
                marginBottom: "20px",
              }}
            >
              <strong>
                {staffMember?.name}
              </strong>

              <br />

              <span
                style={{
                  color: "#555",
                  fontSize: "14px",
                }}
              >
                {staffMember?.roleName}
              </span>
            </div>

            <p
              style={{
                textAlign: "center",
                color: "#555",
              }}
            >
              OTP sent to
              <br />

              <strong>
                +91 {mobile}
              </strong>
            </p>

            <label style={labelStyle}>
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
                width: "100%",
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
              Verify OTP & Login
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

        {/* DEMO DETAILS */}

        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            background: "#fff7ed",
            borderRadius: "9px",
            fontSize: "13px",
            color: "#9a3412",
          }}
        >
          <strong>Demo Staff Accounts</strong>

          <br />
          <br />

          Operations Staff:
          <strong> 8888888888</strong>

          <br />

          Product Staff:
          <strong> 7777777777</strong>

          <br />

          Support Staff:
          <strong> 6666666666</strong>

          <br />
          <br />

          Demo OTP:
          <strong> 123456</strong>
        </div>

        <button
          type="button"
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

// =========================
// STYLES
// =========================

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "8px",
};

const inputStyle = {
  flex: 1,
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

export default StaffLogin;