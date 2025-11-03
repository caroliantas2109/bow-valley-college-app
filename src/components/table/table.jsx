import styles from './table.module.css';

function Table(props) {
    const data = props.data;
    const tableSettings = props.tableSettings;

    return <div>
        <table className={styles.table}>
            <thead>
                <tr>
                    {
                        tableSettings.map(setting => {
                            return <th key={setting.column} style={{ width: `${setting.size * 100}%` }}>{setting.column}</th>
                        })
                    }
                </tr>
            </thead>

            <tbody>
                {
                    data.map(d => {
                        return <tr>
                            {
                                Object.entries(d).map(([key, value]) => {
                                    return <td key={`${key}-${value}`}>
                                        {value}
                                    </td>
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}

export default Table;