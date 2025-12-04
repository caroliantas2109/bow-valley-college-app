<<<<<<< HEAD
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useState, useEffect } from "react";

// //-------------css file --------------------------------------
// import './App.css';

// //------------------------pages -------------------------------
// import HomePage from './pages/home/home-page.jsx';
// import Registration from './pages/student/registration/student-registration.jsx';
// import AdminViewStudent from './pages/admin/view_student/view_student.jsx';
// import SignUp from './pages/auth/signup/signup.jsx';
// import Login from './pages/auth/login/login.jsx';
// import AdminDashboard from './pages/admin/dashboard/AdminDashboard.jsx';
// import ProfileView from './pages/admin/view_profile/view_profile.jsx';
// import CourseManager from './pages/admin/courses/courseManager.jsx';
// import Messages from './pages/admin/messages/messages.jsx';
// import StudentDashboard from './pages/student/dashboard/StudentDashboard.jsx';
// import MessageForm from './pages/student/messages/message_form.jsx';
// import AdminViewCourses from './pages/view_courses/view_course.jsx';

// //------------------components---------------------------------
// import NavBar from './components/navbar/navbar.jsx';
// import TopNav from './components/top-nav/top-nav.jsx';
// import NotificationBar from './components/notification/notification.jsx';

// //-------------icons-------------------------------------------
// import { RiHome9Line } from "react-icons/ri";
// import { PiBooks } from "react-icons/pi";
// import { TbSchool, TbLayoutDashboard, TbLogout, TbUser, TbMessageCircle, TbUsers } from "react-icons/tb";
// import { FaWpforms } from "react-icons/fa";
// import { FiBell } from 'react-icons/fi';

// //global contexts
// import { useNotification } from './globalProviders/NotificationProvider.jsx';


// function App() {
//   const [loggedIn, setUser] = useState("student");
//   const [navItems, setNavItems] = useState([]);
//   const [navBarIsOpen, openCloseNavBar] = useState(false);
//   const {notificationState} = useNotification();

//   // useEffect(() => {
//   //   if (loggedIn === "none") {
//   //     setNavItems([
//   //       { name: "Home", icon: RiHome9Line },
//   //       { name: "Programs and Courses", icon: PiBooks },
//   //       { name: "My BVC", icon: TbSchool }
//   //     ]);
//   //   }
//   //   else if (loggedIn === "student") {
//   //     setNavItems([
//   //       { name: "Dashboard", icon: TbLayoutDashboard },
//   //       { name: "Registration", icon: FaWpforms },
//   //       { name: "View Courses", icon: PiBooks },
//   //       { name: "View Profile", icon: TbUser },
//   //       { name: "Send Message", icon: TbMessageCircle },
//   //       { name: "Log Out", icon: TbLogout }
//   //     ]);
//     seEffect(() => {
//   if (loggedIn === "none") {
//     setNavItems([
//       { name: "Home", icon: RiHome9Line, path: "/" },
//       { name: "Programs and Courses", icon: PiBooks, path: "/viewcourse" },
//       { name: "My BVC", icon: TbSchool, path: "/login" }
//     ]);
//   }
//   else if (loggedIn === "student") {
//     setNavItems([
//       { name: "Dashboard", icon: TbLayoutDashboard, path: "/student/dashboard" },
//       { name: "Registration", icon: FaWpforms, path: "/student/registration" },
//       { name: "View Courses", icon: PiBooks, path: "/viewcourse" },
//       { name: "View Profile", icon: TbUser, path: "/viewprofile" },
//       { name: "Send Message", icon: TbMessageCircle, path: "/studentmessage" },
//       { name: "Log Out", icon: TbLogout, path: "/login", logout: true }
//     ]);
//   }
//   else if (loggedIn === "admin") {
//     setNavItems([
//       { name: "Dashboard", icon: TbLayoutDashboard, path: "/admin/dashboard" },
//       { name: "View Profile", icon: TbUser, path: "/viewprofile" },
//       { name: "Courses", icon: PiBooks, path: "/courses" },
//       { name: "View Students", icon: TbUsers, path: "/adminviewstudent" },
//       { name: "Messages", icon: TbMessageCircle, path: "/messages" }
//     ]);
//   }
// }, [loggedIn]);

//   return (
//     <BrowserRouter>
//       <NavBar navitems={navItems} isOpen={navBarIsOpen} closeMenu={openCloseNavBar} />
//       <TopNav openMenu={openCloseNavBar} />
//       <NotificationBar state={notificationState}/>

//       <main className='main' onClick={() => openCloseNavBar(false)}>
//         <Routes>
//           <Route index={true} element={<HomePage />} />
//           <Route path='/student/registration' element={<Registration />} />
//           <Route path='/student/dashboard' element={<StudentDashboard />} />
//           <Route path='/adminviewstudent' element={<AdminViewStudent />} />
//           <Route path='/admin/dashboard' element={<AdminDashboard />} />
//           <Route path='/viewprofile' element={<ProfileView />} />
//           <Route path='/courses' element={<CourseManager />} />
//           <Route path='/messages' element={<Messages />} />
//           <Route path='/signup' element={<SignUp />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/studentmessage' element={<MessageForm />} />
//           <Route path='/viewcourse' element={<AdminViewCourses />} />
//         </Routes>
//       </main>

