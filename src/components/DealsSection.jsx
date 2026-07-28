import "./DealsSection.css";

import samsungTV from "../assets/products/samsung-tv.jpg";
import lgAC from "../assets/products/lg-ac.jpg";
import whirlpoolFridge from "../assets/products/whirlpool-fridge.jpg";
import hpLaptop from "../assets/products/hp-laptop.jpg";

function DealsSection({ addToCart }) {
  const deals = [
    {
      id: 1,
      name: "Samsung 55 inch 4K Smart TV",
      image: samsungTV,
      price: 49999,
      oldPrice: 59999,
      discount: "17% off",
    },
    {
      id: 2,
      name: "LG 1.5 Ton 5 Star Inverter AC",
      image: lgAC,
      price: 39999,
      oldPrice: 45999,
      discount: "13% off",
    },
    {
      id: 3,
      name: "Whirlpool 265L Double Door Fridge",
      image: whirlpoolFridge,
      price: 27999,
      oldPrice: 32999,
      discount: "15% off",
    },
    {
      id: 4,
      name: "HP 15 Intel Core i5 Laptop",
      image: hpLaptop,
      price: 62999,
      oldPrice: 71999,
      discount: "12% off",
    },
    {
      id: 5,
      name: "Samsung Smart TV Special Deal",
      image: samsungTV,
      price: 44999,
      oldPrice: 54999,
      discount: "18% off",
    },
    {
      id: 6,
      name: "LG Inverter AC Special Offer",
      image: lgAC,
      price: 36999,
      oldPrice: 42999,
      discount: "14% off",
    },
  ];

  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN").format(price);
  }

  return (
    <section className="deals-section">
      <div className="deals-title-row">
        <h2>Today's Deals</h2>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          See all deals
        </button>
      </div>

      <div className="deals-scroll">
        {deals.map((deal) => (
          <div className="deal-card" key={deal.id}>
            <div className="deal-image-box">
              <img src={deal.image} alt={deal.name} />
            </div>

            <div className="deal-offer-row">
              <span className="deal-discount">
                {deal.discount}
              </span>

              <strong>Limited time deal</strong>
            </div>

            <div className="deal-price">
              <span className="deal-rupee">₹</span>
              <strong>{formatPrice(deal.price)}</strong>
            </div>

            <div className="deal-mrp">
              M.R.P.:
              <span>₹{formatPrice(deal.oldPrice)}</span>
            </div>

            <p>{deal.name}</p>

            <button
              type="button"
              className="deal-cart-button"
              onClick={() => addToCart?.(deal)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DealsSection;