import "./Brands.css";

function Brands() {
  const brands = [
    {
      name: "Samsung",
      text: "TVs, Mobiles & Appliances",
    },
    {
      name: "LG",
      text: "ACs, TVs & Home Appliances",
    },
    {
      name: "Sony",
      text: "TVs, Audio & Entertainment",
    },
    {
      name: "Whirlpool",
      text: "Refrigerators & Washing Machines",
    },
    {
      name: "Haier",
      text: "ACs & Home Appliances",
    },
    {
      name: "HP",
      text: "Laptops & Computers",
    },
    {
      name: "Dell",
      text: "Laptops & Accessories",
    },
    {
      name: "Lenovo",
      text: "Laptops & Tablets",
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
    <section className="bk-brands-section">
      <div className="bk-brands-container">
        <div className="bk-brands-heading">
          <div>
            <h2>Shop by Top Brands</h2>
            <p>
              Explore electronics from popular brands
            </p>
          </div>

          <button
            type="button"
            onClick={goToProducts}
          >
            See all brands →
          </button>
        </div>

        <div className="bk-brands-grid">
          {brands.map((brand) => (
            <div
              className="bk-brand-box"
              key={brand.name}
              onClick={goToProducts}
            >
              <div className="bk-brand-name">
                {brand.name}
              </div>

              <p>{brand.text}</p>

              <span>Shop now ›</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Brands;