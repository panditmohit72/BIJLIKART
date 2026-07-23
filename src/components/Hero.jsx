import "./Hero.css";
function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
    <h1>
  Welcome to <span className="brand-highlight">BIJLIKART</span>
</h1>

        <p>
          Buy TVs, ACs, Refrigerators, Washing Machines, Laptops and Mobiles
          from trusted local electronics stores across India.
        </p>

        <button>Explore Products</button>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700"
          alt="Electronics"
        />
      </div>
    </section>
  );
}

export default Hero;