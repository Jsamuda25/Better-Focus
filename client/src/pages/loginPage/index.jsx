import React from 'react'
import Form from './Form.jsx'
import '../../styles/loginPage/index.css'

function LoginPage(){
    return(
        <div className="login-page-container">
            <img src="../../../icons/notepad.svg" id="notepad"></img>
            <h1>StudyPal</h1>
            <Form/>
        </div>
    )
}

export default LoginPage