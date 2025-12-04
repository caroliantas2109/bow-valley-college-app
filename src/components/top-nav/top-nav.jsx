import styles from './top-nav.module.css';
import { CgMenuRightAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function TopNav(props){
    const openMenuFunction = props.openMenu;
    const navigate = useNavigate();

    //When clicking the logo → go to Home Page
    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <div className={`flex-row-space-between ${styles.topNav}`}>
            
            {/* Menu Icon */}
            <div 
                className={`flex-col-center ${styles.menuBarHolder}`} 
                onClick={() => openMenuFunction(true)}
            >
                <CgMenuRightAlt className={styles.menuBar}/>
            </div>

            {/* Logo (click to go Home) */}
            <div className='logo-holder flex-col-center'>
                <img 
                    src="https://gcp.edu.vn/wp-content/uploads/2025/03/bow-valley-college-logo.png" 
                    alt="bow-valley-logo" 
                    className='logo-img'
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </div>
    );
}

export default TopNav;