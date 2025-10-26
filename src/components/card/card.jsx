import styles from './card.module.css'

function Card(props) {
    return <div className={`${styles.card} flex-col-gap-10`}>
        <p className={styles.header}>
            introduction to game and simulation programming
        </p>

        <div className={styles.mainContent}>
            <p className={` ${styles.tinyTitle}`}>data2201-25sepmnos3</p>

            <div className={`${styles.content} flex-col-gap-10`}>
                <div className={`${styles.contentHolder} flex-row-space-between`}>
                    <span className={styles.contentTitle}>
                        Start Date:
                    </span>
                    <span className={styles.contentValue}>
                        September 25, 2002
                    </span>
                </div>
                <div className={`${styles.contentHolder} flex-row-space-between`}>
                    <span className={styles.contentTitle}>
                        End Date:
                    </span>
                    <span className={styles.contentValue}>
                        September 25, 2002
                    </span>
                </div>
                <div className={`${styles.contentHolder} flex-row-space-between`}>
                    <span className={styles.contentTitle}>
                        Campus:
                    </span>
                    <span className={styles.contentValue}>
                        Calgary, Downtown
                    </span>
                </div>
                <div className={`${styles.contentHolder} flex-row-space-between`}>
                    <span className={styles.contentTitle}>
                        Credits:
                    </span>
                    <span className={styles.contentValue}>
                        3
                    </span>
                </div>
                <div className={`${styles.contentHolder} flex-row-space-between`}>
                    <span className={styles.contentTitle}>
                        Schedule:
                    </span>
                    <span className={styles.contentValue}>
                        Friday (8:00am - 10:30am)
                    </span>
                </div>
            </div>

            <div className={`${styles.others} flex-center-all`}>
                <div className={styles.pill}>Online (Synchronous)</div>
                <div className={styles.pill}> 15/40 seats available</div>
                <button className={`btn2`}>Remove</ button>
            </div>
        </div>
    </div>
}

export default Card