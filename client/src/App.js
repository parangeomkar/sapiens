import React from "react";
import { BrowserRouter } from "react-router-dom";

import ContextProvider from "./contexts/AppContext";
import Routes from "./Routes";

const App = () => {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </ContextProvider>
    );
}

export default App;