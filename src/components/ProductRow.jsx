import "./ProductRow.css";
import { useNavigate } from "react-router-dom";

function ProductRow({
  title,
  subtitle,
  products = [],
  addToCart,
}) {
  const navigate = useNavigate();

  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN").format(price);
  }

  function openProduct(product) {
    navigate(`/product/${product.id}`);
  }

  return (
    <section className="bk-product-row-section">
      <div className="bk-product-row-heading">
        <div>
          <h2>{title}</h2>

          {subtitle && (
            <p>{subtitle}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          See all
        </button>
      </div>

      <div className="bk-product-row-scroll">
        {products.map((product) => (
          <article
            className="bk-row-product-card"
            key={product.id}
          >
            <div
              className="bk-row-product-image"
              onClick={() => openProduct(product)}
            >
              {product.discount && (
                <span className="bk-row-discount">
                  {product.discount}
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <h3
              onClick={() => openProduct(product)}
            >
              {product.name}
            </h3>

            {product.rating && (
              <div className="bk-row-rating">
                ⭐ {product.rating}

                {product.reviews && (
                  <span>
                    ({product.reviews})
                  </span>
                )}
              </div>
            )}

            <div className="bk-row-price">
              <sup>₹</sup>
              <strong>
                {formatPrice(product.price)}
              </strong>
            </div>

            {product.oldPrice && (
              <div className="bk-row-mrp">
                M.R.P.:{" "}
                <span>
                  ₹{formatPrice(product.oldPrice)}
                </span>
              </div>
            )}

            {product.delivery && (
              <div className="bk-row-delivery">
                {product.delivery}
              </div>
            )}

            <button
              type="button"
              className="bk-row-cart-button"
              onClick={() =>
                addToCart?.(product)
              }
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductRow;