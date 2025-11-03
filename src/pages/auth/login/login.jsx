import styles from '../signup.module.css';

function Login(props) {
  return (
    <main className={styles['main-content']}>
      <h1 className="orange-gradient-text bg-clip-text">Log in</h1>

      <form className={styles['signup-form']}>
        {/* Credentials */}
        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="login-username">Email or Username</label>
            <input id="login-username" type="text" autoComplete="username" />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
            />
          </div>
        </div>

        {/* Remember me + Forgot password */}
        <div className={styles['form-row']}>
          <div
            className={styles['form-group']}
            style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}
          >
            <input id="remember-me" type="checkbox" />
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
