import styles from './top-nav.module.css';
import { CgMenuRightAlt } from "react-icons/cg";

function TopNav(props){
    const openMenuFunction = props.openMenu;

    return <div className={`flex-row-space-between ${styles.topNav}`}>
        <div 
            className={`flex-col-center ${styles.menuBarHolder}`} 
            onClick={() => openMenuFunction(true)
        }>
            <CgMenuRightAlt className={styles.menuBar}/>
        </div>

        <div className='logo-holder flex-col-center'>
            <img src="https://gcp.edu.vn/wp-content/uploads/2025/03/bow-valley-college-logo.png" alt="bow-valley-logo" className='logo-img'/>
        </div>
    </div>
}

export default TopNav;