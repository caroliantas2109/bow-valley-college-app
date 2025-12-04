import React, { useState } from "react";
import styles from "./ChangePasswordModal.module.css";

function ChangePasswordModal({ isOpen, onClose }) {

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    setError("");

    if (!oldPass || !newPass || !confirmPass) {
      setError("Please fill out all fields.");
      return;
    }

    if (newPass !== confirmPass) {
      setError("New passwords do not match.");
      return;
    }

    // SUCCESS
    alert("Password changed successfully!");
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <h2>Change Password</h2>

        <label>Old Password</label>
        <input
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttons}>
          <button className={styles.saveBtn} onClick={handleSave}>
            Confirm
          </button>

          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default ChangePasswordModal;