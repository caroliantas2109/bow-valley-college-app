import styles from '../signup.module.css';
import { useCallNotificationBar } from '../../../App';
import { useRef } from 'react';
//
function SignUp(props) {
    //const errorEl = useRef(null) i wanted to use this to make a dynamic span el that appears anywhere there is an error but it might take some time, will do later

    const passwordElement = useRef(null);

    const callNotificationBarWithValues = useCallNotificationBar();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //when sign up button is clicked
    function onSubmitForm(e) {
        e.preventDefault();

        let readyToSubmit = true;

        const button = e.currentTarget;

        const form = button.closest('form');

        const formData = new FormData(form);

        //iterating to validate form
        for (const [key, value] of formData.entries()) {
            //null check
            if (isStringNullOrEmpty(value)) {
                throwEmptyStringError(key);
                readyToSubmit = false;
                break;
            }

            //phone number check 
            if(key === "phone" && value.length !== 10) {
                //check if phone number length is greater/less than 10
                callNotificationBarWithValues("Invalid credentials", "phone number isn't correct");
                readyToSubmit = false;
                break;
            }

            //email check 
            if(key === "email" && !emailRegex.test(value)) {
                callNotificationBarWithValues("Invalid credentials", "email format isn't valid");
                readyToSubmit = false;
                break;
            }

            //password check 
            if(key === "password" && value.length < 8) {
                callNotificationBarWithValues("Invalid credentials", "Password strength is poor");
                readyToSubmit = false;
                break;
            }

            //password confirmation check 
            if(key === "confirmPassword" && value !== passwordElement.current.value){
                callNotificationBarWithValues("Invalid credentials", "Password's don't match");
                readyToSubmit = false;
                break;
            }

            //too much repetition, please put in a function

            //console.log(key, value);
        }

        if(readyToSubmit === false) {
            console.log("Ehya, nothing for you");
        }
        else{
            console.log("lets gooo");
        }
    }

    //when password is being typed
    function onPasswordChange(e) {
        const password = e.currentTarget.value;

        if(password.length < 8){
            callNotificationBarWithValues("Invalid credentials", "Password strength is poor");   
        }

        console.log(password);
    }

    function onPasswordConfirmation(e) {
        const password = e.currentTarget.value;

        if(password !== passwordElement.current.value){
            callNotificationBarWithValues("Invalid credentials", "Passwords don't match, check again");   
        }

        console.log(password, passwordElement.current.value);
    }

    function throwEmptyStringError(key) {
        callNotificationBarWithValues("Invalid credentials", `${key} field is empty`);
    }

    return (
        <main className={styles['main-content']}>
            <h1 className='orange-gradient-text bg-clip-text'>Sign up</h1>

            <form className={styles['signup-form']}>
                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Firstname</label>
                        <input type="text" name="firstName" />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Lastname</label>
                        <input type="text" name="lastName" />
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Phone Number</label>
                        <input type='number' name="phone" />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Email Address</label>
                        <input type="email" name="email" />
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Birthday</label>
                        <input type="date" name="birthday" />
                    </div>

                    <div className={styles['form-group']}>
                        <label>Username</label>
                        <input type="text" name="username" />
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Password</label>
                        <input type="password" name="password" onBlur={onPasswordChange} ref={passwordElement}/>
                        <span></span>
                    </div>
                    <div className={styles['form-group']}>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" onBlur={onPasswordConfirmation}/>
                    </div>
                </div>

                <div className={styles['form-row']}>
                    <div className={styles['form-group']}>
                        <label>Department</label>
                        <select name="department">
                            <option value=""></option>
                            <option value="Business">Business</option>
                            <option value="IT">IT</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>
                    <div className={styles['form-group']}>
                        <label>Program</label>
                        <select name="program">
                            <option value=""></option>
                            <option value="Software Development">Software Development</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                    </div>
                </div>

                <div className={styles.submitFormHolder}>
                    <input
                        type="submit"
                        value="Sign Up"
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

function isStringNullOrEmpty(s) {
    if (s === null || s.trim() === "") return true;
    return false;
}



export default SignUp;