import "./Hero.css";

function Hero() {
  function scrollToProducts() {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  function scrollToCategories() {
    document
      .getElementById("categories")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  return (
    <section className="bk-home-hero">
      <div className="bk-hero-main">
        <div className="bk-hero-content">
          <span className="bk-hero-offer">
            ⚡ BIJLIKART ELECTRONICS SALE
          </span>

          <h1>
            Upgrade Your Home
            <br />
            With Smarter Electronics
          </h1>

          <p>
            Shop TVs, ACs, refrigerators,
            mobiles, laptops and more from
            trusted electronics sellers.
          </p>

          <div className="bk-hero-buttons">
            <button
              className="bk-shop-now"
              onClick={scrollToProducts}
            >
              Shop Now →
            </button>

            <button
              className="bk-browse-categories"
              onClick={scrollToCategories}
            >
              Browse Categories
            </button>
          </div>

          <div className="bk-hero-benefits">
            <span>✓ Trusted Sellers</span>
            <span>✓ Local Deals</span>
            <span>✓ Fast Delivery</span>
          </div>
        </div>

        <div className="bk-hero-image-area">
          <div className="bk-discount-circle">
            <small>UP TO</small>
            <strong>40%</strong>
            <span>OFF</span>
          </div>

          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200"
            alt="Electronics deals on BIJLIKART"
          />
        </div>
      </div>

      <div className="bk-quick-cards">
        <div
          className="bk-quick-card"
          onClick={scrollToCategories}
        >
          <span>📺</span>
          <div>
            <strong>Smart TVs</strong>
            <small>Top brands & deals</small>
          </div>
        </div>

        <div
          className="bk-quick-card"
          onClick={scrollToCategories}
        >
          <span>❄️</span>
          <div>
            <strong>Air Conditioners</strong>
            <small>Beat the heat</small>
          </div>
        </div>

        <div
          className="bk-quick-card"
          onClick={scrollToCategories}
        >
          <span>📱</span>
          <div>
            <strong>Mobiles</strong>
            <small>Latest smartphones</small>
          </div>
        </div>

        <div
          className="bk-quick-card"
          onClick={scrollToCategories}
        >
          <span>💻</span>
          <div>
            <strong>Laptops</strong>
            <small>Work & gaming</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;