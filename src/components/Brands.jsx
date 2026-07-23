import "./Brands.css";

function Brands() {
  const brands = [
    "Samsung",
    "LG",
    "Sony",
    "Whirlpool",
    "Haier",
    "HP",
    "Dell",
    "Lenovo",
  ];

  return (
    <section className="brands">
      <h2>Top Brands</h2>

      <div className="brand-grid">
        {brands.map((brand) => (
          <div className="brand-card" key={brand}>
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Brands;