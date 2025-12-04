// import React, { useState, useEffect } from 'react';
// import styles from './view_profile.module.css';
// import { useNavigate } from 'react-router-dom';
// import {useCallNotificationBar} from "../../../App";

// import { getCurrentTermInfo } from '../../../utils/getTerm';

// const ProfileView = ({ onEdit, onChangePassword, onLogout }) => {
//   const navigate = useNavigate();
//   const callNotificationBarWithValues = useCallNotificationBar();

//   const [userData, setUserData] = useState(null); // null = not loaded yet
//   const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'unauthorized' | 'error'
//   const [isEditing, setIsEditing] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState(null);


//   const { year, term, readableDate } = getCurrentTermInfo();

//   // fetch profile data on mount
//   useEffect(() => {
//     let cancelled = false;

//     async function fetchProfile() {
//       try {
//         console.log("Profile fetch started");

//         const res = await fetch('http://localhost:5000/api/viewprofile', {
//           method: 'GET',
//           credentials: 'include', // send cookie
//         });

//         console.log("Profile fetch finished");

//         if (!res.ok) {
//           if (res.status === 401 || res.status === 403) {
//             if (!cancelled) setStatus('unauthorized');
//             navigate('/login');
//           } else {
//             if (!cancelled) setStatus('error');
//           }
//           return;
//         }

//         const data = await res.json(); // { user: {...} }
//         console.log('Profile data:', data);

//         if (!cancelled) {
//           setUserData(data.user || {});
//           setStatus('ok');
//         }
//       } catch (err) {
//         console.error('Profile fetch error:', err);
//         if (!cancelled) setStatus('error');
//       }
//     }

//     fetchProfile();

//     return () => {
//       cancelled = true;
//     };
//   }, [navigate]);
//   //add navigate to make react stop complaining

//   // fallback user object after successful fetch
//   const u = {
//     firstName: userData?.firstName || '',
//     lastName: userData?.lastName || '',
//     username: userData?.username || '',
//     email: userData?.email || '',
//     phone: userData?.phone || '',
//     role: userData?.role || '',
//     department: userData?.department || '',
//     id: userData?.id || '',
//     joined: userData?.joined || '',
//     avatarUrl: userData?.avatarUrl || '',
//   };

//   //build default form object based on the above object
//   const [form, setForm] = useState({
//     firstName: u.firstName || '',
//     lastName: u.lastName || '',
//     email: u.email || '',
//     phone: u.phone || '',
//   });

//   //setForm to values from userData which we have in u
//   useEffect(() => {
//     setForm({
//       firstName: u.firstName || '',
//       lastName: u.lastName || '',
//       email: u.email || '',
//       phone: u.phone || '',
//     });
//   }, [userData]);

//   if (status === 'loading') {
//     return (
//       <main className={styles.page}>
//         <p>Loading profile...</p>
//       </main>
//     );
//   }

//   if (status === 'unauthorized') {
//     return (
//       <main className={styles.page}>
//         <p>You are not authorized to view this profile.</p>
//       </main>
//     );
//   }

//   if (status === 'error') {
//     return (
//       <main className={styles.page}>
//         <p>Something went wrong while loading your profile.</p>
//       </main>
//     );
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   }

//   function startEditing() {
//     setIsEditing(true);
//     setError(null);
//   }

//   function cancelEditing() {
//     setIsEditing(false);
//     setError(null);
//     // reset form back to current u values
//     setForm({
//       firstName: u.firstName || '',
//       lastName: u.lastName || '',
//       email: u.email || '',
//       phone: u.phone || '',
//     });
//   }

//   async function handleSave(e) {
//     e.preventDefault();
//     setIsSaving(true);
//     setError(null);

//     try {
//       const res = await fetch('http://localhost:5000/api/users/', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(form),
//       });

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         throw new Error(data.error || 'Failed to update profile');
//       }

