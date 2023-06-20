import React, { useRef, useContext } from 'react';
import { login } from '../services/AuthAPI';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default () => {
    const navigate = useNavigate(),
        { setToken } = useContext(AppContext),
        userRef = useRef("sapiensUser"),
        passRef = useRef("sapiensPass");

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = userRef.current.value,
            password = passRef.current.value;

        // perform login
        login({ username, password })
            .then((res) => {
                // dispatch token to store on successful login
                setToken({ token: res.data.token });
                navigate('/');
            })
            .catch(() => { alert("Username or password is incorrect!") });
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <span>Default user is "sapiensUser"</span>
                <span>Default password is "sapiensPass"</span>

                <input type="text" className="form-input" placeholder='Enter username'
                    ref={userRef} defaultValue={userRef.current} />
                <input type="password" className="form-input" placeholder='Enter password'
                    ref={passRef} defaultValue={passRef.current} />
                    
                <button type="submit" className="form-button">Login</button>
            </form>
        </div>
    )
}