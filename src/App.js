import React from 'react';
import ReactDOM from "react-dom";
import { Route, Switch, Redirect } from "react-router-dom";

import { SignIn, SignUp, ForgotPassword, Dashboard } from './pages';
import './App.scss';

const SESSION_STORE_NAME = 'MGMTSession'
const SESSION_EXPIRE_TIME = 3600000       // 1 hour in milliseconds

class App extends React.Component {
  constructor(props) {
    super(props);

    // Check for saved session
    let username = ''
    let isAuthenticated = false

    if (sessionStorage.getItem(SESSION_STORE_NAME)) { // Check if session exists
      let userSession = JSON.parse(sessionStorage.getItem(SESSION_STORE_NAME))
      if (userSession.expireTime > Date.now()) { // If the session has not expired
        username = userSession.username
        isAuthenticated = true
      }
    }

    this.state = {
      isAuthenticated: isAuthenticated,
      user: {
        userName: username,
      }
    }
  }
  // Create new session using Browser 'sessionState'
  createNewSession() {
    let newSession = {
      username: this.state.user.userName,
      expireTime: Date.now() + SESSION_EXPIRE_TIME    // set timestamp to one hour from now
    }
    sessionStorage.setItem(SESSION_STORE_NAME, JSON.stringify(newSession))
  }
  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated,
    });
    // Initiate session
    this.createNewSession()
  }
  setUserName = name => {
    this.setState({
      user: {
        ...this.user,
        userName: name
      }
    })
  }
  render() {
    // Props to pass to components so children can update App state
    //    In addition, 'isAuthenticated' is used to handle login and session state across components
    //    Some additional child component state attributes could probably be declared in App state as well (maybe)
    const signInProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      setUserName: this.setUserName
    }
    const dashboardProps = {
      isAuthenticated: this.state.isAuthenticated,
      username: this.state.user.userName
    }
    return (
      <div className="App">
        <Switch>
          <AppliedRoute path="/signin" component={SignIn} props={signInProps} />
          <AppliedRoute path="/dashboard" component={Dashboard} props={dashboardProps} />
          {/* <Route path="/signin" render={props => <SignIn childProps={childProps} />} /> */}
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          <Route path="/signup" component={SignUp} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route render={props => <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />} />
        </Switch>
      </div>
    );
  }
}

// Simple component to pass props through
var AppliedRoute = ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={props => <C {...props} {...cProps} />} />

export default App;
