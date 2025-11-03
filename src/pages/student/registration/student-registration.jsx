import styles from './student-reg.module.css';
import Card from '../../../components/card/card';

/*Icons*/
import { GrFormSearch } from "react-icons/gr";
function Registration(props){

    return <div className={`container ${styles.registration}`}>
        <div className={`flex-row-space-between ${styles.topHeader}`}>
            <div className={`${styles.leftPart} flex-col-space-between`}>
                <p>Software Development</p>
                <p className={`fs-small-0 text-gray`}>Winter Session - WINT2025</p>
            </div>

            <div className={`${styles.rightPart} flex-col-gap-12`}>
                <div className={`${styles.clientImageHolder}`}>
                    <img 
                    src="https://images.wallpapersden.com/image/download/the-way-of-water-avatar-movie-2022_bW1oaGiUmZqaraWkpJRmbmdlrWZpaWU.jpg" 
                    alt="avatar"
                    className={`${styles.clientImage}`}
                    />
                </div>
            </div>
        </div>

        <section>
            <p className={`${styles.regPageTitle}`}>My Courses</p>

            <div className={`${styles.cardSlideShow} scrollbar`}>
                <Card cardType = "view"></Card>
                <Card cardType = "view"></Card>
                <Card cardType = "view"></Card>
                <Card cardType = "view"></Card>
                <Card cardType = "view"></Card>
            </div>

            <div className={`${styles.navCircles} flex-row-space-between`}>
                <div className={`${styles.navCircle} ${styles.circle1}`}></div>
                <div className={`${styles.navCircle} ${styles.circle2}`}></div>
            </div>
        </section>

        <section>
            <p className={`${styles.regPageTitle}`}>Add Courses</p>

            <div className={`${styles.searchBarTop} ${styles.topHeader} flex-row-space-between`}>
                <div className={`${styles.searchBarHolder} flex-col-gap-12`}> 
                    <GrFormSearch />
                    
                    <input type="search" name="searchInput" id="searchInput" className={`${styles.searchInput}`} placeholder='Search by course name or code'/>
                </div>

                <div className={`${styles.sortBarHolder} flex-row-space-between`}>
                    <span>Input Term :</span>

                    <select name="termSort" id="termSort" className={`${styles.sortTerm}`}>
                        <option value="0">WINT2025</option>
                    </select>
                </div>
            </div>

            <div className={`${styles.courseList}`}>
                <Card cardType="register"></Card>
                <Card cardType="register"></Card>
                <Card cardType="register"></Card>
                <Card cardType="register"></Card>
                <Card cardType="register"></Card>
                <Card cardType="register"></Card>
                <Card cardType="register"></Card>
                <Card cardType="register"></Card>
            </div>

            <div className={`${styles.courseListPages}`}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
            </div>

        </section>
    </div>
}

export default Registration