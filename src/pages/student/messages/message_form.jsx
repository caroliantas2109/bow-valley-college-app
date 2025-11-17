import React, { useState } from "react";
import styles from "../dashboard/studentdashboard.module.css"

const MAX_LEN = 1000;

export default function MessageForm({ onSubmit }) {
  const [form, setForm] = useState({
    subject: "",
    category: "General",
    priority: "Normal",
    message: "",
    emailCopy: false,
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");

  const remaining = MAX_LEN - form.message.length;

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    const e = {};
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    if (form.message.length > MAX_LEN) e.message = `Please keep under ${MAX_LEN} characters.`;
    if (form.website) e.website = "Spam detected.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess("");
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setSending(true);
      onSubmit?.(form);

      setSuccess("Your message has been sent. An admin will get back to you shortly.");
      setForm({
        subject: "",
        category: "General",
        priority: "Normal",
        message: "",
        emailCopy: false,
        website: "",
      });
    } catch (err) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={styles.card}>
      <h3>Contact Admin</h3>

      {success && (
        <div className={styles.successBanner} role="status" aria-live="polite">
          {success}
        </div>
      )}
      {errors.submit && (
        <div className={styles.errorBanner} role="alert">
          {errors.submit}
        </div>
      )}

      <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
        {/* Honeypot (hidden) */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              aria-invalid={!!errors.subject}
              placeholder="e.g., Issue with course registration"
            />
            {errors.subject && <p className={styles.errorText}>{errors.subject}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>General</option>
              <option>Registration</option>
              <option>Grades</option>
              <option>Fees & Payments</option>
              <option>Technical</option>
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
            <p className={styles.helperText}>Use “High” only for time-sensitive issues.</p>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className={styles.textArea}
            value={form.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            placeholder="Describe your issue or request in detail…"
          />
          <div className={styles.formMeta}>
            {errors.message ? (
              <p className={styles.errorText}>{errors.message}</p>
            ) : (
              <p className={styles.helperText}>
                {remaining} characters remaining
              </p>
            )}
          </div>
        </div>

        <div className={styles.formActions}>
          <label className={styles.checkboxInline}>
            <input
              type="checkbox"
              name="emailCopy"
              checked={form.emailCopy}
              onChange={handleChange}
            />
            Email me a copy
          </label>

          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}
            disabled={sending}
          >
            {sending ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
