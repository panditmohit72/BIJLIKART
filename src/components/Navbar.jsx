import "./Navbar.css";
function Navbar() {
  return (
    <nav
      style={{
        background: "#0f172a",
        color: "white",
        padding: "18px 50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="brand">
<h2 className="brand-name">⚡ BIJLIKART</h2>
  <p className="brand-owner">Founded by Mohit Sharma</p>
</div>

      <input
  type="text"
  placeholder="🔍 Search TVs, ACs, Fridge..."
  style={{
    width: "420px",
    padding: "12px 18px",
    borderRadius: "30px",
    border: "none",
    outline: "none",
    fontSize: "16px",
  }}
/>

      <div className="nav-buttons">
  <button className="login-btn">👤 Login</button>
  <button className="cart-btn-navbar">
    🛒 Cart <span className="cart-count">0</span>
  </button>
</div>
    </nav>
  );
}

export default Navbar;