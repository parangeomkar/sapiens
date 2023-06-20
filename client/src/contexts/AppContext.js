import React, { useState, createContext, useEffect } from "react";
import JWTParser from "../utils/JWTParser";

export const AppContext = createContext({});

export default ({ children }) => {
    // initialize store with data in sessionStorage
    const [store, setStore] = useState({
        token: sessionStorage.getItem("token"),
        theme: sessionStorage.getItem("theme"),
        username: sessionStorage.getItem("username"),
        exp: sessionStorage.getItem("exp")
    });

    // update application theme
    const setTheme = ({ theme }) => {
        setStore({ ...store, theme });
        sessionStorage.setItem("theme", theme);
    };

    const setToken = ({ token }) => {
        // parse JWT
        const { username, theme, exp } = JWTParser(token);

        // store the received token in sessionStorage
        // used only when page is refreshed
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("theme", theme);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("exp", exp);

        // save the data in context store
        setStore({ theme, token, exp, username });
    };

    return (
        <AppContext.Provider value={{ store, setTheme, setToken }}>
            {children}
        </AppContext.Provider>
    );

}
