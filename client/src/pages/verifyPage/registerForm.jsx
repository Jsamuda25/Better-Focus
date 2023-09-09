import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";


// REGISTRATION IS DONE

function RegisterForm({username, user}){
    const navigate = useNavigate();
    const [token, setToken] = useState("");
  
    const changeToken = (e) => {
        setToken(e.target.value);
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
  
        const verifyRes = await fetch(
            "http://localhost:3000/auth/verify",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, token}),

            }
        );
        const verifyData = await verifyRes.json();
        console.log(verifyData);

        if(verifyData.verified === true){
            alert("Successfully verified!");
            navigate('/home', {state: {user: user}});
          
        }
        else{
            alert("Invalid token!");
        }
    }

    return(
        <div>
            <form className="token-submit" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter token"
                    required
                    onChange={changeToken}
                />
                <button type="submit" id="btn">Submit</button>
            </form>
        </div>
    )
}

export default RegisterForm;