import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';

export default () => {
    return (
        <Layout>
            <Routes>
                <Route exact path='/' Component={Home} />
                <Route exact path='/login' Component={Login} />
                <Route path='*' element={<div>404: Page not found!</div>} />
            </Routes >
        </Layout>
    );
};
