import React, {useState, useEffect} from 'react';
import SideDrawer from './containers/SideDrawer/SideDrawer'
import Users from './containers/Users/Users'
import './App.css';

const App = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState(null);
  const toggleShowSideDrawer = (sideDrawerState) => {
    setEditUserInfo(null);
    setShowSideDrawer(sideDrawerState);
  }
  const [users, setUsers]  = useState([]);
  const addUser = (user) => {
    setUsers(prevUsers => [...prevUsers, user]);
  }
  const deleteUser= user => {
    let confirmDelete = window.confirm("are u sure to delete?");
    if(confirmDelete){
      setUsers(prevUser => {
        return prevUser.filter(u => u !== user)
      })
    }
    else{
      return;
    }
  }
  const toggleEditSideDrawerHandler= (state, user) => {
    setShowSideDrawer(state);
    setEditUserInfo(user);
  }
  const editUser= (user) => {
    // const editObject = users.filter(u => u === editUserInfo);
    const editIndex = users.findIndex(user => {
      return user === editUserInfo;
    })
    // const editIndex=_.findIndex(users, {prop2: 'yutu'})
    //  users.findIndex(editObject);
    const updatedUsers = [...users];
    updatedUsers[editIndex] = user;
    setUsers(updatedUsers);

  }
  return (
    <div className="App">
      <SideDrawer addUsers={(user) => addUser(user)} open={showSideDrawer}
       toggleShow={(sideDrawerState) => toggleShowSideDrawer(sideDrawerState)}
       editUserInfo={editUserInfo}
       editUsers={(user) => editUser(user)}
        />
      <Users 
        users={users} 
        delete={(user) => deleteUser(user)} 
        edit={(sideDrawerState, user) => toggleEditSideDrawerHandler(sideDrawerState, user)} 
        showAddUser={(sideDrawerState) =>  toggleShowSideDrawer(sideDrawerState)}/>
    </div>
  );
}

export default App;
