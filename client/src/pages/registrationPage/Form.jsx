import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/registrationPage/form.css";


function Form(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }   

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit  = async(e) => {
        e.preventDefault();
        const user = { username, password, email };

        const registerRes = await fetch(
            "http://localhost:3000/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            }
        );
        const registerData = await registerRes.json();
        console.log(registerData.user);

        if(registerData.user){
            //navigate('/home', {state: {user: registerData.savedUser}});
            navigate('/verifyRegister', {state: {user: registerData.user, qrcode: registerData.user.secret.qrcode, secret: registerData.user.secret.base32}});
        }
        else{
            alert("Username already exists!");
        }

    }


    return(
        <div>
            <form className="registration-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    required
                    onChange={changeUsername}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={changePassword}
                />
                <button id='sign-up'>Sign up!</button>
            </form>
        </div>
    )
}

export default Form;