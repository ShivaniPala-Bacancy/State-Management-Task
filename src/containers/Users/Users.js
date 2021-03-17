import React, {useEffect, useState} from 'react';
import styles from './Users.module.css'
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faUserPlus } from '@fortawesome/free-solid-svg-icons'


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
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    </td>
                    <td className={styles.Td}>
                    <Button className="btn-icon btn-2" color="primary" onClick={() => props.edit(true, user)} type="button">
                        <FontAwesomeIcon icon={faPen} />
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
                <FontAwesomeIcon icon={faUserPlus} />
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