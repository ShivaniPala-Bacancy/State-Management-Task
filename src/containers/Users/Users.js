import React, {useEffect, useState} from 'react';
import styles from './Users.module.css'

const Users = props => {
    const [tableRows, setTableRows] = useState();
    useEffect(() => {
        setTableRows(props.users.map((user, index) => {
            return(
                <tr key ={index}>
                    <td className={styles.Td}>{user.firstName}</td>
                    <td className={styles.Td}>{user.lastName}</td>
                    <td className={styles.Td}>{user.school}</td>
                    <td className={styles.Td}><button onClick={() => props.delete(user)}>DELETE</button></td>
                    <td className={styles.Td}><button onClick={() => props.edit(true, user)}>EDIT</button></td>
                </tr>
            )
        }
    )
        )
    }, [props.users]);

    
    return(
        
        <div className={styles.Table}>
            <button onClick={() => props.showAddUser(true)}>Add User</button>
            <table className={styles.TableUsers}>
                <thead className={styles.Thead}>
                    <tr className={styles.Tr}>
                        <td className={styles.Td}>First Name</td>
                        <td className={styles.Td}>Last Name</td>
                        <td className={styles.Td}>School Name</td>
                        
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
    )
}

export default Users;