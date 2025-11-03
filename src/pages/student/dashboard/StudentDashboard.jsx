import React, { useState } from 'react';
import styles from './studentdashboard.module.css';

const StudentDashboard = ({ userData = {}, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const resolvedUser = {
    firstName: userData.firstName || 'Student',
    lastName: userData.lastName || '',
    email: userData.email || 'student@example.com',
    phone: userData.phone || '—',
    studentId: userData.studentId || 'STU-0001',
    program: userData.program || 'Software Development',
    department: userData.department || 'IT',
  };

  // Sample data
  const currentCourses = [
    {
      code: 'DATA2201',
      name: 'Relational Databases',
      section: '25SEPMNOS3',
      startDate: 'September 2, 2025',
      endDate: 'December 18, 2025',
      credits: 3,
      campus: 'Distance Learning',
      delivery: 'Online - Synchronous',
    },
  ];



  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h1>Bow Valley College</h1>
          <p>Hit the ground working.</p>
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
            <div className={styles.dashboardTab}>
              <div className={styles.welcomeSection}>
                <h2>Welcome back, {resolvedUser.firstName}!</h2>

                <div className={styles.card}>
                  <h3>Student Information</h3>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <label>Student ID:</label>
                      <span>{resolvedUser.studentId}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <label>Program:</label>
                      <span>{resolvedUser.program}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <label>Department:</label>
                      <span>{resolvedUser.department}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <label>Current Term:</label>
                      <span>Winter 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.dashboardGrid}>
                {/* Current Courses */}
                <div className={styles.card}>
                  <h3>Current Courses</h3>
                  {currentCourses.map((course, index) => (
                    <div key={index} className={styles.courseItem}>
                      <h4>
                        {course.code} - {course.name}
                      </h4>
                      <p>Section: {course.section}</p>
                      <p>
                        {course.startDate} to {course.endDate}
                      </p>
                      <p>
                        {course.campus} • {course.delivery}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className={styles.card}>
                  <h3>Quick Actions</h3>
                  <div className={styles.actionButtons}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>Register for Courses</button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>View Courses</button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>View Profile</button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>Contact Admin</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className={styles.profileTab}>
              <h2 className={styles.profileTabTitle}>Profile Information</h2>
              <div className={styles.card}>
                <h3>Personal Information</h3>
                <div className={styles.profileInfo}>
                  <p>
                    <strong>Name:</strong> {resolvedUser.firstName} {resolvedUser.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {resolvedUser.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {resolvedUser.phone}
                  </p>
                  <p>
                    <strong>Student ID:</strong> {resolvedUser.studentId}
                  </p>
                  <p>
                    <strong>Program:</strong> {resolvedUser.program}
                  </p>
                  <p>
                    <strong>Department:</strong> {resolvedUser.department}
                  </p>
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
