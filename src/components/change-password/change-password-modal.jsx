import React, { useState } from "react";
import "./change-password-modal.css";

function ChangePasswordModal({ isOpen, onClose, onSubmit }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Do not render anything if modal is closed
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Call parent handler (ProfileView)
      if (onSubmit) {
        await onSubmit(newPassword);
      }

      setNewPassword("");
      setConfirmPassword("");
      onClose();
      alert("Successfully changed your password!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cp-backdrop">
      <div className="cp-modal">
        <h2 className="cp-title">Change Password</h2>

        <form className="cp-form" onSubmit={handleSubmit}>
          <label className="cp-label">
            New password
            <input
              type="password"
              className="cp-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <label className="cp-label">
            Confirm password
            <input
              type="password"
              className="cp-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          {error && <p className="cp-error">{error}</p>}

          <div className="cp-buttons">
            <button
              type="button"
              className="cp-btn cp-btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cp-btn cp-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;