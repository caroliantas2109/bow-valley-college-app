// 

import styles from './navbar.module.css';
import { IoIosClose } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

function NavBar(props) {
  const navItems = props.navitems;
  const isOpen = props.isOpen;
  const closeMenu = props.closeMenu;

  const navigate = useNavigate();
  const location = useLocation();

  //Function that handles navigation from sidebar menu
  const handleNavClick = (item) => {
    // Close sidebar menu
    closeMenu(false);

    // Optional: extra logout logic (if needed later)
    if (item.logout) {
      console.log("Logging out...");
      // Example:
      // localStorage.removeItem("token");
      // setUser("none");
    }

    // Navigate to the specific route assigned to the item
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className={`${styles.navbar} ${isOpen ? styles.open : styles.close}`}>
      
      <div className='flex-row-space-between'>
        <img
          src="https://d2l.bowvalleycollege.ca/d2l/lp/navbars/6606/theme/viewimage/3162127/view?v=20.25.9.24045"
          alt="Bow Valley Logo"
          className={styles.logoImage}
        />

        {/* Close sidebar menu when clicking the X icon */}
        <IoIosClose onClick={() => closeMenu(false)} className={styles.closeIcon}/>
      </div>
      
      {navItems.map((item, index) => (
        <button
          key={index}
          className={styles.navButtons}
          onClick={() => handleNavClick(item)}
        >
          {item.icon && <item.icon className={styles.navIcon} />}
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}

export default NavBar;