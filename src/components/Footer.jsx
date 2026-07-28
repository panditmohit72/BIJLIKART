import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function goToProducts() {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  function goToCategories() {
    document
      .getElementById("categories")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  return (
    <footer className="bk-footer">

      {/* BACK TO TOP */}

      <button
        type="button"
        className="bk-back-top"
        onClick={backToTop}
      >
        Back to top
      </button>

      {/* MAIN FOOTER */}

      <div className="bk-footer-main">
        <div className="bk-footer-grid">

          {/* BIJLIKART */}

          <div className="bk-footer-column bk-footer-about">
            <h3>⚡ BIJLIKART</h3>

            <p>
              Your electronics marketplace for TVs,
              ACs, refrigerators, mobiles, laptops,
              washing machines and more.
            </p>

            <span>
              Shop electronics from trusted sellers.
            </span>
          </div>

          {/* SHOP */}

          <div className="bk-footer-column">
            <h4>Shop</h4>

            <button onClick={goToProducts}>
              Today's Deals
            </button>

            <button onClick={goToCategories}>
              Mobiles
            </button>

            <button onClick={goToCategories}>
              Televisions
            </button>

            <button onClick={goToCategories}>
              Air Conditioners
            </button>

            <button onClick={goToCategories}>
              Refrigerators
            </button>

            <button onClick={goToCategories}>
              Laptops
            </button>
          </div>

          {/* CUSTOMER */}

          <div className="bk-footer-column">
            <h4>Customer Service</h4>

            <button
              onClick={() => navigate("/login")}
            >
              Your Account
            </button>

            <button type="button">
              Your Orders
            </button>

            <button type="button">
              Returns & Refunds
            </button>

            <button type="button">
              Delivery Information
            </button>

            <button type="button">
              Help & Support
            </button>
          </div>

          {/* SELLERS */}

          <div className="bk-footer-column">
            <h4>Sell on BIJLIKART</h4>

            <button
              onClick={() =>
                navigate("/seller-register")
              }
            >
              Become a Seller
            </button>

            <button
              onClick={() =>
                navigate("/seller-login")
              }
            >
              Seller Login
            </button>

            <button type="button">
              Seller Information
            </button>

            <button type="button">
              Commission & Fees
            </button>

            <button type="button">
              Seller Support
            </button>
          </div>

        </div>
      </div>

      {/* BRAND STRIP */}

      <div className="bk-footer-brand">
        <div
          className="bk-footer-logo"
          onClick={() => navigate("/")}
        >
          ⚡ BIJLIKART
        </div>

        <span>Electronics Marketplace</span>
      </div>

      {/* BOTTOM */}

      <div className="bk-footer-bottom">
        <div className="bk-footer-bottom-links">
          <button type="button">
            Conditions of Use
          </button>

          <button type="button">
            Privacy Notice
          </button>

          <button type="button">
            Terms & Conditions
          </button>
        </div>

        <p>
          © {new Date().getFullYear()} BIJLIKART.
          All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;