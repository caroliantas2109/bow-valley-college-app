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
