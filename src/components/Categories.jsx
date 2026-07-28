import "./Categories.css";

function Categories() {
  const categories = [
    {
      icon: "📱",
      name: "Mobiles",
      offer: "Latest smartphones",
    },
    {
      icon: "📺",
      name: "Televisions",
      offer: "Up to 40% off",
    },
    {
      icon: "❄️",
      name: "Air Conditioners",
      offer: "Best summer deals",
    },
    {
      icon: "🧊",
      name: "Refrigerators",
      offer: "Energy efficient",
    },
    {
      icon: "🧺",
      name: "Washing Machines",
      offer: "Top load & front load",
    },
    {
      icon: "💻",
      name: "Laptops",
      offer: "Work & gaming",
    },
    {
      icon: "🎧",
      name: "Headphones",
      offer: "Starting ₹999",
    },
    {
      icon: "🔊",
      name: "Speakers",
      offer: "Great sound deals",
    },
  ];

  function goToProducts() {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  return (
    <section
      className="bk-categories-section"
      id="categories"
    >
      <div className="bk-categories-container">
        <div className="bk-section-heading">
          <div>
            <h2>Shop by Category</h2>

            <p>
              Everything electronics, all in one place
            </p>
          </div>

          <button onClick={goToProducts}>
            See all products →
          </button>
        </div>

        <div className="bk-category-market-grid">
          {categories.map((category) => (
            <div
              className="bk-category-market-card"
              key={category.name}
              onClick={goToProducts}
            >
              <div className="bk-category-icon">
                {category.icon}
              </div>

              <div className="bk-category-content">
                <h3>{category.name}</h3>
                <p>{category.offer}</p>

                <span>
                  Shop now ›
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bk-deal-strip">
          <div className="bk-deal-strip-icon">
            ⚡
          </div>

          <div className="bk-deal-strip-text">
            <strong>
              BIJLIKART Deals
            </strong>

            <span>
              Discover electronics offers from
              trusted local sellers
            </span>
          </div>

          <button onClick={goToProducts}>
            Explore Deals →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Categories;