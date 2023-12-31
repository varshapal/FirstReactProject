import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUser.module.css';


const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non empty values).'
            })
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (> 0).'
            })
            return;
        }

        //console.log(enteredUsername, enteredAge);
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    };
    
    const userNameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler  = () => {
        setError(null);
    };

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlForfor="username">Username</label>
                <input 
                    id='username' 
                    type='text' 
                    value={enteredUsername} 
                    onChange={userNameChangeHandler}
                />
                <label htmlForfor="age">Age (Years)</label>
                <input 
                    id='age' 
                    type='number' 
                    value={enteredAge} 
                    onChange={ageChangeHandler}
                />
                <Button type='submit'>Add User</Button>
            </form>
            </Card>
        </div>
        
    );
};


export default AddUser;
