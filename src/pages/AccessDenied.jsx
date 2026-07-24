import { useNavigate } from "react-router-dom";

function AccessDenied() {
  const navigate = useNavigate();

  const staffLoggedIn =
    localStorage.getItem("bijlikartStaffAuth") === "true";

  function goBack() {
    if (staffLoggedIn) {
      navigate("/staff");
    } else {
      navigate("/");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "45px 30px",
          borderRadius: "18px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            fontSize: "65px",
            marginBottom: "15px",
          }}
        >
          🔒
        </div>

        <h1
          style={{
            color: "#dc2626",
            marginBottom: "10px",
          }}
        >
          Access Denied
        </h1>

        <h3
          style={{
            color: "#1f2937",
          }}
        >
          Owner Permission Required
        </h3>

        <p
          style={{
            color: "#6b7280",
            lineHeight: "1.6",
            marginTop: "15px",
          }}
        >
          You do not have permission to access this
          section of the BIJLIKART management system.
        </p>

        <div
          style={{
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: "10px",
            padding: "15px",
            marginTop: "25px",
            color: "#9a3412",
          }}
        >
          👑 Team & Permissions, Commission,
          settlements and sensitive settings are
          restricted to the Owner.
        </div>

        <button
          onClick={goBack}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "9px",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ← Go Back
        </button>

        <button
          onClick={() => {
            localStorage.removeItem(
              "bijlikartStaffAuth"
            );

            localStorage.removeItem(
              "bijlikartStaffRole"
            );

            localStorage.removeItem(
              "bijlikartStaffName"
            );

            navigate("/staff-login", {
              replace: true,
            });
          }}
          style={{
            marginTop: "12px",
            border: "none",
            background: "transparent",
            color: "#6b7280",
            cursor: "pointer",
          }}
        >
          Staff Logout
        </button>
      </div>
    </div>
  );
}

export default AccessDenied;