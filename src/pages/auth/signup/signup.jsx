import styles from '../signup.module.css';

function SignUp(props) {
    return (
        <main className={styles['main-content']}>
            <h1 className='orange-gradient-text bg-clip-text'>Sign up</h1>

            <form className={styles['signup-form']}>
                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Firstname</label>
                        <input type="text" />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Lastname</label>
                        <input type="text" />
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Phone Number</label>
                        <input type="tel" />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Email Address</label>
                        <input type="email" />
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Birthday</label>
                        <input type="date" />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Username</label>
                        <input type="text" />
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Password</label>
                        <input type="password" />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Password</label>
                        <input type="password" />
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Department</label>
                        <select>
                            <option></option>
                            <option>Business</option>
                            <option>IT</option>
                            <option>Health</option>
                        </select>
                    </div>
                    <div className={styles['form-group']}>
                        <label>Program</label>
                        <select>
                            <option></option>
                            <option>Software Development</option>
                            <option>Data Analytics</option>
                            <option>Marketing</option>
                        </select>
                    </div>
                </div>

                <div className={styles.submitFormHolder}>
                    <input type="submit" value="Sign Up" className={styles.submitForm}/>
                </div>
            </form>

            <footer className={styles['copyright']}>
                Copyright 2025 Bow Valley College. All rights reserved.
            </footer>
        </main>
    );
}

export default SignUp;