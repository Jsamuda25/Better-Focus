import React from 'react';
import Form from './Form.jsx';  
import '../../styles/registrationPage/index.css';

function Registration(){
    return(
        <div className='registration-container'>
            <img src="../../../icons/notepad.svg" id="notepad"></img>
            <h1>StudyPal</h1>
            <Form/>
        </div>  

    )
}
export default Registration;