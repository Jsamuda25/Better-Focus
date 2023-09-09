import React from "react";
import RegisterForm from "./registerForm";
import '../../styles/verifyPage/index.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import CodeComponent from './codeComponent.jsx'

const getSecret = () => {
    const location = useLocation();
    const secret = location.state.secret;
    return secret;
}

const getUsername = () => {
    const location = useLocation();
    const username = location.state.user.username;
    return username;
}

const getQrCode = () => {
    const location = useLocation();
    const qrCode = location.state.qrcode;
    return qrCode;
}

const getUser = () => {
    const location = useLocation();
    const user = location.state.user;
    return user;
}


function VerifyRegister(){
    const secret = getSecret();
    const username = getUsername();
    const user = getUser();
    const qrCode = getQrCode();
    console.log(secret);
   
    return(
        
        <div className="verify-container"> 
            <h3>2FA: Please insert token to verify indentity! </h3>
            <p>Input code or scan qr code in an authenticator app to retrive token. </p>
            <CodeComponent code={secret} qr={qrCode}/>
            <RegisterForm username={username} user={user}/>
        </div>
    )
}

export default VerifyRegister;