import React, { useRef, useContext } from 'react';
import { AppContext } from "../contexts/AppContext";
import { updateUserPreferences } from '../services/UserAPI';
import { useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const { store, setTheme } = useContext(AppContext);

    const handleThemeChange = (e) => {
        const theme = e.target.value,
            { username } = store;

        // update user preference theme
        updateUserPreferences({ username, theme })
            .then(res => {
                // check if login is required on token expiry
                if (res.loginRequired)
                    navigate("/login")

                // otherwise set the theme
                else
                    setTheme({ theme });
            })
            .catch((e) => {
                alert("Something went wrong while setting the theme!");
            });
    }

    return (
        <div className="home-container ">
            <nav>
                <select value={store.theme || "light"} onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </nav>
        </div>
    )
}