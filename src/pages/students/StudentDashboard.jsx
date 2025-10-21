import React, { useState } from 'react';

const StudentDashboard = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data
  const currentCourses = [
    {
      code: "DATA2201",
      name: "Relational Databases",
      section: "25SEPMNOS3",
      startDate: "September 2, 2025",
      endDate: "December 18, 2025",
      credits: 3,
      campus: "Distance Learning",
      delivery: "Online - Synchronous"
    }
  ];
  
  const upcomingDeadlines = [
    { task: "Assignment 1 - Relational Databases", dueDate: "October 25, 2025" },
    { task: "Project Proposal - Software Development", dueDate: "November 5, 2025" }
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Bou Valley College</h1>
          <p>Hit the ground working.</p>
        </div>
        <div className="header-right">
          <p className="current-date">October 16, 2025</p>
          <div className="user-info">
            <span>Welcome back, {userData.firstName}</span>
            <button className="logout-btn" onClick={onLogout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <ul>
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </li>
            <li 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </li>
            <li 
              className={activeTab === 'registration' ? 'active' : ''}
              onClick={() => setActiveTab('registration')}
            >
              Registration
            </li>
            <li 
              className={activeTab === 'schedule' ? 'active' : ''}
              onClick={() => setActiveTab('schedule')}
            >
              Schedule
            </li>
            <li 
              className={activeTab === 'messages' ? 'active' : ''}
              onClick={() => setActiveTab('messages')}
            >
              Messages
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-tab">
              <div className="welcome-section">
                <h2>Welcome back, {userData.firstName}!</h2>
                <div className="student-info-card card">
                  <h3>Student Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Student ID:</label>
                      <span>{userData.studentId}</span>
                    </div>
                    <div className="info-item">
                      <label>Program:</label>
                      <span>{userData.program}</span>
                    </div>
                    <div className="info-item">
                      <label>Department:</label>
                      <span>{userData.department}</span>
                    </div>
                    <div className="info-item">
                      <label>Current Term:</label>
                      <span>Winter 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                {/* Current Courses */}
                <div className="dashboard-card card">
                  <h3>Current Courses</h3>
                  {currentCourses.map((course, index) => (
                    <div key={index} className="course-item">
                      <h4>{course.code} - {course.name}</h4>
                      <p>Section: {course.section}</p>
                      <p>{course.startDate} to {course.endDate}</p>
                      <p>{course.campus} • {course.delivery}</p>
                    </div>
                  ))}
                </div>

                {/* Upcoming Deadlines */}
                <div className="dashboard-card card">
                  <h3>Upcoming Deadlines</h3>
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="deadline-item">
                      <p className="deadline-task">{deadline.task}</p>
                      <p className="deadline-date">Due: {deadline.dueDate}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="dashboard-card card">
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    <button className="btn btn-primary">Register for Courses</button>
                    <button className="btn btn-primary">View Schedule</button>
                    <button className="btn btn-primary">Update Profile</button>
                    <button className="btn btn-primary">Contact Admin</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <h2>Profile Information</h2>
              <div className="card">
                <h3>Personal Information</h3>
                <div className="profile-info">
                  <p><strong>Name:</strong> {userData.firstName} {userData.lastName}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Phone:</strong> {userData.phone}</p>
                  <p><strong>Student ID:</strong> {userData.studentId}</p>
                  <p><strong>Program:</strong> {userData.program}</p>
                  <p><strong>Department:</strong> {userData.department}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;