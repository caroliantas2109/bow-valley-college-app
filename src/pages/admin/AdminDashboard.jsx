import React, { useState } from 'react';

//lets import data
import { students, admins, courses, programs } from '../../data/mockData.js';
import '../../styles/Dashboard.css';

const AdminDashboard = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  userData = students;
  
  const systemStats = {
    totalStudents: 245,
    totalCourses: 42,
    newRegistrations: 15,
    pendingMessages: 7
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Bow Valley College</h1>
          <p>Administration Portal</p>
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
              className={activeTab === 'courses' ? 'active' : ''}
              onClick={() => setActiveTab('courses')}
            >
              Courses
            </li>
            <li 
              className={activeTab === 'students' ? 'active' : ''}
              onClick={() => setActiveTab('students')}
            >
              Students
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
                <h2>Administration Dashboard</h2>
                <div className="admin-info-card card">
                  <h3>Admin Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Admin ID:</label>
                      <span>{userData.adminId}</span>
                    </div>
                    <div className="info-item">
                      <label>Role:</label>
                      <span>{userData.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                {/* System Statistics */}
                <div className="dashboard-card card stats-card">
                  <h3>System Statistics</h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-number">{systemStats.totalStudents}</span>
                      <span className="stat-label">Total Students</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{systemStats.totalCourses}</span>
                      <span className="stat-label">Total Courses</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{systemStats.newRegistrations}</span>
                      <span className="stat-label">New Registrations</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{systemStats.pendingMessages}</span>
                      <span className="stat-label">Pending Messages</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-card card">
                  <h3>Quick Actions</h3>
                  <div className="action-buttons">
                    <button className="btn btn-primary">Create New Course</button>
                    <button className="btn btn-primary">Manage Students</button>
                    <button className="btn btn-primary">View Messages</button>
                    <button className="btn btn-primary">Generate Reports</button>
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
                  <p><strong>Admin ID:</strong> {userData.adminId}</p>
                  <p><strong>Role:</strong> {userData.role}</p>
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

export default AdminDashboard;
