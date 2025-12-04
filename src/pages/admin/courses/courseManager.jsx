/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import styles from './courseManager.module.css';

// replace with your real data later
import { courses as mockCourses, programs as mockPrograms } from '../../../data/mockData.js';

const EMPTY = {
  id: '',
  code: '',
  title: '',
  program: '',
  credits: 3,
  term: 'Fall',
  capacity: 30,
  startDate: '',
  endDate: '',
  status: 'Active',
};

const TERMS = ['Winter', 'Spring', 'Summer', 'Fall'];
const STATUSES = ['Active', 'Inactive', 'Archived'];

export default function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('code');
  const [sortDir, setSortDir] = useState('asc');

  const [mode, setMode] = useState('create'); // create | edit
  const [form, setForm] = useState(EMPTY);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [errors, setErrors] = useState({});

  // seed data
  useEffect(() => {
    setCourses(Array.isArray(mockCourses) ? mockCourses : []);
    setPrograms(Array.isArray(mockPrograms) ? mockPrograms : []);
  }, []);

  useEffect(() => {
    // default new form
    newCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newCourse = () => {
    setMode('create');
    setSelectedId(null);
    setForm({
      ...EMPTY,
      id: crypto.randomUUID?.() || String(Date.now()),
    });
    setErrors({});
  };

  const startEdit = (row) => {
    setMode('edit');
    setSelectedId(row.id);
    setForm({ ...row });
    setErrors({});
  };

  const askDelete = (row) => {
    setSelectedId(row.id);
    setConfirmingDelete(true);
  };

  const validate = () => {
    const e = {};
    if (!form.code.trim()) e.code = 'Course code is required';
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.program.trim()) e.program = 'Program is required';
    if (!form.startDate) e.startDate = 'Start date is required';
    if (!form.endDate) e.endDate = 'End date is required';
    if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
      e.endDate = 'End date must be after start';
    }
    if (form.credits < 0) e.credits = 'Credits cannot be negative';
    if (form.capacity < 0) e.capacity = 'Capacity cannot be negative';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    if (mode === 'create') {
      setCourses((prev) => [form, ...prev]);
      newCourse();
    } else {
      setCourses((prev) => prev.map((c) => (c.id === form.id ? form : c)));
    }
  };

  const doDelete = () => {
    setCourses((prev) => prev.filter((c) => c.id !== selectedId));
    setConfirmingDelete(false);
    if (mode === 'edit' && form.id === selectedId) newCourse();
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list = [...courses];
    if (q) {
      list = list.filter((c) =>
        [
          c.code,
          c.title,
          c.program,
          c.term,
          String(c.credits),
          String(c.capacity),
          c.status,
        ]
          .filter(Boolean)
          .some((v) => v.toString().toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => {
      const A = (a[sortKey] ?? '').toString().toLowerCase();
      const B = (b[sortKey] ?? '').toString().toLowerCase();
      if (A < B) return sortDir === 'asc' ? -1 : 1;
      if (A > B) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [courses, query, sortKey, sortDir]);

  const sortBy = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className="purple-orange-gradient-text bg-clip-text">Courses</h1>
        <p className={styles.subtitle}>Create, edit, and manage course offerings</p>
      </header>

      <section className={styles.grid}>
        {/* LEFT: FORM */}
        <section className={`${styles.card} ${styles.formCard}`}>
          <div className={styles.formHeader}>
            <h3>{mode === 'create' ? 'Create Course' : 'Edit Course'}</h3>
            {mode === 'edit' && (
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={newCourse}>
                + New
              </button>
            )}
          </div>

          <form className={styles.form} onSubmit={submit}>
            <div className={styles.row2}>
              <div className={styles.group}>
                <label htmlFor="code">Course Code</label>
                <input
                  id="code"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="e.g. CPSC-101"
                />
                {errors.code && <small className={styles.error}>{errors.code}</small>}
              </div>
              <div className={styles.group}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Introduction to Programming"
                />
                {errors.title && <small className={styles.error}>{errors.title}</small>}
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.group}>
                <label htmlFor="program">Program</label>
                <select
                  id="program"
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                >
                  <option value="">Select program</option>
                  {programs.map((p) => {
                    const name = p.name || p.program || '';
                    const key = p.id || name;
                    return (
                      <option key={key} value={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                {errors.program && <small className={styles.error}>{errors.program}</small>}
              </div>
              <div className={styles.group}>
                <label htmlFor="term">Term</label>
                <select
                  id="term"
                  value={form.term}
                  onChange={(e) => setForm({ ...form, term: e.target.value })}
                >
                  {TERMS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.row3}>
              <div className={styles.group}>
                <label htmlFor="credits">Credits</label>
                <input
                  id="credits"
                  type="number"
                  min={0}
                  value={form.credits}
                  onChange={(e) => setForm({ ...form, credits: Number(e.target.value) })}
                />
                {errors.credits && <small className={styles.error}>{errors.credits}</small>}
              </div>
              <div className={styles.group}>
                <label htmlFor="capacity">Capacity</label>
                <input
                  id="capacity"
                  type="number"
                  min={0}
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                />
                {errors.capacity && <small className={styles.error}>{errors.capacity}</small>}
              </div>
              <div className={styles.group}>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.group}>
                <label htmlFor="startDate">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
                {errors.startDate && <small className={styles.error}>{errors.startDate}</small>}
              </div>
              <div className={styles.group}>
                <label htmlFor="endDate">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
                {errors.endDate && <small className={styles.error}>{errors.endDate}</small>}
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                {mode === 'create' ? 'Create Course' : 'Save Changes'}
              </button>
              {mode === 'edit' && (
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => setConfirmingDelete(true)}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </section>

        {/* RIGHT: TOOLBAR + TABLE */}
        <section className={styles.rightCol}>
          <div className={`${styles.card} ${styles.toolbar}`}>
            <input
              className={styles.search}
              placeholder="Search by code, title, program, term…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className={styles.sortWrap}>
              <label>Sort by</label>
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                <option value="code">Code</option>
                <option value="title">Title</option>
                <option value="program">Program</option>
                <option value="term">Term</option>
                <option value="status">Status</option>
              </select>
              <button
                className={styles.sortBtn}
                onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
                title={`Direction: ${sortDir}`}
              >
                {sortDir === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th onClick={() => sortBy('code')}>Code</th>
                    <th onClick={() => sortBy('title')}>Title</th>
                    <th onClick={() => sortBy('program')}>Program</th>
                    <th onClick={() => sortBy('term')}>Term</th>
                    <th onClick={() => sortBy('credits')}>Credits</th>
                    <th onClick={() => sortBy('capacity')}>Capacity</th>
                    <th onClick={() => sortBy('status')}>Status</th>
                    <th>Dates</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className={selectedId === c.id ? styles.selectedRow : ''}>
                      <td>{c.code}</td>
                      <td>{c.title}</td>
                      <td>{c.program}</td>
                      <td>{c.term}</td>
                      <td>{c.credits}</td>
                      <td>{c.capacity}</td>
                      <td>
                        <span className={`${styles.badge} ${styles['badge' + c.status]}`}>{c.status}</span>
                      </td>
                      <td className={styles.datesCell}>
                        <span>{c.startDate}</span>
                        <span>–</span>
                        <span>{c.endDate}</span>
                      </td>
                      <td className={styles.actionsCell}>
                        <button className={`${styles.smallBtn} ${styles.smallPrimary}`} onClick={() => startEdit(c)}>
                          Edit
                        </button>
                        <button className={`${styles.smallBtn} ${styles.smallGhost}`} onClick={() => askDelete(c)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="9" className={styles.emptyCell}>
                        No courses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </section>

      {/* DELETE MODAL */}
      {confirmingDelete && (
        <div className={styles.modalBackdrop} onClick={() => setConfirmingDelete(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Delete course?</h3>
            <p>This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setConfirmingDelete(false)}>
                Cancel
              </button>
              <button className={`${styles.btn} ${styles.btnDanger}`} onClick={doDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
