import "./SellerAgreement.css";

export default function SellerAgreement({
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
    <form
      className="seller-agreement"
      onSubmit={handleSubmit}
    >
      <div className="agreement-header">
        <div className="agreement-icon">📄</div>

        <div>
          <h2>BIJLIKART Seller Agreement</h2>

          <p>
            Please read the seller terms carefully before
            continuing your registration.
          </p>
        </div>
      </div>

      <div className="agreement-box">
        <h3>Seller Terms & Marketplace Agreement</h3>

        <p>
          By registering as a seller on BIJLIKART, you agree
          to provide accurate business, contact, bank and
          verification information.
        </p>

        <h4>1. Genuine Products</h4>

        <p>
          The seller agrees to list and sell only genuine,
          lawful and correctly described products through
          BIJLIKART.
        </p>

        <h4>2. Product Information</h4>

        <p>
          The seller is responsible for keeping product
          prices, stock availability, specifications and
          other listing information accurate and updated.
        </p>

        <h4>3. Orders & Customers</h4>

        <p>
          The seller agrees to process confirmed customer
          orders responsibly and provide appropriate support
          for products sold through the marketplace.
        </p>

        <h4>4. Warranty & Product Responsibility</h4>

        <p>
          Product warranty, installation and after-sales
          obligations must be clearly communicated to the
          customer wherever applicable.
        </p>

        <h4>5. Payments & Settlements</h4>

        <p>
          Seller payments and settlements will be processed
          according to the applicable BIJLIKART payment,
          commission and settlement policies.
        </p>

        <h4>6. Marketplace Commission</h4>

        <p>
          BIJLIKART may charge marketplace commission or
          other applicable service charges as mutually
          agreed with the seller.
        </p>

        <h4>7. Prohibited Activity</h4>

        <p>
          Fraudulent listings, counterfeit products,
          misleading information, manipulation of orders or
          misuse of the marketplace may result in suspension
          or termination of the seller account.
        </p>

        <h4>8. Seller Verification</h4>

        <p>
          BIJLIKART may verify the seller's business details,
          identity, shop information and submitted documents
          before approving or continuing the seller account.
        </p>

        <h4>9. Account Approval</h4>

        <p>
          Completing this registration does not automatically
          guarantee seller approval. The application may be
          reviewed before the seller account is activated.
        </p>

        <h4>10. Applicable Rules</h4>

        <p>
          The seller agrees to follow applicable laws and
          BIJLIKART marketplace policies while using the
          platform.
        </p>

        <div className="agreement-note">
          <strong>Important:</strong>

          <p>
            Your acceptance of this agreement will be
            recorded as part of your seller registration.
          </p>
        </div>
      </div>

      <label className="agreement-checkbox">
        <input
          type="checkbox"
          name="agreementAccepted"
          checked={Boolean(formData?.agreementAccepted)}
          onChange={onChange}
        />

        <span>
          I have read and understood the BIJLIKART Seller
          Agreement and I agree to the Seller Terms &
          Marketplace Policies.
        </span>
      </label>

      {errors?.agreementAccepted && (
        <span className="agreement-error">
          {errors.agreementAccepted}
        </span>
      )}

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
          Accept & Continue →
        </button>
      </div>
    </form>
  );
}