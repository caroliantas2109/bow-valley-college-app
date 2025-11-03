import React, { useState } from 'react';
import styles from './adminDashboard.module.css';

// Data
import { students, admins, courses, programs } from '../../../data/mockData.js';

const AdminDashboard = ({ userData, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');


  const resolvedUser =
    userData && !Array.isArray(userData) ? userData : (Array.isArray(students) ? students[0] : {});

  const systemStats = {
    totalStudents: 245,
    totalCourses: 42,
    newRegistrations: 15,
    pendingMessages: 7
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h1>Bow Valley College</h1>
          <p>Administration Portal</p>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.currentDate}>October 16, 2025</p>
          <div className={styles.userInfo}>
            <span>Welcome back, {resolvedUser.firstName}</span>
            <button className={styles.logoutBtn} onClick={onLogout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className={styles.dashboardBody}>
        {/* Main Content Area */}
        <main className={styles.mainContent}>
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className={`${styles.dashboardTab}`}>
              <div className={`${styles.welcomeSection}`}>
                <h2 className={styles.dashboardTabTitle}>Administration Dashboard</h2>

                <div className={`${styles.card}`}>
                  <h3>Admin Information</h3>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <label>Admin ID:</label>
                      <span>{resolvedUser.adminId}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <label>Role:</label>
                      <span>{resolvedUser.role}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.dashboardGrid}>
                {/* System Statistics */}
                <div className={`${styles.card}`}>
                  <h3>System Statistics</h3>
                  <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>{systemStats.totalStudents}</span>
                      <span className={styles.statLabel}>Total Students</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>{systemStats.totalCourses}</span>
                      <span className={styles.statLabel}>Total Courses</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>{systemStats.newRegistrations}</span>
                      <span className={styles.statLabel}>New Registrations</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statNumber}>{systemStats.pendingMessages}</span>
                      <span className={styles.statLabel}>Pending Messages</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`${styles.card}`}>
                  <h3>Quick Actions</h3>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>Manage Course</button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>Manage Students</button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>View Messages</button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>View Profile</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className={styles.profileTabTitle}>Profile Information</h2>
              <div className={styles.card}>
                <h3>Personal Information</h3>
                <div className={styles.profileInfo}>
                  <p><strong>Name:</strong> {resolvedUser.firstName} {resolvedUser.lastName}</p>
                  <p><strong>Email:</strong> {resolvedUser.email}</p>
                  <p><strong>Phone:</strong> {resolvedUser.phone}</p>
                  <p><strong>Admin ID:</strong> {resolvedUser.adminId}</p>
                  <p><strong>Role:</strong> {resolvedUser.role}</p>
                  <p><strong>Department:</strong> {resolvedUser.department}</p>
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