//     </BrowserRouter>
//   );
// }

// //move to utils folder later

// //define a hook to use the useNotificationBar hook
// export function useCallNotificationBar() {
//   const { setNotificationState } = useNotification();

//   //function that uses setNotificationState to set the values of the notification bar
//   function callNotificationBarWithValues(notificationTitle, notificationMessage, type = "medium", icon = FiBell) {
//     setNotificationState({
//       notification: {
//         title: notificationTitle,
//         message: notificationMessage,
//       },
//       type,
//       icon,
//     });
//   }

//   return callNotificationBarWithValues;
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";

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
import MessageForm from './pages/student/messages/message_form.jsx';
import AdminViewCourses from './pages/view_courses/view_course.jsx';

//------------------components---------------------------------
import NavBar from './components/navbar/navbar.jsx';
import TopNav from './components/top-nav/top-nav.jsx';
import NotificationBar from './components/notification/notification.jsx';

//-------------icons-------------------------------------------
import { RiHome9Line } from "react-icons/ri";
import { PiBooks } from "react-icons/pi";
import { TbSchool, TbLayoutDashboard, TbLogout, TbUser, TbMessageCircle, TbUsers } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import { FiBell } from 'react-icons/fi';

//global contexts
import { useNotification } from './globalProviders/NotificationProvider.jsx';


function App() {
  const [loggedIn, setUser] = useState("student");
  const [navItems, setNavItems] = useState([]);
  const [navBarIsOpen, openCloseNavBar] = useState(false);
  const { notificationState } = useNotification();

  // 👇 NOVO useEffect CORRETO
  useEffect(() => {
    if (loggedIn === "none") {
      setNavItems([
        { name: "Home", icon: RiHome9Line, path: "/" },
        { name: "Programs and Courses", icon: PiBooks, path: "/viewcourse" },
        { name: "My BVC", icon: TbSchool, path: "/login" }
      ]);
    }
    else if (loggedIn === "student") {
      setNavItems([
        { name: "Dashboard", icon: TbLayoutDashboard, path: "/student/dashboard" },
        { name: "Registration", icon: FaWpforms, path: "/student/registration" },
        { name: "View Courses", icon: PiBooks, path: "/viewcourse" },
        { name: "View Profile", icon: TbUser, path: "/viewprofile" },
        { name: "Send Message", icon: TbMessageCircle, path: "/studentmessage" },
        { name: "Log Out", icon: TbLogout, path: "/login", logout: true }
      ]);
    }
    else if (loggedIn === "admin") {
      setNavItems([
        { name: "Dashboard", icon: TbLayoutDashboard, path: "/admin/dashboard" },
        { name: "View Profile", icon: TbUser, path: "/viewprofile" },
        { name: "Courses", icon: PiBooks, path: "/courses" },
        { name: "View Students", icon: TbUsers, path: "/adminviewstudent" },
        { name: "Messages", icon: TbMessageCircle, path: "/messages" }
      ]);
    }
  }, [loggedIn]);

  return (
    <BrowserRouter>
      <NavBar navitems={navItems} isOpen={navBarIsOpen} closeMenu={openCloseNavBar} />
      <TopNav openMenu={openCloseNavBar} />
      <NotificationBar state={notificationState} />

      <main className='main' onClick={() => openCloseNavBar(false)}>
        <Routes>
          <Route index={true} element={<HomePage />} />
          <Route path='/student/registration' element={<Registration />} />
          <Route path='/student/dashboard' element={<StudentDashboard />} />
          <Route path='/adminviewstudent' element={<AdminViewStudent />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/viewprofile' element={<ProfileView />} />
          <Route path='/courses' element={<CourseManager />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/studentmessage' element={<MessageForm />} />
          <Route path='/viewcourse' element={<AdminViewCourses />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

//move to utils folder later

//define a hook to use the useNotificationBar hook
export function useCallNotificationBar() {
  const { setNotificationState } = useNotification();

  //function that uses setNotificationState to set the values of the notification bar
  function callNotificationBarWithValues(notificationTitle, notificationMessage, type = "medium", icon = FiBell) {
    setNotificationState({
      notification: {
        title: notificationTitle,
        message: notificationMessage,
      },
      type,
      icon,
    });
  }

  return callNotificationBarWithValues;
}

export default App;

=======
import React from 'react';
import { students, admins, courses, programs } from './data/mockData';
// import './styles/Common.css';
// import './styles/HomePage.css';
// import './styles/Dashboard.css';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  // Test if data imports correctly
  console.log('Students:', students);
  console.log('Admins:', admins);
  console.log('Courses:', courses);
  console.log('Programs:', programs);

  return (
    <div className="App">

      <AdminDashboard></AdminDashboard>
    </div>


  );
}
>>>>>>> 3ae9be817abb6f8cf014c29a765b53e479f6cce7
