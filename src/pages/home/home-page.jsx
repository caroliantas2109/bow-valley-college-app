import styles from './home-page.module.css';

function HomePage() {
    return <div className={styles.homePage}>
        <div className={`${styles.homePageCover} flex-center-all`}>
            <div className={styles.heroText}>
                <p className='text-heading fs-big-2 fw-xxl'>Course <span className='orange-gradient-text bg-clip-text'>registration</span></p>
                <p className='capitalize-text fs-mid-1 fw-m'>for software devs, by software devs</p>
                <button className='btn1 text-body fw-m'>Sign in</button>
            </div>
            <p className={styles.paragraphText}>Hit the<br /> ground <br /> working.</p>
        </div>
    </div>
}

export default HomePage