import React , {useState, useEffect }from 'react';
import styles from './SideDrawer.module.css'

const SideDrawer = props => {
    const initialFormInputs= {
        firstName: '',
        lastName: '',
        school: ''
    };
    const initialError = {
        firstName: {
            valid: false,
            errorMessage: ""
        },
        lastName: {
            valid: false,
            errorMessage: ""
        },
        school: {
            valid: false,
            errorMessage: ""
        }
    }
    const { editUserInfo } = props;
    const [formInputs, setFormInputs] = useState(initialFormInputs);
    const [formIsValid, setFormIsValid] = useState(false);
    const [error, setError] = useState(initialError);
    useEffect(() => {
        for(let key in error){
            if(!error[key].valid){
                setFormIsValid(false);
                return;
            }
            setFormIsValid(true);
        }
    }, [error, setFormIsValid]) 
    useEffect(() => {
        if(editUserInfo !== null){
            setFormInputs(editUserInfo);
            setFormIsValid(true);
            setError({
                firstName: {
                    valid: true,
                    errorMessage: ""
                },
                lastName: {
                    valid: true,
                    errorMessage: ""
                },
                school: {
                    valid: true,
                    errorMessage: ""
                }
            })
        }
    },[editUserInfo, setFormInputs])
    

    
    let attachedClasses= [styles.SideDrawer, styles.Close];
    if(props.open){
        attachedClasses[1]= [styles.Open];
    }
    const inputChangedHandler = (event, formInput) => {
        setFormInputs({...formInputs, [formInput]: event.target.value});
        let updatedError = {
            ...error
        }
        let updatedErrorElement = {
            ...error[formInput]
        }

        if(event.target.value === ''){
            
            updatedErrorElement.valid = false;
            updatedErrorElement.errorMessage = "Required"
        }
        else{  
            updatedErrorElement.valid = true;
            updatedErrorElement.errorMessage = ''
        }
        updatedError[formInput] = updatedErrorElement;
        setError(updatedError);
        }

    const addUser = () => {
        if(props.editUserInfo !== null){
            props.editUsers(formInputs);
            alert("Edit Successful");
            setFormInputs(initialFormInputs);
            setFormIsValid(false);
            setError(initialError);
            props.toggleShow(false);
            return;
        }
        props.addUsers(formInputs);
        alert("User Added Successfully");
        setFormInputs(initialFormInputs);
        setFormIsValid(false);
        setError(initialError);
        props.toggleShow(false)
    }
    

    return(
        <div className={attachedClasses.join(' ')} >
            <input placeholder="First Name Here" name="firstName" value={formInputs.firstName} onChange={(event) => inputChangedHandler(event, "firstName")} /><br />
            <span>{error.firstName.errorMessage}</span>
            <input placeholder="Last Name Here" name="lastName" value={formInputs.lastName} onChange={(event) => inputChangedHandler(event, "lastName")} /><br />
            <span>{error.lastName.errorMessage}</span>
            <input placeholder="School Here" name="school" value={formInputs.school} onChange={(event) => inputChangedHandler(event, "school")} /><br />
            <span>{error.school.errorMessage}</span>
            <button disabled={!formIsValid} onClick={addUser}>{props.editUserInfo ? "EDIT" : "ADD"}</button>
        </div>
    )

}

export default SideDrawer;