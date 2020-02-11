import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
