import "./BasicDetails.css";

export default function BasicDetails({
  formData,
  errors,
  onChange,
  onNext,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onNext) {
      onNext();
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    onChange({
      target: {
        name: "mobile",
        value,
        type: "text",
      },
    });
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    onChange({
      target: {
        name: "pincode",
        value,
        type: "text",
      },
    });
  };

  const handleGstinChange = (e) => {
    const value = e.target.value
      .toUpperCase()
      .replace(/\s/g, "")
      .slice(0, 15);

    onChange({
      target: {
        name: "gstin",
        value,
        type: "text",
      },
    });
  };

  return (
    <form
      className="basic-details"
      onSubmit={handleSubmit}
    >
      {/* =========================
          SECTION HEADER
      ========================== */}

      <div className="section-header">
        <h2>Basic Shop Details</h2>

        <p>
          Tell us about your electronics shop and business.
          These details will be used for your BIJLIKART
          seller account.
        </p>
      </div>

      {/* =========================
          SHOP INFORMATION
      ========================== */}

      <div className="form-grid">
        {/* SHOP NAME */}

        <div className="form-group">
          <label>
            Shop Name *
          </label>

          <input
            type="text"
            name="shopName"
            placeholder="Example: Sharma Electronics"
            value={formData?.shopName || ""}
            onChange={onChange}
            autoComplete="organization"
          />

          {errors?.shopName && (
            <span className="error">
              {errors.shopName}
            </span>
          )}
        </div>

        {/* OWNER NAME */}

        <div className="form-group">
          <label>
            Owner Name *
          </label>

          <input
            type="text"
            name="ownerName"
            placeholder="Enter owner's full name"
            value={formData?.ownerName || ""}
            onChange={onChange}
            autoComplete="name"
          />

          {errors?.ownerName && (
            <span className="error">
              {errors.ownerName}
            </span>
          )}
        </div>

        {/* MOBILE */}

        <div className="form-group">
          <label>
            Mobile Number *
          </label>

          <input
            type="tel"
            name="mobile"
            placeholder="10-digit mobile number"
            value={formData?.mobile || ""}
            onChange={handleMobileChange}
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
          />

          {errors?.mobile && (
            <span className="error">
              {errors.mobile}
            </span>
          )}
        </div>

        {/* EMAIL */}

        <div className="form-group">
          <label>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="business@example.com"
            value={formData?.email || ""}
            onChange={onChange}
            autoComplete="email"
          />

          {errors?.email && (
            <span className="error">
              {errors.email}
            </span>
          )}
        </div>

        {/* GSTIN */}

        <div className="form-group">
          <label>
            GSTIN
            <span className="optional-text">
              {" "}(Optional)
            </span>
          </label>

          <input
            type="text"
            name="gstin"
            placeholder="Enter 15-digit GSTIN"
            value={formData?.gstin || ""}
            onChange={handleGstinChange}
            maxLength={15}
          />

          {errors?.gstin && (
            <span className="error">
              {errors.gstin}
            </span>
          )}
        </div>

        {/* CATEGORY */}

        <div className="form-group">
          <label>
            Main Product Category *
          </label>

          <select
            name="category"
            value={formData?.category || ""}
            onChange={onChange}
          >
            <option value="">
              Select Category
            </option>

            <option value="Multi Brand Electronics">
              Multi Brand Electronics
            </option>

            <option value="TV & Home Entertainment">
              TV & Home Entertainment
            </option>

            <option value="AC & Cooling">
              AC & Cooling
            </option>

            <option value="Refrigerator">
              Refrigerator
            </option>

            <option value="Washing Machine">
              Washing Machine
            </option>

            <option value="Home Appliances">
              Home Appliances
            </option>

            <option value="Laptop & Computer">
              Laptop & Computer
            </option>

            <option value="Mobile & Accessories">
              Mobile & Accessories
            </option>

            <option value="Kitchen Appliances">
              Kitchen Appliances
            </option>

            <option value="Other Electronics">
              Other Electronics
            </option>
          </select>

          {errors?.category && (
            <span className="error">
              {errors.category}
            </span>
          )}
        </div>
      </div>

      {/* =========================
          SHOP ADDRESS
      ========================== */}

      <div className="subsection-title">
        <h3>
          📍 Shop Address
        </h3>

        <p>
          Enter the physical location of your shop.
        </p>
      </div>

      <div className="form-group full-width">
        <label>
          Complete Shop Address *
        </label>

        <textarea
          name="address"
          rows="4"
          placeholder="Shop number, market, road, landmark..."
          value={formData?.address || ""}
          onChange={onChange}
        />

        {errors?.address && (
          <span className="error">
            {errors.address}
          </span>
        )}
      </div>

      <div className="form-grid">
        {/* CITY */}

        <div className="form-group">
          <label>
            City *
          </label>

          <input
            type="text"
            name="city"
            placeholder="Mathura"
            value={formData?.city || ""}
            onChange={onChange}
            autoComplete="address-level2"
          />

          {errors?.city && (
            <span className="error">
              {errors.city}
            </span>
          )}
        </div>

        {/* STATE */}

        <div className="form-group">
          <label>
            State *
          </label>

          <select
            name="state"
            value={formData?.state || ""}
            onChange={onChange}
          >
            <option value="">
              Select State
            </option>

            <option value="Uttar Pradesh">
              Uttar Pradesh
            </option>
          </select>

          {errors?.state && (
            <span className="error">
              {errors.state}
            </span>
          )}
        </div>

        {/* PINCODE */}

        <div className="form-group">
          <label>
            PIN Code *
          </label>

          <input
            type="text"
            name="pincode"
            placeholder="281001"
            value={formData?.pincode || ""}
            onChange={handlePincodeChange}
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
          />

          {errors?.pincode && (
            <span className="error">
              {errors.pincode}
            </span>
          )}
        </div>
      </div>

      {/* =========================
          DELIVERY PREFERENCE
      ========================== */}

      <div className="subsection-title">
        <h3>
          🚚 Delivery Preference
        </h3>

        <p>
          Choose how orders from your shop should be
          delivered to customers.
        </p>
      </div>

      <div className="delivery-options">
        {/* SELLER DELIVERY */}

        <label
          className={`delivery-option ${
            formData?.delivery === "seller"
              ? "selected"
              : ""
          }`}
        >
          <input
            type="radio"
            name="delivery"
            value="seller"
            checked={
              formData?.delivery === "seller"
            }
            onChange={onChange}
          />

          <div className="delivery-content">
            <div className="delivery-icon">
              🏪
            </div>

            <div>
              <strong>
                Seller Delivery
              </strong>

              <p>
                My shop will deliver customer orders
                directly.
              </p>
            </div>
          </div>
        </label>

        {/* BIJLIKART DELIVERY */}

        <label
          className={`delivery-option ${
            formData?.delivery === "bijlikart"
              ? "selected"
              : ""
          }`}
        >
          <input
            type="radio"
            name="delivery"
            value="bijlikart"
            checked={
              formData?.delivery === "bijlikart"
            }
            onChange={onChange}
          />

          <div className="delivery-content">
            <div className="delivery-icon">
              ⚡
            </div>

            <div>
              <strong>
                BIJLIKART Delivery
              </strong>

              <p>
                Use BIJLIKART delivery service when it
                becomes available in your area.
              </p>
            </div>
          </div>
        </label>
      </div>

      {errors?.delivery && (
        <span className="error">
          {errors.delivery}
        </span>
      )}

      {/* =========================
          NEXT BUTTON
      ========================== */}

      <div className="button-row basic-button-row">
        <button
          type="submit"
          className="next-btn"
        >
          Save & Continue →
        </button>
      </div>
    </form>
  );
}