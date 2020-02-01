import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './views/Register';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
