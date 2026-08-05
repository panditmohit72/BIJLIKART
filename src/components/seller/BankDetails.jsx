import "./BankDetails.css";

export default function BankDetails({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (onNext) {
      onNext();
    }
  };

  return (
    <form className="bank-details" onSubmit={handleSubmit}>
      <div className="section-header">
        <h2>Bank Details</h2>
        <p>
          Enter your bank account details for seller payments and settlements.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Account Holder Name *</label>
          <input
            type="text"
            name="accountHolder"
            placeholder="Enter account holder name"
            value={formData?.accountHolder || ""}
            onChange={onChange}
          />
          {errors?.accountHolder && (
            <span className="error">{errors.accountHolder}</span>
          )}
        </div>

        <div className="form-group">
          <label>Bank Name *</label>
          <input
            type="text"
            name="bankName"
            placeholder="Enter bank name"
            value={formData?.bankName || ""}
            onChange={onChange}
          />
          {errors?.bankName && (
            <span className="error">{errors.bankName}</span>
          )}
        </div>

        <div className="form-group">
          <label>Account Number *</label>
          <input
            type="text"
            name="accountNumber"
            placeholder="Enter account number"
            value={formData?.accountNumber || ""}
            onChange={onChange}
          />
          {errors?.accountNumber && (
            <span className="error">{errors.accountNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Account Number *</label>
          <input
            type="text"
            name="confirmAccountNumber"
            placeholder="Re-enter account number"
            value={formData?.confirmAccountNumber || ""}
            onChange={onChange}
          />
          {errors?.confirmAccountNumber && (
            <span className="error">{errors.confirmAccountNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label>IFSC Code *</label>
          <input
            type="text"
            name="ifsc"
            placeholder="e.g. SBIN0001234"
            value={formData?.ifsc || ""}
            onChange={onChange}
          />
          {errors?.ifsc && (
            <span className="error">{errors.ifsc}</span>
          )}
        </div>

        <div className="form-group">
          <label>Branch Name</label>
          <input
            type="text"
            name="branch"
            placeholder="Enter branch name"
            value={formData?.branch || ""}
            onChange={onChange}
          />
        </div>
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
          className="next-btn"
        >
          Continue →
        </button>
      </div>
    </form>
  );
}