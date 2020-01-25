import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <div>Register Page</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
