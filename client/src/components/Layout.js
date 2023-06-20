import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../contexts/AppContext";
import { getUserPreferences } from '../services/UserAPI';
import { useNavigate } from "react-router-dom";

export default ({ children }) => {
    const navigate = useNavigate(),
        { store, setTheme } = useContext(AppContext);

    useEffect(() => {
        const { exp, username } = store;

        // go to login page if username doesn't exist or token is expired
        if (!username || !exp || Date.now() >= exp * 1000) {
            navigate("/login")

        } else {
            // fetch user preferences when app loads
            getUserPreferences(username)
                .then((res) => {
                    // go to login page if token is expired
                    if (res.loginRequired)
                        navigate("/login")

                    // else set the theme received from api
                    setTheme({ theme: res.data.theme });
                })
                .catch((err) => {
                    alert("Something went wrong!")
                })
        }
    }, [])

    return (
        <div className={"app-container " + store.theme}>
            {children}
        </div>
    )
}