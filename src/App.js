import React from 'react';
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, Router } from "react-router-dom";

import { SignIn, SignUp, ForgotPassword, Dashboard } from './pages';
import './App.scss';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/dashboard/signin" component={SignIn}/>
          <Route path="/dashboard/signup" component={SignUp}/>
          <Route path="/dashboard/forgotpassword" component={ForgotPassword}/>
          <Route path="/dashboard/home" component={Dashboard}/>
          <Route render={ props => <Redirect to={{ pathname: '/signin', state: { from: props.location } }} /> } />
        </Switch>
    </div>
  );
}

export default App;
