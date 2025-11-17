import styles from './notification.module.css';
import { useEffect, useRef } from 'react';
import { IoIosClose } from "react-icons/io";

function NotificationBar(props) {
    //stop animation from running twice due to react strict mode
    const isFirstRender = useRef(0);

    useEffect(() => {
        if (isFirstRender.current < 2) {
            isFirstRender.current += 1;
            console.log(isFirstRender.current)
            return;
        }

        console.log("animation triggered");
        requestAnimationFrame(animateNotificationBar);

    }, [props.state]);

    //notification values from props(mutable)
    const displayedMessage = props.state.notification.message;
    const displayedTitle = props.state.notification.title;
    const DisplayedIcon = props.state.icon;

    //notification type from props
    const notificationType = props.state.type;
    const typeClass = {
        bad: styles.bad,
        okay: styles.okay,
        medium: styles.medium
    }[notificationType];

    //useRef for notification
    const notificationBarRef = useRef(null);

    //animation values
    const timeTravel = 700;
    const timeWait = 3000;
    const total = (timeTravel * 2) + timeWait;
    let startTime = null;

    //animation function
    function animateNotificationBar(timestamp) {
        const nB = notificationBarRef.current;

        if (!nB) {
            console.log("no notification bar");
            return;
        }

        //set currenttime during first animation step
        if (!startTime) startTime = timestamp;

        //calculate elapsed time
        const changeInTime = timestamp - startTime;

        //coming down
        if (changeInTime <= timeTravel) {
            // progress from 0 → 1
            const t = changeInTime / timeTravel;

            // go from -100% → 100% and 0px → 12px
            const percent = -100 + 200 * t;   // -100 → 100
            const px = 12 * t;                // 0 → 12

            nB.style.transform = `translate(-50%, calc(${percent}% + ${px}px))`;
        }

        //stay at bottom while waiting
        else if (changeInTime > timeTravel && changeInTime < timeTravel + timeWait) {
            // fully down position: 100% + 12px
            nB.style.transform = `translate(-50%, calc(100% + 12px))`;
        }

        //going up
        else if (changeInTime >= timeTravel + timeWait && changeInTime <= total) {
            // time elapsed in the "going up" phase
            const backElapsed = changeInTime - (timeTravel + timeWait);
            const tu = backElapsed / timeTravel;  // 0 → 1 (up phase)

            // reverse progress so we reuse same interpolation (1 → 0)
            const t = 1 - tu;

            const percent = -100 + 200 * t;   // 100 → -100
            const px = 12 * t;                // 12 → 0

            nB.style.transform = `translate(-50%, calc(${percent}% + ${px}px))`;
        }

        console.log("running");

        //call RAF when total time hasn't elapsed
        if (changeInTime <= total) {
            requestAnimationFrame(animateNotificationBar)
        }
        else { //else set startTime  to null
            startTime = null;
            return;
        }
    }

    //UI component
    return <div className={styles.notificationBar} ref={notificationBarRef}>
        <div className={`${styles.notificationBody} ${typeClass}`}>
            <div className={styles.icon}>
                <DisplayedIcon />
            </div>

            <div className={styles.message}>
                <p className={styles.title}>
                    {displayedTitle}
                </p>

                <p className={styles.messageBody}>
                    {displayedMessage}
                </p>
            </div>

            <div className={styles.close}>
                <IoIosClose />
            </div>
        </div>
    </div>
}





export default NotificationBar;