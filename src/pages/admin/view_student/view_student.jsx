import styles from '../../student/registration/student-reg.module.css';
import Table from '../../../components/table/table';
import { GrFormSearch } from "react-icons/gr";



function AdminViewStudent(props) {
    const tableSettings = [
        {
            "column": "Name",
            "size": 0.4
        },
        {
            "column": "ID",
            "size": 0.1
        },
        {
            "column": "Program",
            "size": 0.3
        },
        {
            "column": "Term",
            "size": 0.2
        },
    ]

    const tableData = [
        {
            "Name": "Alice Johnson",
            "ID": 1001,
            "Program": "Computer Science",
            "Term": "Fall 2025"
        },
        {
            "Name": "Brian Smith",
            "ID": 1002,
            "Program": "Software Engineering",
            "Term": "Winter 2025"
        },
        {
            "Name": "Catherine Lee",
            "ID": 1003,
            "Program": "Information Technology",
            "Term": "Spring 2025"
        },
        {
            "Name": "David Chen",
            "ID": 1004,
            "Program": "Cybersecurity",
            "Term": "Fall 2025"
        },
        {
            "Name": "Emma Rodriguez",
            "ID": 1005,
            "Program": "Data Science",
            "Term": "Summer 2025"
        },
        {
            "Name": "Felix Ahmed",
            "ID": 1006,
            "Program": "Network Engineering",
            "Term": "Winter 2025"
        },
        {
            "Name": "Grace Williams",
            "ID": 1007,
            "Program": "Software Development",
            "Term": "Fall 2025"
        },
        {
            "Name": "Henry Kim",
            "ID": 1008,
            "Program": "Artificial Intelligence",
            "Term": "Spring 2025"
        },
        {
            "Name": "Isabella Davis",
            "ID": 1009,
            "Program": "Cloud Computing",
            "Term": "Summer 2025"
        },
        {
            "Name": "Jack Thompson",
            "ID": 1010,
            "Program": "Database Systems",
            "Term": "Winter 2025"
        },
        {
            "Name": "Karen White",
            "ID": 1011,
            "Program": "Web Development",
            "Term": "Fall 2025"
        },
        {
            "Name": "Liam Brown",
            "ID": 1012,
            "Program": "Mobile Application Design",
            "Term": "Spring 2025"
        },
        {
            "Name": "Mia Patel",
            "ID": 1013,
            "Program": "Machine Learning",
            "Term": "Summer 2025"
        },
        {
            "Name": "Noah Wilson",
            "ID": 1014,
            "Program": "Game Development",
            "Term": "Fall 2025"
        },
        {
            "Name": "Olivia Green",
            "ID": 1015,
            "Program": "Computer Systems Technology",
            "Term": "Winter 2025"
        }
    ]


    return <div className={`${styles.registration} container`}>
        <div className={`${styles.searchBarTop} ${styles.topHeader} flex-row-space-between`}>
            <div className={`${styles.searchBarHolder} flex-col-gap-12`}>
                <GrFormSearch />

                <input type="search" name="searchInput" id="searchInput" className={`${styles.searchInput}`} placeholder='Search by course name or code' />
            </div>

            <div className={`${styles.sortBarHolder} flex-row-space-between`}>
                <span>Input Term :</span>

                <select name="termSort" id="termSort" className={`${styles.sortTerm}`}>
                    <option value="0">WINT2025</option>
                </select>
            </div>
        </div>

        <Table tableSettings={tableSettings} data={tableData}></Table>
    </div>
}

export default AdminViewStudent;