import styles from './navbar.module.css';
import { IoIosClose } from "react-icons/io";

function NavBar(props) {
  const navItems = props.navitems;
  const isOpen = props.isOpen;
  const closeMenu = props.closeMenu

  return (
    <div className={`${styles.navbar} ${isOpen ? styles.open : styles.close}`}>
      
      <div className='flex-row-space-between'>
        <img src="https://d2l.bowvalleycollege.ca/d2l/lp/navbars/6606/theme/viewimage/3162127/view?v=20.25.9.24045" alt="Bow Valley Logo" className={styles.logoImage} />
        <IoIosClose onClick={() => closeMenu()}/>
      </div>
      
      {navItems.map((item, index) => (
        <a key={index} className={styles.navButtons}>
          {item.icon && <item.icon className={styles.navIcon} />}
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
}

export default NavBar;