import React from "react";
import LoginForm from "./loginForm";
import '../../styles/verifyPage/index.css';
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';

const getUsername = () => {
    const location = useLocation();
    const username = location.state.user.username;
    return username;
}

const getUser = () => {
    const location = useLocation();
    const user = location.state.user;
    return user;
}


function VerifyLogin(){
    const username = getUsername();
    const user = getUser();
        
    return(
        <div className="verify-container"> 
            <h3>2FA: Please insert token to verify indentity!</h3>
            <p>Hey {username}, please verify your indentify by inputting your temporary token.</p>
            <LoginForm username={username} user={user} />
        </div>
    )
}

export default VerifyLogin;