//       const data = await res.json(); //{ user: {...} }

//       // update main userData
//       setUserData(data.user || {});
//       setIsEditing(false);

//       callNotificationBarWithValues("Good job", "User has been updated suucessfully", "okay");
//     } catch (err) {
//       console.error('Profile update error:', err);
//       setError(err.message);
//       callNotificationBarWithValues("Network error", "Failed to update profile", "bad");
//     } finally {
//       setIsSaving(false);
//     }
//   }



//   return (
//     <main className={styles.page}>
//       <header className={styles.pageHeader}>
//         <h1 className="purple-orange-gradient-text bg-clip-text">Profile</h1>
//         <p className={styles.subtitle}>View and manage your account information</p>
//       </header>

//       <section className={styles.grid}>
//         {/* Left column — identity card */}
//         <aside className={`${styles.card} ${styles.identityCard}`}>
//           <div className={styles.avatarWrap}>
//             {u.avatarUrl ? (
//               <img
//                 className={styles.avatar}
//                 src={u.avatarUrl}
//                 alt={`${u.firstName} ${u.lastName}`}
//               />
//             ) : (
//               <div className={styles.avatarFallback}>
//                 {`${u.firstName?.[0] || 'A'}${u.lastName?.[0] || 'U'}`}
//               </div>
//             )}
//           </div>

//           <div className={styles.nameBlock}>
//             <h2 className={styles.name}>
//               {u.firstName} {u.lastName}
//             </h2>
//             <span className={styles.roleBadge}>{u.role || 'User'}</span>
//             <span className={styles.metaText}>
//               Joined {u.joined || '—'}
//             </span>
//           </div>

//           <div className={styles.actions}>
//             <button
//               className={`${styles.btn} ${styles.btnPrimary}`}
//               onClick={startEditing}
//             >
//               Edit Profile
//             </button>
//             <button
//               className={`${styles.btn} ${styles.btnGhost}`}
//               onClick={onChangePassword}
//             >
//               Change Password
//             </button>
//             <button
//               className={`${styles.btn} ${styles.btnDanger}`}
//               onClick={onLogout}
//             >
//               Log out
//             </button>
//           </div>

//           {u.role === "Student" && (
//             <div className={styles.quickStats}>
//               <div className={styles.statBox}>
//                 <div className={styles.statValue}>{term}{year}</div>
//                 <div className={styles.statLabel}>Current Term</div>
//               </div>

//               <div className={styles.statBox}>
//                 <div className={styles.statValue}>Software Dev</div>
//                 <div className={styles.statLabel}>Program</div>
//               </div>

//               <div className={styles.statBox}>
//                 <div className={styles.statValue}>Year 1</div>
//                 <div className={styles.statLabel}>Level</div>
//               </div>
//             </div>
//           )}

//         </aside>

//         {/* Right column — details */}
//         <section className={styles.rightCol}>
//           <form className={styles.card} onSubmit={handleSave}>
//             <h3 className={styles.cardTitle}>Personal Information</h3>

//             {error && <p className={styles.errorText}>{error}</p>}

