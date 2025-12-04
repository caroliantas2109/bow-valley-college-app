import styles from './navbar.module.css';
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const navItems = props.navitems;
  const isOpen = props.isOpen;
  const setNavBarIsOpen = props.closeMenu;

  const navigate = useNavigate();

  // Function triggered when a nav item is clicked
  const handleItemClick = (item) => {
    if (item.logout) {
      // Logout item: clear user data and go to login
      localStorage.removeItem("user");
      navigate("/login");
    } else if (item.path) {
      // Normal navigation item
      navigate(item.path);
    }

    // Close the navbar after any click
    setNavBarIsOpen(false);
  };

  const handleCloseClick = () => {
    setNavBarIsOpen(false);
  };

  return (
    <div className={`${styles.navbar} ${isOpen ? styles.open : styles.close}`}>
      
      {/* Top section: logo + close button */}
      <div className='flex-row-space-between'>
        <img 
          src="https://d2l.bowvalleycollege.ca/d2l/lp/navbars/6606/theme/viewimage/3162127/view?v=20.25.9.24045" 
          alt="Bow Valley Logo" 
          className={styles.logoImage} 
        />

        {/* Close menu icon */}
        <IoIosClose onClick={handleCloseClick} className={styles.closeIcon}/>
      </div>
      
      {/* Navigation items list */}
      {navItems.map((item, index) => (
        <a 
          key={index} 
          className={styles.navButtons}
          onClick={() => handleItemClick(item)}
        >
          {/* Optional icon */}
          {item.icon && <item.icon className={styles.navIcon} />}
          
          {/* Item text */}
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
}

export default NavBar;