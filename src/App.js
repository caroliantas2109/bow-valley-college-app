import React from 'react';
import { students, admins, courses, programs } from './data/mockData';
import './styles/common.css';

function App() {
  // Test if data imports correctly
  console.log('Students:', students);
  console.log('Admins:', admins);
  console.log('Courses:', courses);
  console.log('Programs:', programs);

  return (
    <div className="App">
      <h1>Data Import Test</h1>
      <p>Check the browser console (F12) to see if data loaded correctly</p>
      <div style={{ padding: '20px' }}>
        <h2>Test Students:</h2>
        <p>First Student: {students[0].firstName} {students[0].lastName}</p>
        <p>Student ID: {students[0].studentId}</p>
        
        <h2>Test Courses:</h2>
        <p>First Course: {courses[0].code} - {courses[0].name}</p>
      </div>
    </div>
  );
}

export default App;

