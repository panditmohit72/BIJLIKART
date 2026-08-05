import { useEffect, useState } from "react";
import "./OTPVerification.css";

export default function OTPVerification({
  formData,
  errors,
  onChange,
  onBack,
  onNext,
}) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onNext) {
      onNext();
    }
  };

  const handleResend = () => {
    setTimer(60);
  };

  return (
    <form className="otp-verification" onSubmit={handleSubmit}>
      <div className="otp-header">
        <div className="otp-icon">📱</div>

        <h2>OTP Verification</h2>

        <p>
          Enter the 6-digit OTP sent to your registered mobile number.
        </p>
      </div>

      <div className="otp-card">
        <div className="form-group">
          <label>Mobile Number</label>

          <input
            type="text"
            name="mobile"
            placeholder="9876543210"
            value={formData?.mobile || ""}
            onChange={onChange}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Enter OTP *</label>

          <input
            type="text"
            name="otp"
            maxLength={6}
            placeholder="------"
            value={formData?.otp || ""}
            onChange={onChange}
          />

          {errors?.otp && (
            <span className="error">
              {errors.otp}
            </span>
          )}
        </div>

        <div className="otp-footer">
          {timer > 0 ? (
            <span className="timer">
              Resend OTP in <strong>{timer}s</strong>
            </span>
          ) : (
            <button
              type="button"
              className="resend-btn"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          )}
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
          className="verify-btn"
        >
          Verify & Continue →
        </button>
      </div>
    </form>
  );
}