import "./ReviewSubmit.css";

export default function ReviewSubmit({
  formData,
  onBack,
  onSubmit,
  loading = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit();
    }
  };

  const getFileName = (file) => {
    if (!file) return "Not Uploaded";
    if (typeof file === "string") return file;
    return file.name || "Uploaded";
  };

  return (
    <form className="review-submit" onSubmit={handleSubmit}>
      <div className="review-header">
        <div className="review-icon">✅</div>

        <h2>Review & Submit</h2>

        <p>
          Please verify all the information before submitting your seller
          registration.
        </p>
      </div>

      {/* Basic Details */}
      <div className="review-card">
        <h3>Basic Details</h3>

        <div className="review-grid">
          <div>
            <span>Product Name</span>
            <strong>{formData?.productName || "-"}</strong>
          </div>

          <div>
            <span>Brand</span>
            <strong>{formData?.brand || "-"}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{formData?.category || "-"}</strong>
          </div>

          <div>
            <span>Model</span>
            <strong>{formData?.model || "-"}</strong>
          </div>
        </div>

        <div className="review-description">
          <span>Description</span>

          <p>{formData?.description || "-"}</p>
        </div>
      </div>

      {/* Bank */}
      <div className="review-card">
        <h3>Bank Details</h3>

        <div className="review-grid">
          <div>
            <span>Account Holder</span>
            <strong>{formData?.accountHolder || "-"}</strong>
          </div>

          <div>
            <span>Bank Name</span>
            <strong>{formData?.bankName || "-"}</strong>
          </div>

          <div>
            <span>Account Number</span>
            <strong>{formData?.accountNumber || "-"}</strong>
          </div>

          <div>
            <span>IFSC</span>
            <strong>{formData?.ifsc || "-"}</strong>
          </div>

          <div>
            <span>Branch</span>
            <strong>{formData?.branch || "-"}</strong>
          </div>
        </div>
      </div>

      {/* OTP */}
      <div className="review-card">
        <h3>Verification</h3>

        <div className="review-grid">
          <div>
            <span>Mobile Number</span>
            <strong>{formData?.mobile || "-"}</strong>
          </div>

          <div>
            <span>OTP Status</span>
            <strong className="verified">Verified ✅</strong>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="review-card">
        <h3>Uploaded Documents</h3>

        <div className="review-grid">
          <div>
            <span>GST Certificate</span>
            <strong>{getFileName(formData?.gstCertificate)}</strong>
          </div>

          <div>
            <span>PAN Card</span>
            <strong>{getFileName(formData?.panCard)}</strong>
          </div>

          <div>
            <span>Aadhaar Card</span>
            <strong>{getFileName(formData?.aadhaarCard)}</strong>
          </div>

          <div>
            <span>Shop Photo</span>
            <strong>{getFileName(formData?.shopPhoto)}</strong>
          </div>
        </div>
      </div>

      <div className="agreement-box">
        <p>
          By clicking <strong>Submit Registration</strong>, you confirm that
          all the information provided is true and correct. BIJLIKART may
          verify your details before approving your seller account.
        </p>
      </div>

      <div className="button-row">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Registration 🚀"}
        </button>
      </div>
    </form>
  );
}