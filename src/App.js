//-------------css file --------------------------------------
import './App.css';

//------------------------pages -------------------------------
import HomePage from './pages/home/home-page.jsx';
import Registration from './pages/student/registration/student-registration.jsx';
import AdminViewStudent from './pages/admin/view_student/view_student.jsx';
import SignUp from './pages/auth/signup/signup.jsx';
import Login from './pages/auth/login/login.jsx';
import AdminDashboard from './pages/admin/dashboard/AdminDashboard.jsx';
import ProfileView from './pages/admin/view_profile/view_profile.jsx';
import CourseManager from './pages/admin/courses/courseManager.jsx';
import Messages from './pages/admin/messages/messages.jsx';
import StudentDashboard from './pages/student/dashboard/StudentDashboard.jsx';

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
  const [loggedIn, setUser] = useState("student");
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
          <Route path='/registration' element={<Registration/>} />
          <Route path='/studentdashboard' element={<StudentDashboard/>} />
          <Route path='/adminviewstudent' element={<AdminViewStudent/>} />
          <Route path='/admindashboard' element={<AdminDashboard/>} />
          <Route path='/viewprofile' element={<ProfileView/>} />
          <Route path='/courses' element={<CourseManager/>} />
          <Route path='/messages' element={<Messages/>} />
          <Route  path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;


