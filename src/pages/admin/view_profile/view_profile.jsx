import React from 'react';
import styles from './view_profile.module.css';

const ProfileView = ({ user, onEdit, onChangePassword, onLogout }) => {
  const u = user || {
    firstName: 'Kachi',
    lastName: 'O.',
    email: 'kachi@example.com',
    phone: '+1 (403) 555-0123',
    role: 'Administrator',
    department: 'IT',
    adminId: 'ADM-2041',
    username: 'kachi-admin',
    joined: 'Jan 8, 2024',
    avatarUrl: '',
  };

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className="purple-orange-gradient-text bg-clip-text">Profile</h1>
        <p className={styles.subtitle}>View and manage your account information</p>
      </header>

      <section className={styles.grid}>
        {/* Left column — identity card */}
        <aside className={`${styles.card} ${styles.identityCard}`}>
          <div className={styles.avatarWrap}>
            {u.avatarUrl ? (
              <img className={styles.avatar} src={u.avatarUrl} alt={`${u.firstName} ${u.lastName}`} />
            ) : (
              <div className={styles.avatarFallback}>
                {`${u.firstName?.[0] || 'A'}${u.lastName?.[0] || 'U'}`}
              </div>
            )}
          </div>

          <div className={styles.nameBlock}>
            <h2 className={styles.name}>{u.firstName} {u.lastName}</h2>
            <span className={styles.roleBadge}>{u.role}</span>
            <span className={styles.metaText}>Joined {u.joined}</span>
          </div>

          <div className={styles.actions}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onEdit}>Edit Profile</button>
            <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onChangePassword}>Change Password</button>
            <button className={`${styles.btn} ${styles.btnDanger}`} onClick={onLogout}>Log out</button>
          </div>

          <div className={styles.quickStats}>
            <div className={styles.statBox}>
              <div className={styles.statValue}>245</div>
              <div className={styles.statLabel}>Students</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statValue}>42</div>
              <div className={styles.statLabel}>Courses</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statValue}>15</div>
              <div className={styles.statLabel}>New Regs</div>
            </div>
          </div>
        </aside>

        {/* Right column — details */}
        <section className={styles.rightCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Personal Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Full Name</label>
                <span>{u.firstName} {u.lastName}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Username</label>
                <span>{u.username}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Email</label>
                <span>{u.email}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Phone</label>
                <span>{u.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Department</label>
                <span>{u.department}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Role</label>
                <span>{u.role}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Admin ID</label>
                <span>{u.adminId}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Joined</label>
                <span>{u.joined}</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Recent Activity</h3>
            <ul className={styles.activityList}>
              <li>
                <span className={styles.dot} />
                Approved 12 new registrations
                <time> Today, 09:42</time>
              </li>
              <li>
                <span className={styles.dot} />
                Updated course “Web Dev 101”
                <time> Yesterday, 16:10</time>
              </li>
              <li>
                <span className={styles.dot} />
                Reset password for student #S-8821
                <time> Oct 27, 11:03</time>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ProfileView;
