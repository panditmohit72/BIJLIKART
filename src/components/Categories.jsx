import "./Categories.css";
function Categories() {
  const categories = [
    { icon: "📺", name: "TV" },
    { icon: "❄️", name: "AC" },
    { icon: "🧊", name: "Fridge" },
    { icon: "🧺", name: "Washing Machine" },
    { icon: "💻", name: "Laptop" },
    { icon: "📱", name: "Mobile" },
    { icon: "🎧", name: "Headphones" },
    { icon: "🔊", name: "Speaker" },
  ];

  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <div className="category-grid">
        {categories.map((item) => (
          <div className="category-card" key={item.name}>
            <div className="icon">{item.icon}</div>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;