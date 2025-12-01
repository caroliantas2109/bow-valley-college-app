import styles from '../signup.module.css';
import { useCallNotificationBar } from '../../../App';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';

function Login(props) {
  const callNotificationBarWithValues = useCallNotificationBar();
  const navigate = useNavigate();

  const identifierRef = useRef(null);
  const passwordRef = useRef(null);

  function onSubmitForm(e) {
    e.preventDefault();

    let readyToSubmit = true;
    let formBody = {};

    const button = e.currentTarget;
    const form = button.closest('form');
    const formData = new FormData(form);

    for (const [key, value] of formData.entries()) {
      if (isStringNullOrEmpty(value)) {
        callNotificationBarWithValues("Invalid credentials", `${key} field is empty`);
        readyToSubmit = false;
        break;
      }

      formBody[key] = value;
    }

    if (!readyToSubmit) {
      callNotificationBarWithValues("Submission Error", "Form not submitted");
      return;
    }

    loginUser(formBody);
  }

  async function loginUser(body) {
    try {
      const res = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: 'include'
        }
      );

      if (!res.ok) {
        const errorText = await res.json().catch(() => ({}));
        console.error("Server error:", res.status, errorText.error);
        callNotificationBarWithValues("Login failed", errorText.error || "Invalid credentials");
        return;
      }

      const data = await res.json();
      console.log("Login success:", data.message);
      callNotificationBarWithValues("Success", "Logged in successfully");

      // go to student dashboard
      navigate("/student/dashboard");
    } catch (err) {
      console.error("Network error:", err);
      callNotificationBarWithValues("Network error", "Could not reach server");
    }
  }

  function isStringNullOrEmpty(s) {
    if (s === null || s.trim() === "") return true;
    return false;
  }

  return (
    <main className={styles['main-content']}>
      <h1 className="orange-gradient-text bg-clip-text">Log in</h1>

      <form className={styles['signup-form']}>
        {/* Credentials */}
        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="login-identifier">Email or Username</label>
            <input
              id="login-identifier"
              type="text"
              name="identifier"
              autoComplete="username"
              ref={identifierRef}
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              ref={passwordRef}
            />
          </div>
        </div>

        {/* Remember me + Forgot password */}
        <div className={styles['form-row']}>
          <div
            className={styles['form-group']}
            style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}
          >
            <input id="remember-me" type="checkbox" name="rememberMe" />
            <label htmlFor="remember-me" style={{ marginBottom: 0 }}>
              Remember me
            </label>
          </div>

          <div
            className={styles['form-group']}
            style={{ justifyContent: 'flex-end', display: 'flex' }}
          >
            <a href="/forgot-password" style={{ fontSize: 14 }}>
              Forgot password?
            </a>
          </div>
        </div>

        {/* Submit */}
        <div className={styles.submitFormHolder}>
          <input
            type="submit"
            value="Log in"
            className={styles.submitForm}
            onClick={onSubmitForm}
          />
        </div>
      </form>

      <footer className={styles['copyright']}>
        Copyright 2025 Bow Valley College. All rights reserved.
      </footer>
    </main>
  );
}

export default Login;
