import styles from '../student/registration/student-reg.module.css';
import Table from '../../components/table/table';
import { GrFormSearch } from "react-icons/gr";

function AdminViewCourses(props) {
  const tableSettings = [
    { column: "Course",  size: 0.45 },
    { column: "Code",    size: 0.2  },
    { column: "Credits", size: 0.15 },
    { column: "Delivery",size: 0.2  },
  ];

  const tableData = [
    { Course: "Relational Databases",           Code: "DATA2201", Credits: 3, Delivery: "Online - Synchronous" },
    { Course: "Software Development I",         Code: "SDEV1101", Credits: 3, Delivery: "On Campus" },
    { Course: "Data Structures & Algorithms",   Code: "COMP2302", Credits: 4, Delivery: "Hybrid" },
    { Course: "Web Development Fundamentals",   Code: "WEBD1200", Credits: 3, Delivery: "Online - Asynchronous" },
    { Course: "Cloud Computing Essentials",     Code: "CLOUD2101",Credits: 3, Delivery: "On Campus" },
    { Course: "Operating Systems",              Code: "COMP2403", Credits: 4, Delivery: "Hybrid" },
    { Course: "Networking Basics",              Code: "NETW1301", Credits: 3, Delivery: "On Campus" },
    { Course: "Cybersecurity Foundations",      Code: "CYBR2100", Credits: 3, Delivery: "Online - Synchronous" },
    { Course: "Human–Computer Interaction",     Code: "HCI2205",  Credits: 3, Delivery: "Hybrid" },
    { Course: "Mobile App Development",         Code: "MOBI2301", Credits: 4, Delivery: "Online - Asynchronous" },
    { Course: "Machine Learning Intro",         Code: "ML3100",   Credits: 3, Delivery: "Hybrid" },
    { Course: "Database Systems II",            Code: "DATA3202", Credits: 3, Delivery: "On Campus" },
    { Course: "Systems Analysis & Design",      Code: "SYST2200", Credits: 3, Delivery: "Online - Synchronous" },
    { Course: "Project Management for IT",      Code: "PMIT2101", Credits: 3, Delivery: "Hybrid" },
    { Course: "Computer Architecture",          Code: "COMP2206", Credits: 3, Delivery: "On Campus" },
  ];

  return (
    <div className={`${styles.registration} container`}>
      <div className={`${styles.searchBarTop} ${styles.topHeader} flex-row-space-between`}>
        <div className={`${styles.searchBarHolder} flex-col-gap-12`}>
          <GrFormSearch />
          <input
            type="search"
            name="searchInput"
            id="searchInput"
            className={styles.searchInput}
            placeholder="Search by course name or code"
          />
        </div>

        <div className={`${styles.sortBarHolder} flex-row-space-between`}>
          <span>Term :</span>
          <select name="termSort" id="termSort" className={styles.sortTerm}>
            <option value="WINT2025">WINT2025</option>
            <option value="FALL2025">FALL2025</option>
            <option value="SUMR2025">SUMR2025</option>
          </select>
        </div>
      </div>

      <Table tableSettings={tableSettings} data={tableData} />
    </div>
  );
}

export default AdminViewCourses;
