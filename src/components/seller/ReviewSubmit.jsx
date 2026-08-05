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

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "-";

    const value = String(accountNumber);

    if (value.length <= 4) {
      return value;
    }

    return `••••••••${value.slice(-4)}`;
  };

  return (
    <form
      className="review-submit"
      onSubmit={handleSubmit}
    >
      {/* =========================
          HEADER
      ========================== */}

      <div className="review-header">
        <div className="review-icon">
          ✅
        </div>

        <h2>Review & Submit</h2>

        <p>
          Please verify your seller information before
          submitting your BIJLIKART registration.
        </p>
      </div>

      {/* =========================
          SHOP DETAILS
      ========================== */}

      <div className="review-card">
        <h3>🏪 Shop Details</h3>

        <div className="review-grid">
          <div>
            <span>Shop Name</span>

            <strong>
              {formData?.shopName || "-"}
            </strong>
          </div>

          <div>
            <span>Owner Name</span>

            <strong>
              {formData?.ownerName || "-"}
            </strong>
          </div>

          <div>
            <span>Mobile Number</span>

            <strong>
              {formData?.mobile || "-"}
            </strong>
          </div>

          <div>
            <span>Email Address</span>

            <strong>
              {formData?.email || "Not Provided"}
            </strong>
          </div>

          <div>
            <span>GSTIN</span>

            <strong>
              {formData?.gstin || "Not Provided"}
            </strong>
          </div>

          <div>
            <span>Main Category</span>

            <strong>
              {formData?.category || "-"}
            </strong>
          </div>
        </div>
      </div>

      {/* =========================
          SHOP ADDRESS
      ========================== */}

      <div className="review-card">
        <h3>📍 Shop Address</h3>

        <div className="review-grid">
          <div>
            <span>City</span>

            <strong>
              {formData?.city || "-"}
            </strong>
          </div>

          <div>
            <span>State</span>

            <strong>
              {formData?.state || "-"}
            </strong>
          </div>

          <div>
            <span>PIN Code</span>

            <strong>
              {formData?.pincode || "-"}
            </strong>
          </div>

          <div>
            <span>Delivery Preference</span>

            <strong>
              {formData?.delivery === "bijlikart"
                ? "BIJLIKART Delivery"
                : "Seller Delivery"}
            </strong>
          </div>
        </div>

        <div className="review-description">
          <span>Complete Address</span>

          <p>
            {formData?.address || "-"}
          </p>
        </div>
      </div>

      {/* =========================
          BANK DETAILS
      ========================== */}

      <div className="review-card">
        <h3>🏦 Bank Details</h3>

        <div className="review-grid">
          <div>
            <span>Account Holder</span>

            <strong>
              {formData?.accountHolder || "-"}
            </strong>
          </div>

          <div>
            <span>Bank Name</span>

            <strong>
              {formData?.bankName || "-"}
            </strong>
          </div>

          <div>
            <span>Account Number</span>

            <strong>
              {maskAccountNumber(
                formData?.accountNumber
              )}
            </strong>
          </div>

          <div>
            <span>IFSC Code</span>

            <strong>
              {formData?.ifsc || "-"}
            </strong>
          </div>

          <div>
            <span>Branch</span>

            <strong>
              {formData?.branch || "Not Provided"}
            </strong>
          </div>
        </div>
      </div>

      {/* =========================
          OTP VERIFICATION
      ========================== */}

      <div className="review-card">
        <h3>📱 Mobile Verification</h3>

        <div className="review-grid">
          <div>
            <span>Registered Mobile</span>

            <strong>
              {formData?.mobile || "-"}
            </strong>
          </div>

          <div>
            <span>OTP Status</span>

            <strong className="verified">
              {formData?.otpVerified
                ? "Verified ✅"
                : "Verified ✅"}
            </strong>
          </div>
        </div>
      </div>

      {/* =========================
          SELLER AGREEMENT
      ========================== */}

      <div className="review-card">
        <h3>📄 Seller Agreement</h3>

        <div className="review-grid">
          <div>
            <span>Agreement Status</span>

            <strong className="verified">
              {formData?.agreementAccepted
                ? "Accepted ✅"
                : "Not Accepted"}
            </strong>
          </div>
        </div>
      </div>

      {/* =========================
          DOCUMENTS
      ========================== */}

      <div className="review-card">
        <h3>📂 Uploaded Documents</h3>

        <div className="review-grid">
          <div>
            <span>GST Certificate</span>

            <strong>
              {getFileName(
                formData?.gstCertificate
              )}
            </strong>
          </div>

          <div>
            <span>PAN Card</span>

            <strong>
              {getFileName(
                formData?.panCard
              )}
            </strong>
          </div>

          <div>
            <span>Aadhaar Card</span>

            <strong>
              {getFileName(
                formData?.aadhaarCard
              )}
            </strong>
          </div>

          <div>
            <span>Shop Photo</span>

            <strong>
              {getFileName(
                formData?.shopPhoto
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* =========================
          FINAL CONFIRMATION
      ========================== */}

      <div className="agreement-box">
        <p>
          By clicking{" "}
          <strong>
            Submit Registration
          </strong>
          , you confirm that the information provided is
          true and correct. BIJLIKART may verify your
          identity, business information, bank details and
          submitted documents before activating your seller
          account.
        </p>
      </div>

      {/* =========================
          BUTTONS
      ========================== */}

      <div className="button-row">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
          disabled={loading}
        >
          ← Back
        </button>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : "Submit Registration 🚀"}
        </button>
      </div>
    </form>
  );
}