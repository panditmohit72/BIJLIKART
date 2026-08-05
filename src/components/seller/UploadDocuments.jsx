import { useRef } from "react";
import "./UploadDocuments.css";

export default function UploadDocuments({
  formData,
  errors,
  onFileChange,
  onBack,
  onNext,
}) {
  const gstRef = useRef(null);
  const panRef = useRef(null);
  const aadhaarRef = useRef(null);
  const shopRef = useRef(null);

  const openPicker = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const getFileName = (file) => {
    if (!file) return "No file selected";

    if (typeof file === "string") return file;

    return file.name || "Selected";
  };

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (onFileChange) {
      onFileChange(name, files[0]);
    }
  };

  return (
    <div className="upload-documents">
      <div className="section-header">
        <h2>Upload Documents</h2>

        <p>
          Upload clear images or PDF files for seller verification.
        </p>
      </div>

      <div className="documents-grid">
        {/* GST */}
        <div className="document-card">
          <h3>GST Certificate</h3>

          <p>JPG, PNG or PDF (Max 5 MB)</p>

          <input
            ref={gstRef}
            type="file"
            name="gstCertificate"
            accept=".jpg,.jpeg,.png,.pdf"
            hidden
            onChange={handleChange}
          />

          <button
            type="button"
            className="upload-btn"
            onClick={() => openPicker(gstRef)}
          >
            Upload File
          </button>

          <span className="file-name">
            {getFileName(formData?.gstCertificate)}
          </span>

          {errors?.gstCertificate && (
            <span className="error">
              {errors.gstCertificate}
            </span>
          )}
        </div>

        {/* PAN */}
        <div className="document-card">
          <h3>PAN Card</h3>

          <p>JPG, PNG or PDF (Max 5 MB)</p>

          <input
            ref={panRef}
            type="file"
            name="panCard"
            accept=".jpg,.jpeg,.png,.pdf"
            hidden
            onChange={handleChange}
          />

          <button
            type="button"
            className="upload-btn"
            onClick={() => openPicker(panRef)}
          >
            Upload File
          </button>

          <span className="file-name">
            {getFileName(formData?.panCard)}
          </span>

          {errors?.panCard && (
            <span className="error">
              {errors.panCard}
            </span>
          )}
        </div>

        {/* Aadhaar */}
        <div className="document-card">
          <h3>Aadhaar Card</h3>

          <p>Front or PDF (Max 5 MB)</p>

          <input
            ref={aadhaarRef}
            type="file"
            name="aadhaarCard"
            accept=".jpg,.jpeg,.png,.pdf"
            hidden
            onChange={handleChange}
          />

          <button
            type="button"
            className="upload-btn"
            onClick={() => openPicker(aadhaarRef)}
          >
            Upload File
          </button>

          <span className="file-name">
            {getFileName(formData?.aadhaarCard)}
          </span>

          {errors?.aadhaarCard && (
            <span className="error">
              {errors.aadhaarCard}
            </span>
          )}
        </div>

        {/* Shop Photo */}
        <div className="document-card">
          <h3>Shop Photo</h3>

          <p>Front View (JPG / PNG)</p>

          <input
            ref={shopRef}
            type="file"
            name="shopPhoto"
            accept=".jpg,.jpeg,.png"
            hidden
            onChange={handleChange}
          />

          <button
            type="button"
            className="upload-btn"
            onClick={() => openPicker(shopRef)}
          >
            Upload File
          </button>

          <span className="file-name">
            {getFileName(formData?.shopPhoto)}
          </span>

          {errors?.shopPhoto && (
            <span className="error">
              {errors.shopPhoto}
            </span>
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
          type="button"
          className="next-btn"
          onClick={onNext}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}