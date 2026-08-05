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

  return (
    <form className="basic-details" onSubmit={handleSubmit}>
      <div className="section-header">
        <h2>Basic Details</h2>
        <p>
          Fill in the basic information about your product.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="productName"
            placeholder="Enter product name"
            value={formData?.productName || ""}
            onChange={onChange}
          />
          {errors?.productName && (
            <span className="error">{errors.productName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Brand *</label>
          <input
            type="text"
            name="brand"
            placeholder="Samsung, LG, Sony..."
            value={formData?.brand || ""}
            onChange={onChange}
          />
          {errors?.brand && (
            <span className="error">{errors.brand}</span>
          )}
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData?.category || ""}
            onChange={onChange}
          >
            <option value="">Select Category</option>
            <option value="AC">Air Conditioner</option>
            <option value="TV">Television</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Washing Machine">Washing Machine</option>
            <option value="Cooler">Cooler</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Kitchen">Kitchen Appliances</option>
            <option value="Other">Other</option>
          </select>
          {errors?.category && (
            <span className="error">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label>Model Number</label>
          <input
            type="text"
            name="model"
            placeholder="Enter model number"
            value={formData?.model || ""}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Short Description</label>
        <textarea
          name="description"
          rows="5"
          placeholder="Describe your product..."
          value={formData?.description || ""}
          onChange={onChange}
        />
      </div>

      <div className="button-row">
        <button type="submit" className="next-btn">
          Continue →
        </button>
      </div>
    </form>
  );
}