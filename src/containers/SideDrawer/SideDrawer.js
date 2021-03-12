import React , {useState, useEffect }from 'react';
import styles from './SideDrawer.module.css'
import { Button, Input, FormFeedback } from 'reactstrap';

const SideDrawer = props => {
    const initialFormInputs= {
        firstName: '',
        lastName: '',
        school: ''
    };
    const initialError = {
        firstName: {
            touched: false,
            valid: false,
            errorMessage: ""
        },
        lastName: {
            touched: false,
            valid: false,
            errorMessage: ""
        },
        school: {
            touched: false,
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
        updatedErrorElement.touched= true;
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
    const exitSideDrawer = () => {
        props.toggleShow(false);
    }
    

    return(
        <div className={attachedClasses.join(' ')} >
            <Button className="btn-icon btn-2 pull-right" color="danger" type="button" onClick={exitSideDrawer}>
                <span className="btn-inner--icon">
                    <i className="fa fa-times-circle fa-lg"></i>
                </span>
            </Button>
            <Input invalid={!error.firstName.valid && error.firstName.touched} type="text" name="firstName" placeholder="First Name"  value={formInputs.firstName} onChange={(event) => inputChangedHandler(event, "firstName")}  />
            <FormFeedback>{error.firstName.errorMessage}</FormFeedback>

            {/* <span>{error.firstName.errorMessage}</span> */}
            <br />
            <Input invalid={!error.lastName.valid && error.lastName.touched} type="text" name="lastName" placeholder="Last Name"  value={formInputs.lastName} onChange={(event) => inputChangedHandler(event, "lastName")}  />
            <FormFeedback>{error.lastName.errorMessage}</FormFeedback>
            <br />
            <Input invalid={!error.school.valid && error.school.touched} type="text" name="school" placeholder="School"  value={formInputs.school} onChange={(event) => inputChangedHandler(event, "school")}  />
            <FormFeedback>{error.school.errorMessage}</FormFeedback>
            <br />
            <Button color="success" disabled={!formIsValid} onClick={addUser}>{props.editUserInfo ? "EDIT" : "ADD"}</Button>
        </div>
    )

}

export default SideDrawer;