import styles from './home-page.module.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return <div className={styles.homePage}>
        <div className={`${styles.homePageCover} flex-center-all`}>
            <div className={styles.heroText}>
                <p className={`text-heading fs-big-2 fw-xxl ${styles.slideInLeft}`}>Course <span className='orange-gradient-text bg-clip-text'>registration</span></p>
                <p className={`capitalize-text fs-mid-1 fw-m ${styles.slideInLeft}`}>for software devs, by software devs</p>
                <Link to={"/signup"} className={`btn1 text-body fw-m ${styles.slideUp}`}>Sign in</Link>
            </div>
            {/*there is going to be animation here */}
            <p className={styles.paragraphText}>Hit the<br /> ground <br /> working.</p>
        </div>
    </div>
}



export default HomePage