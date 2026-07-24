import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <h2>⚡ BIJLIKART</h2>
        <p>by Mohit Sharma</p>
      </div>

      <input
        type="text"
        placeholder="Search AC, TV, Fridge, Cooler..."
      />

      <div className="nav-buttons">
        <button onClick={() => navigate("/login")}>
          Login
        </button>

        <button onClick={() => navigate("/cart")}>
          🛒 Cart
        </button>
      </div>
    </nav>
  );
}

export default Navbar;