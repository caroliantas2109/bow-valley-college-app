import React, {useState, useEffect } from 'react';
import styles from './studentdashboard.module.css';
import { useNavigate } from "react-router-dom";

import {getCurrentTermInfo} from "../../../utils/getTerm"

const StudentDashboard = ({ userData = {}, onLogout }) => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');

  // state coming from backend
  const [user, setUser] = useState(userData);
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'unauthorized' | 'error'

  // get current date + term
  const {year, term, readableDate} = getCurrentTermInfo();

  const currentYear = year;
  const currentTerm = term;
  const formattedDate = readableDate
  
  // fetch dashboard data on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      try {
        console.log("started");

        const res = await fetch(
          `http://localhost:5000/api/student/dashboard?year=${currentYear}`,
          {
            method: 'GET',
            credentials: 'include', // send cookie
          }
        );

        console.log("finito")

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            if (!cancelled) setStatus('unauthorized');
            navigate("/login");
          } else {
            if (!cancelled) setStatus('error');
          }
          return;
        }

        const data = await res.json(); // { user: {...}, courses: [...] }
        console.log(data);

        if (!cancelled) {
          setUser(data.user || {});
          setCourses(data.courses || []);
          setStatus('ok');
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        if (!cancelled) setStatus('error');
      }
    }

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, [currentYear]);

  // fallback values if something is missing
  const resolvedUser = {
    firstName: user?.first_name || 'Student',
    lastName: user?.last_name || '',
    email: user?.email || 'student@example.com',
    phone: user?.phone || '—',
    studentId: user?.student_id || 'STU-0001',
    program: 'Software Development',
    department: 'IT',
  };

  const currentCourses = courses;

  //conditional rendering based on status
  if (status === 'loading') {
    return (
      <div className={styles.dashboardContainer}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (status === 'unauthorized') {
    return (
      <div className={styles.dashboardContainer}>
        <p>Sorry, you cannot access this page.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.dashboardContainer}>
        <p>Something went wrong while loading your dashboard.</p>
      </div>
    );
  }

  // status === 'ok'
  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>
          <h1>Bow Valley College</h1>
          <p>Hit the ground working.</p>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.currentDate}>{formattedDate}</p>
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
                      <span>
                        {currentTerm} {currentYear}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.dashboardGrid}>
                {/* Current Courses */}
                <div className={styles.card}>
                  <h3>Current Courses</h3>
                  {currentCourses.length === 0 ? (
                    <p>You are not enrolled in any courses for this term.</p>
                  ) : (
                    currentCourses.map((course, index) => (
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
                    ))
                  )}
                </div>

                {/* Quick Actions */}
                <div className={styles.card}>
                  <h3>Quick Actions</h3>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={() => navigate('/student/registration')}
                    >
                      Register for Courses
                    </button>

                    <button
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={() => navigate('/courses')}
                    >
                      View Courses
                    </button>

                    <button
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={() => navigate('/viewprofile')}
                    >
                      View Profile
                    </button>

                    <button
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={() => navigate('/messages')}
                    >
                      Contact Admin
                    </button>
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
