import React, {useEffect, useState} from 'react';
import styles from './Users.module.css'
import { Button } from 'reactstrap';
const Users = props => {
    const [tableRows, setTableRows] = useState();
    useEffect(() => {
        setTableRows(props.users.map((user, index) => {
            return(
                <tr key ={index}>
                    <td className={styles.Td}>{user.firstName}</td>
                    <td className={styles.Td}>{user.lastName}</td>
                    <td className={styles.Td}>{user.school}</td>
                    <td className={styles.Td}>
                    <Button className="btn-icon btn-2" color="primary" type="button" onClick={() => props.delete(user)}>
                        <span className="btn-inner--icon">
                        <i className="fa fa-trash-o fa-lg"></i>
                        </span>
                    </Button>
                    </td>
                    <td className={styles.Td}>
                    <Button className="btn-icon btn-2" color="primary" onClick={() => props.edit(true, user)} type="button">
                        <span className="btn-inner--icon">
                        <i className="fa fa-edit fa-lg"></i>
                        </span>
                    </Button>
                    </td>
 
                </tr>
            )
        }
    )
        )
    }, [props.users]);

    
    return(
        
        <div className={styles.Table}>
            <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => props.showAddUser(true)}>
                <span className="btn-inner--icon">
                <i className="fa fa-user-plus fa-lg"></i>
                </span>
                <span className="btn-inner--text">Add User</span>
            </Button>
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