import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import '../../styles/loginPage/form.css'
import axios from 'axios';

function Form(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const handleSubmit = async (e)=> {
        e.preventDefault();
        const user = { username, password };

        const loginRes = await fetch(
            "http://localhost:3000/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            }
        );
        const loginData = await loginRes.json();
        console.log(loginData.user);

        if(loginData.user){
            // navigate('/home', {state: {user: loginData.user}});
            navigate('/verifyLogin', {state: {user: loginData.user }});
            
        }
        else{
            alert("Invalid username or password!");
        }
                
    }

    return(
        <>
            <div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder= "Username"
                        required         
                        onChange = {changeUsername}   
                    />
                    <input

                        type="password"
                        placeholder= "Password"
                        required         
                        onChange = {changePassword}   
                    />
                    <button id='sign-in'>Sign in!</button>
                    <Link id= "register-link" to="/register">Don't have an account? Click to register!</Link>
                </form>
            </div>
        </>
    )
}

export default Form;