// src/components/seller/ProgressStepper.jsx

import React from "react";
import "./ProgressStepper.css";

const steps = [
  "Basic Details",
  "Bank Details",
  "OTP Verification",
  "Seller Agreement",
  "Document Upload",
  "Review & Submit",
];

const ProgressStepper = ({ currentStep = 1 }) => {
  return (
    <div className="seller-stepper-container">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <React.Fragment key={step}>
            <div className="seller-step-item">
              <div
                className={`seller-step-circle ${
                  isCompleted
                    ? "completed"
                    : isActive
                    ? "active"
                    : "inactive"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              <div
                className={`seller-step-title ${
                  isActive ? "active-title" : ""
                }`}
              >
                {step}
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`seller-step-line ${
                  stepNumber < currentStep ? "completed-line" : ""
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressStepper;