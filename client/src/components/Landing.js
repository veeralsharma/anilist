import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

function Landing() { 
     const history = useHistory();

    useEffect(() => {
       if(localStorage.getItem('usertoken')){
           history.push('/home')
       }
    },[])

    return (
        <div className="landing">
            <div className="landing-auth-box">
                <h2>Already a User ?</h2>
                <Link to="/login">
                    Login
                </Link>
            </div>
            <div className="landing-auth-box">
            <h2>New User ?</h2>
                <Link to="/register">
                    Signup
                </Link>
            </div>
        </div>
    )
}

export default Landing
