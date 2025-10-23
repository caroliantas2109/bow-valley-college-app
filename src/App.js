//-------------css file --------------------------------------
import './App.css';

//------------------------pages -------------------------------
import HomePage from './pages/home/home-page.jsx';

//------------------components---------------------------------
import NavBar from './components/navbar/navbar.jsx';
import TopNav from './components/top-nav/top-nav.jsx';

//-------------icons-------------------------------------------
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import { RiHome9Line } from "react-icons/ri";
import { PiBooks } from "react-icons/pi";
import { TbSchool } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";


function App() {
  const [loggedIn, setUser] = useState("none");
  const [navItems, setNavItems] = useState([]);

  const [navBarIsOpen, openCloseNavBar] = useState(false);

  useEffect(() => {
    if (loggedIn === "none") {
      setNavItems([
        { name: "Home", icon: RiHome9Line },
        { name: "Programs and Courses", icon: PiBooks },
        { name: "My BVC", icon: TbSchool }
      ]);
    } else if (loggedIn === "student") {
      setNavItems([
        { name: "Dashboard", icon: TbLayoutDashboard },
        { name: "Registration", icon: FaWpforms },
        { name: "View Courses", icon: PiBooks },
        { name: "Log Out", icon: TbLogout }
      ]);
    }
  }, [loggedIn]);

  return (
    <BrowserRouter>
      <NavBar navitems={navItems} isOpen={navBarIsOpen} closeMenu={openCloseNavBar}/>
      <TopNav openMenu={openCloseNavBar} />

      <main className='main' onClick={()=> openCloseNavBar(false)}>
        <Routes>
          <Route index={true} element={<HomePage />} />
        </Routes>
      </main>

    </BrowserRouter>
  );
}

/*can we give Routes styling, is it like a container?  */

export default App;


