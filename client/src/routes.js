import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthPage } from './Pages/AuthPage/AuthPage';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { MainPage } from './Pages/MainPage/MainPage';
import { About } from './Pages/About/About';
import { RiddlesPage } from './Pages/RiddlesPage/RiddlesPage';
import { Dashboard } from './Pages/Dashboard/Dashboard';

export function useRoutes() {
    return (
        <Switch>
            <Route path="/" exact>
                <MainPage/>
            </Route>
            <Route path="/auth" exact>
                <AuthPage/>
            </Route>
            <Route path="/login" exact>
                <LoginPage/>
            </Route>
            <Route path="/about" exact>
                <About/>
            </Route>
            <Route path="/easy" exact>
                <RiddlesPage/>
            </Route>
            <Route path="/medium" exact>
                <RiddlesPage/>
            </Route>
            <Route path="/hard" exact>
                <RiddlesPage/>
            </Route>
            <Route>
                <Dashboard path="/dashboard" exact/>
            </Route>
            <Redirect path="/"/>
        </Switch>
        );
}