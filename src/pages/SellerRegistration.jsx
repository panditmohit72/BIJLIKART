import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressStepper from "../components/seller/ProgressStepper";
import BasicDetails from "../components/seller/BasicDetails";
import BankDetails from "../components/seller/BankDetails";
import OTPVerification from "../components/seller/OTPVerification";
import SellerAgreement from "../components/seller/SellerAgreement";
import UploadDocuments from "../components/seller/UploadDocuments";
import ReviewSubmit from "../components/seller/ReviewSubmit";

const TOTAL_STEPS = 6;

export default function SellerRegistration() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [submittedApplication, setSubmittedApplication] =
    useState(null);

  const [formData, setFormData] = useState({
    // Basic Details
    shopName: "",
    ownerName: "",
    mobile: "",
    email: "",
    gstin: "",
    category: "",
    address: "",
    city: "Mathura",
    state: "Uttar Pradesh",
    pincode: "",
    delivery: "seller",

    // Bank Details
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    branch: "",

    // OTP
    otp: "",
    otpVerified: false,

    // Agreement
    agreementAccepted: false,

    // Documents
    gstCertificate: null,
    panCard: null,
    aadhaarCard: null,
    shopPhoto: null,
  });

  // ==========================================
  // COMMON CHANGE HANDLER
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((oldData) => ({
      ...oldData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((oldErrors) => ({
      ...oldErrors,
      [name]: "",
    }));
  };

  // ==========================================
  // FILE CHANGE HANDLER
  // ==========================================

  const handleFileChange = (name, file) => {
    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        [name]: "Please upload JPG, PNG or PDF file.",
      }));

      return;
    }

    if (file.size > maxSize) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        [name]: "File size must be less than 5 MB.",
      }));

      return;
    }

    setFormData((oldData) => ({
      ...oldData,
      [name]: file,
    }));

    setErrors((oldErrors) => ({
      ...oldErrors,
      [name]: "",
    }));
  };

  // ==========================================
  // BASIC DETAILS VALIDATION
  // ==========================================

  const validateBasicDetails = () => {
    const newErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = "Please enter shop name.";
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Please enter owner name.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile =
        "Please enter a valid 10-digit mobile number.";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (
      formData.gstin.trim() &&
      !/^[0-9A-Z]{15}$/.test(formData.gstin.trim())
    ) {
      newErrors.gstin =
        "GSTIN must contain 15 characters.";
    }

    if (!formData.category) {
      newErrors.category =
        "Please select your main product category.";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Please enter complete shop address.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Please enter city.";
    }

    if (!formData.state) {
      newErrors.state = "Please select state.";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Please enter a valid 6-digit PIN code.";
    }

    if (!formData.delivery) {
      newErrors.delivery =
        "Please select a delivery preference.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // BANK DETAILS VALIDATION
  // ==========================================

  const validateBankDetails = () => {
    const newErrors = {};

    if (!formData.accountHolder.trim()) {
      newErrors.accountHolder =
        "Please enter account holder name.";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName =
        "Please enter bank name.";
    }

    const accountNumber =
      formData.accountNumber.replace(/\s/g, "");

    const confirmAccountNumber =
      formData.confirmAccountNumber.replace(/\s/g, "");

    if (!/^\d{9,18}$/.test(accountNumber)) {
      newErrors.accountNumber =
        "Please enter a valid bank account number.";
    }

    if (!confirmAccountNumber) {
      newErrors.confirmAccountNumber =
        "Please confirm your account number.";
    } else if (
      accountNumber !== confirmAccountNumber
    ) {
      newErrors.confirmAccountNumber =
        "Account numbers do not match.";
    }

    const ifsc = formData.ifsc
      .trim()
      .toUpperCase();

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      newErrors.ifsc =
        "Please enter a valid IFSC code.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // OTP VALIDATION
  // ==========================================

  const validateOTP = () => {
    const newErrors = {};

    if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp =
        "Please enter the 6-digit OTP.";
    }

    /*
      DEMO OTP FLOW

      Backend OTP API connect hone tak:
      123456 ko demo OTP rakha gaya hai.

      Production me is check ko backend
      verification API se replace karenge.
    */

    if (
      /^\d{6}$/.test(formData.otp) &&
      formData.otp !== "123456"
    ) {
      newErrors.otp =
        "Invalid OTP. Demo OTP is 123456.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    setFormData((oldData) => ({
      ...oldData,
      otpVerified: true,
    }));

    return true;
  };

  // ==========================================
  // AGREEMENT VALIDATION
  // ==========================================

  const validateAgreement = () => {
    const newErrors = {};

    if (!formData.agreementAccepted) {
      newErrors.agreementAccepted =
        "Please accept the Seller Agreement to continue.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // DOCUMENT VALIDATION
  // ==========================================

  const validateDocuments = () => {
    const newErrors = {};

    /*
      Current document policy:

      Aadhaar + Shop Photo required.
      PAN and GST Certificate can be uploaded
      when available.

      Production requirements can be tightened
      later according to onboarding policy.
    */

    if (!formData.aadhaarCard) {
      newErrors.aadhaarCard =
        "Please upload Aadhaar Card.";
    }

    if (!formData.shopPhoto) {
      newErrors.shopPhoto =
        "Please upload shop photo.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // NEXT STEP
  // ==========================================

  const handleNext = () => {
    let valid = false;

    if (currentStep === 1) {
      valid = validateBasicDetails();
    }

    if (currentStep === 2) {
      valid = validateBankDetails();
    }

    if (currentStep === 3) {
      valid = validateOTP();
    }

    if (currentStep === 4) {
      valid = validateAgreement();
    }

    if (currentStep === 5) {
      valid = validateDocuments();
    }

    if (!valid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setErrors({});

    setCurrentStep((oldStep) =>
      Math.min(oldStep + 1, TOTAL_STEPS)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // PREVIOUS STEP
  // ==========================================

  const handleBack = () => {
    setErrors({});

    setCurrentStep((oldStep) =>
      Math.max(oldStep - 1, 1)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // FINAL VALIDATION
  // ==========================================

  const validateBeforeSubmit = () => {
    if (!validateBasicDetails()) {
      setCurrentStep(1);
      return false;
    }

    if (!validateBankDetails()) {
      setCurrentStep(2);
      return false;
    }

    if (!formData.otpVerified) {
      setErrors({
        otp: "Please verify your mobile number.",
      });

      setCurrentStep(3);

      return false;
    }

    if (!formData.agreementAccepted) {
      setErrors({
        agreementAccepted:
          "Please accept the Seller Agreement.",
      });

      setCurrentStep(4);

      return false;
    }

    if (!validateDocuments()) {
      setCurrentStep(5);
      return false;
    }

    setErrors({});

    return true;
  };

  // ==========================================
  // FINAL SUBMIT
  // ==========================================

  const handleFinalSubmit = () => {
    if (loading) {
      return;
    }

    if (!validateBeforeSubmit()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setLoading(true);

    try {
      const applicationId =
        "BKS" + Date.now().toString().slice(-7);

      /*
        Files cannot be stored directly inside
        JSON/localStorage.

        For the current frontend/demo flow we
        store file names.

        When backend upload API is connected,
        actual files will be sent using FormData.
      */

      const application = {
        id: applicationId,
        applicationId,

        shop: formData.shopName.trim(),
        shopName: formData.shopName.trim(),

        owner: formData.ownerName.trim(),
        ownerName: formData.ownerName.trim(),

        mobile: formData.mobile,
        email: formData.email.trim(),
        gstin: formData.gstin.trim(),

        category: formData.category,

        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state,
        pincode: formData.pincode,

        delivery: formData.delivery,

        accountHolder:
          formData.accountHolder.trim(),

        bankName:
          formData.bankName.trim(),

        accountNumber:
          formData.accountNumber.trim(),

        ifsc:
          formData.ifsc.trim().toUpperCase(),

        branch:
          formData.branch.trim(),

        otpVerified:
          formData.otpVerified,

        agreementAccepted:
          formData.agreementAccepted,

        documents: {
          gstCertificate:
            formData.gstCertificate?.name || "",

          panCard:
            formData.panCard?.name || "",

          aadhaarCard:
            formData.aadhaarCard?.name || "",

          shopPhoto:
            formData.shopPhoto?.name || "",
        },

        status: "Pending",

        submittedAt:
          new Date().toLocaleString("en-IN"),
      };

      let oldApplications = [];

      try {
        oldApplications = JSON.parse(
          localStorage.getItem(
            "bijlikartSellerApplications"
          ) || "[]"
        );

        if (!Array.isArray(oldApplications)) {
          oldApplications = [];
        }
      } catch {
        oldApplications = [];
      }

      const updatedApplications = [
        application,
        ...oldApplications,
      ];

      localStorage.setItem(
        "bijlikartSellerApplications",
        JSON.stringify(updatedApplications)
      );

      localStorage.setItem(
        "bijlikartSellerApplication",
        JSON.stringify(application)
      );

      setSubmittedApplication(application);
      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Seller registration error:",
        error
      );

      alert(
        "Something went wrong while submitting the registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SUCCESS SCREEN
  // ==========================================

  if (submitted && submittedApplication) {
    return (
      <div style={pageStyle}>
        <header style={headerStyle}>
          <div
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <h2 style={{ margin: 0 }}>
              ⚡ BIJLIKART
            </h2>

            <small>
              Seller Partner Program
            </small>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            style={headerButtonStyle}
          >
            Customer Website
          </button>
        </header>

        <main style={successWrapperStyle}>
          <div style={successCardStyle}>
            <div style={successIconStyle}>
              ✅
            </div>

            <h1 style={successTitleStyle}>
              Application Submitted!
            </h1>

            <p style={successTextStyle}>
              Thank you for applying to sell on
              BIJLIKART. Your seller application has
              been submitted successfully and is now
              pending verification.
            </p>

            <div style={applicationBoxStyle}>
              <div>
                <span style={smallLabelStyle}>
                  APPLICATION ID
                </span>

                <strong>
                  {
                    submittedApplication.applicationId
                  }
                </strong>
              </div>

              <div>
                <span style={smallLabelStyle}>
                  SHOP NAME
                </span>

                <strong>
                  {submittedApplication.shopName}
                </strong>
              </div>

              <div>
                <span style={smallLabelStyle}>
                  REGISTERED MOBILE
                </span>

                <strong>
                  {submittedApplication.mobile}
                </strong>
              </div>

              <div>
                <span style={smallLabelStyle}>
                  STATUS
                </span>

                <strong
                  style={{
                    color: "#d97706",
                  }}
                >
                  ⏳ Pending Approval
                </strong>
              </div>
            </div>

            <div style={nextStepsStyle}>
              <h3 style={{ marginTop: 0 }}>
                What happens next?
              </h3>

              <p>
                1. BIJLIKART will review your seller
                application.
              </p>

              <p>
                2. Your shop and submitted documents
                will be verified.
              </p>

              <p>
                3. Your bank and business details may
                be checked before approval.
              </p>

              <p>
                4. After approval, your seller account
                will be activated.
              </p>

              <p>
                5. You can then add products, receive
                orders and manage your shop.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              style={primaryButtonStyle}
            >
              ← Back to BIJLIKART
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ==========================================
  // REGISTRATION PAGE
  // ==========================================

  return (
    <div style={pageStyle}>
      {/* HEADER */}

      <header style={headerStyle}>
        <div
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <h2 style={{ margin: 0 }}>
            ⚡ BIJLIKART
          </h2>

          <small>
            Seller Partner Program
          </small>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={headerButtonStyle}
        >
          ← Customer Website
        </button>
      </header>

      {/* HERO */}

      <section style={heroStyle}>
        <div style={heroIconStyle}>
          🏪
        </div>

        <h1 style={heroTitleStyle}>
          Become a BIJLIKART Seller
        </h1>

        <p style={heroTextStyle}>
          Register your electronics shop and start
          reaching customers through the BIJLIKART
          local marketplace.
        </p>
      </section>

      {/* MAIN */}

      <main style={mainStyle}>
        <div style={registrationCardStyle}>
          <div style={registrationTopStyle}>
            <div>
              <span style={registrationLabelStyle}>
                SELLER REGISTRATION
              </span>

              <h2 style={registrationTitleStyle}>
                Complete Your Seller Profile
              </h2>

              <p style={registrationTextStyle}>
                Step {currentStep} of {TOTAL_STEPS}
              </p>
            </div>

            <div style={secureBadgeStyle}>
              🔒 Secure Registration
            </div>
          </div>

          {/* PROGRESS STEPPER */}

          <ProgressStepper
            currentStep={currentStep}
          />

          {/* STEP CONTENT */}

          <div style={stepContentStyle}>
            {currentStep === 1 && (
              <BasicDetails
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <BankDetails
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onBack={handleBack}
                onNext={handleNext}
              />
            )}

            {currentStep === 3 && (
              <OTPVerification
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onBack={handleBack}
                onNext={handleNext}
              />
            )}

            {currentStep === 4 && (
              <SellerAgreement
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onBack={handleBack}
                onNext={handleNext}
              />
            )}

            {currentStep === 5 && (
              <UploadDocuments
                formData={formData}
                errors={errors}
                onFileChange={handleFileChange}
                onBack={handleBack}
                onNext={handleNext}
              />
            )}

            {currentStep === 6 && (
              <ReviewSubmit
                formData={formData}
                onBack={handleBack}
                onSubmit={handleFinalSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>

        <div style={helpBoxStyle}>
          <div style={{ fontSize: "25px" }}>
            💡
          </div>

          <div>
            <strong>
              Need help with registration?
            </strong>

            <p style={helpTextStyle}>
              Keep your shop details, bank
              information and verification documents
              ready while completing the application.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// PAGE STYLES
// ==========================================

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f7fb",
  fontFamily:
    "Inter, Arial, Helvetica, sans-serif",
};

const headerStyle = {
  background: "#0d3975",
  color: "#ffffff",
  padding: "17px 6%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
};

const headerButtonStyle = {
  border:
    "1px solid rgba(255,255,255,0.5)",
  background: "transparent",
  color: "#ffffff",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const heroStyle = {
  background:
    "linear-gradient(135deg, #0d3975, #1688e8)",
  color: "#ffffff",
  textAlign: "center",
  padding: "48px 20px",
};

const heroIconStyle = {
  fontSize: "42px",
};

const heroTitleStyle = {
  margin: "10px 0 8px",
  fontSize: "34px",
};

const heroTextStyle = {
  maxWidth: "650px",
  margin: "0 auto",
  lineHeight: "1.7",
  opacity: 0.92,
  fontSize: "15px",
};

const mainStyle = {
  maxWidth: "1150px",
  margin: "0 auto",
  padding: "35px 20px 60px",
};

const registrationCardStyle = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "30px",
  boxShadow:
    "0 6px 30px rgba(15,23,42,0.07)",
  border: "1px solid #edf0f5",
};

const registrationTopStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
};

const registrationLabelStyle = {
  color: "#1688e8",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "0.6px",
};

const registrationTitleStyle = {
  margin: "6px 0",
  color: "#172033",
  fontSize: "24px",
};

const registrationTextStyle = {
  margin: 0,
  color: "#64748b",
  fontSize: "13px",
};

const secureBadgeStyle = {
  background: "#ecfdf5",
  color: "#15803d",
  border: "1px solid #bbf7d0",
  borderRadius: "30px",
  padding: "8px 13px",
  fontSize: "12px",
  fontWeight: "700",
};

const stepContentStyle = {
  marginTop: "15px",
};

const helpBoxStyle = {
  marginTop: "20px",
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: "14px",
  padding: "18px 20px",
  display: "flex",
  alignItems: "flex-start",
  gap: "13px",
  color: "#334155",
};

const helpTextStyle = {
  margin: "5px 0 0",
  color: "#64748b",
  fontSize: "13px",
  lineHeight: "1.6",
};

// ==========================================
// SUCCESS STYLES
// ==========================================

const successWrapperStyle = {
  maxWidth: "720px",
  margin: "55px auto",
  padding: "20px",
};

const successCardStyle = {
  background: "#ffffff",
  padding: "45px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow:
    "0 6px 30px rgba(0,0,0,0.08)",
};

const successIconStyle = {
  fontSize: "65px",
  marginBottom: "10px",
};

const successTitleStyle = {
  color: "#172033",
  margin: "0 0 10px",
};

const successTextStyle = {
  color: "#64748b",
  fontSize: "15px",
  lineHeight: "1.7",
};

const applicationBoxStyle = {
  margin: "30px 0",
  background: "#f8fafc",
  padding: "20px",
  borderRadius: "12px",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "18px",
  textAlign: "left",
  border: "1px solid #e2e8f0",
};

const smallLabelStyle = {
  display: "block",
  color: "#94a3b8",
  fontSize: "10px",
  fontWeight: "700",
  marginBottom: "5px",
  letterSpacing: "0.4px",
};

const nextStepsStyle = {
  background: "#eff6ff",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "left",
  color: "#475569",
  lineHeight: "1.6",
  border: "1px solid #bfdbfe",
};

const primaryButtonStyle = {
  marginTop: "25px",
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "9px",
  background: "#1688e8",
  color: "#ffffff",
  fontWeight: "700",
  cursor: "pointer",
};