//             <div className={styles.infoGrid}>
//               <div className={styles.infoItem}>
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={form.firstName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//               </div>

//               <div className={styles.infoItem}>
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={form.lastName}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//               </div>

//               <div className={styles.infoItem}>
//                 <label>Username</label>
//                 <span>{u.username || '—'}</span> {/* read-only */}
//               </div>

//               <div className={styles.infoItem}>
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//               </div>

//               <div className={styles.infoItem}>
//                 <label>Phone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                 />
//               </div>

//               <div className={styles.infoItem}>
//                 <label>Department</label>
//                 <span>{u.department || '—'}</span>
//               </div>

//               <div className={styles.infoItem}>
//                 <label>Role</label>
//                 <span>{u.role || '—'}</span>
//               </div>

//               <div className={styles.infoItem}>
//                 <label>ID</label>
//                 <span>{u.id || '—'}</span> 
//               </div>

//               <div className={styles.infoItem}>
//                 <label>Joined</label>
//                 <span>{u.joined || '—'}</span>
//               </div>
//             </div>

//             {/* Buttons for edit / save / cancel */}
//             <div className={styles.formActions}>
//               {isEditing && (
//                 <>
//                   <button
//                     type="button"
//                     className={styles.btn}
//                     onClick={cancelEditing}
//                     disabled={isSaving}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className={`${styles.btn} ${styles.btnPrimary}`}
//                     disabled={isSaving}
//                   >
//                     {isSaving ? 'Saving...' : 'Save Changes'}
//                   </button>
//                 </>
//               )}
//             </div>
//           </form>

//           {u.role === "ADMIN" && (
//             <div className={styles.card}>
//               <h3 className={styles.cardTitle}>Recent Activity</h3>
//               <ul className={styles.activityList}>
//                 <li>
//                   <span className={styles.dot} />
//                   Approved 12 new registrations
//                   <time> Today, 09:42</time>
//                 </li>
//                 <li>
//                   <span className={styles.dot} />
//                   Updated course “Web Dev 101”
//                   <time> Yesterday, 16:10</time>
//                 </li>
//                 <li>
//                   <span className={styles.dot} />
//                   Reset password for another user
//                   <time> Oct 27, 11:03</time>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </section>
//       </section>
//     </main>
//   );
// };

// export default ProfileView;

import React, { useState, useEffect } from 'react';
import styles from './view_profile.module.css';
import { useNavigate } from 'react-router-dom';
import { useCallNotificationBar } from "../../../App";

import { getCurrentTermInfo } from '../../../utils/getTerm';
import ChangePasswordModal from '../../../components/change-password/change-password-modal';

const ProfileView = ({ onEdit, onChangePassword, onLogout }) => {
  const navigate = useNavigate();
  const callNotificationBarWithValues = useCallNotificationBar();

  const [userData, setUserData] = useState(null); // null = not loaded yet
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'unauthorized' | 'error'
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // NEW: controls the Change Password modal visibility
  const [showChangePassword, setShowChangePassword] = useState(false);

  const { year, term, readableDate } = getCurrentTermInfo();

  // fetch profile data on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      try {
        console.log("Profile fetch started");

        const res = await fetch('http://localhost:5000/api/viewprofile', {
          method: 'GET',
          credentials: 'include', // send cookie
        });

        console.log("Profile fetch finished");

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            if (!cancelled) setStatus('unauthorized');
            navigate('/login');
          } else {
            if (!cancelled) setStatus('error');
          }
          return;
        }

        const data = await res.json(); // { user: {...} }
        console.log('Profile data:', data);

        if (!cancelled) {
          setUserData(data.user || {});
          setStatus('ok');
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        if (!cancelled) setStatus('error');
      }
    }

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [navigate]);
  //add navigate to make react stop complaining

  // fallback user object after successful fetch
  const u = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    username: userData?.username || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    role: userData?.role || '',
    department: userData?.department || '',
    id: userData?.id || '',
    joined: userData?.joined || '',
    avatarUrl: userData?.avatarUrl || '',
  };

  //build default form object based on the above object
  const [form, setForm] = useState({
    firstName: u.firstName || '',
    lastName: u.lastName || '',
    email: u.email || '',
    phone: u.phone || '',
  });

  //setForm to values from userData which we have in u
  useEffect(() => {
    setForm({
      firstName: u.firstName || '',
      lastName: u.lastName || '',
      email: u.email || '',
      phone: u.phone || '',
    });
  }, [userData]);

  if (status === 'loading') {
    return (
      <main className={styles.page}>
        <p>Loading profile...</p>
      </main>
    );
  }

  if (status === 'unauthorized') {
    return (
      <main className={styles.page}>
        <p>You are not authorized to view this profile.</p>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className={styles.page}>
        <p>Something went wrong while loading your profile.</p>
      </main>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function startEditing() {
    setIsEditing(true);
    setError(null);
  }

  function cancelEditing() {
    setIsEditing(false);
    setError(null);
    // reset form back to current u values
    setForm({
      firstName: u.firstName || '',
      lastName: u.lastName || '',
      email: u.email || '',
      phone: u.phone || '',
    });
  }

  async function handleSave(e) {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/users/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update profile');
      }

      const data = await res.json(); //{ user: {...} }

      // update main userData
      setUserData(data.user || {});
      setIsEditing(false);

      callNotificationBarWithValues("Good job", "User has been updated suucessfully", "okay");
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message);
      callNotificationBarWithValues("Network error", "Failed to update profile", "bad");
    } finally {
      setIsSaving(false);
    }
  }

  // NEW: handle Change Password submit
  async function handleChangePasswordSubmit(newPassword) {
    console.log("New password entered:", newPassword);

  }

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
              <img
                className={styles.avatar}
                src={u.avatarUrl}
                alt={`${u.firstName} ${u.lastName}`}
              />
            ) : (
              <div className={styles.avatarFallback}>
                {`${u.firstName?.[0] || 'A'}${u.lastName?.[0] || 'U'}`}
              </div>
            )}
          </div>

          <div className={styles.nameBlock}>
            <h2 className={styles.name}>
              {u.firstName} {u.lastName}
            </h2>
            <span className={styles.roleBadge}>{u.role || 'User'}</span>
            <span className={styles.metaText}>
              Joined {u.joined || '—'}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={startEditing}
            >
              Edit Profile
            </button>
            <button
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={() => setShowChangePassword(true)}
            >
              Change Password
            </button>
            <button
              className={`${styles.btn} ${styles.btnDanger}`}
              onClick={onLogout}
            >
              Log out
            </button>
          </div>

          {u.role === "Student" && (
            <div className={styles.quickStats}>
              <div className={styles.statBox}>
                <div className={styles.statValue}>{term}{year}</div>
                <div className={styles.statLabel}>Current Term</div>
              </div>

              <div className={styles.statBox}>
                <div className={styles.statValue}>Software Dev</div>
                <div className={styles.statLabel}>Program</div>
              </div>

              <div className={styles.statBox}>
                <div className={styles.statValue}>Year 1</div>
                <div className={styles.statLabel}>Level</div>
              </div>
            </div>
          )}

        </aside>

        {/* Right column — details */}
        <section className={styles.rightCol}>
          <form className={styles.card} onSubmit={handleSave}>
            <h3 className={styles.cardTitle}>Personal Information</h3>

            {error && <p className={styles.errorText}>{error}</p>}

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.infoItem}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.infoItem}>
                <label>Username</label>
                <span>{u.username || '—'}</span> {/* read-only */}
              </div>

              <div className={styles.infoItem}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.infoItem}>
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className={styles.infoItem}>
                <label>Department</label>
                <span>{u.department || '—'}</span>
              </div>

              <div className={styles.infoItem}>
                <label>Role</label>
                <span>{u.role || '—'}</span>
              </div>

              <div className={styles.infoItem}>
                <label>ID</label>
                <span>{u.id || '—'}</span>
              </div>

              <div className={styles.infoItem}>
                <label>Joined</label>
                <span>{u.joined || '—'}</span>
              </div>
            </div>

            {/* Buttons for edit / save / cancel */}
            <div className={styles.formActions}>
              {isEditing && (
                <>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={cancelEditing}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </form>

          {u.role === "ADMIN" && (
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
                  Reset password for another user
                  <time> Oct 27, 11:03</time>
                </li>
              </ul>
            </div>
          )}
        </section>
      </section>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onSubmit={handleChangePasswordSubmit}
      />
    </main>
  );
};

export default ProfileView;