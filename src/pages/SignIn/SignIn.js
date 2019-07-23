import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToken } from '../../actions/signInActions';
import { NavLink, Redirect } from 'react-router-dom';

import './SignIn.scss';

const SERVER_ADDRESS = 'http://178.128.233.31'

class SignIn extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userName: '',
         password: '',
         submitted: false,
         errorMsg: '',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event) {                // Binds to input fields to update state
      // Remove error message when user retries
      this.setState({ submitted: false, errorMsg: '' });
      const { id, value } = event.target;
      this.setState({
         [id]: value
      });
   }

   handleSubmit(event) {                // Binds to Login button
      event.preventDefault();

      let username = this.state.userName
      let password = this.state.password

      this.setState({ submitted: true })

      // Make API Call
      fetch(SERVER_ADDRESS + '/frontend/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            username: username,
            password: password
         })
      })
         .then(res => res.json())
         .then(json => {
            if (json.code === "Login successful") {
               this.props.setUserName(username)
               this.props.userHasAuthenticated(true)     // Update App isAuthenticated state
            } else {
               // Show error message
               this.setState({ errorMsg: json.code + ": " + json.error })
            }
         });

   }

   render() {
      const submitted = this.state.submitted;
      const errorMsg = this.state.errorMsg;

      // Checks whether the user is authenticated for current session
      //  Remove 'submited' if you want /signIn to redirect to dashboard if user is already logged in
      if (submitted && this.props.isAuthenticated) {
         return <Redirect to='/dashboard' />
      }
      return (
         <div className="signin-container">
            <div >
               <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                     <input type="text" className="form-control" id="userName" placeholder="Username"
                        value={this.state.username} onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                     <input type="password" id="password" placeholder="Password"
                        value={this.state.password} onChange={this.handleChange}
                        className={'form-control' + (submitted && errorMsg ? ' has-error' : '')} />
                     {submitted ?
                        <div className="error-msg">{errorMsg}</div> : ''}
                  </div>
                  <div>
                     <button type="submit" name="signIn" className="btn btn-info signin-btn">Login</button>
                  </div>
               </form>
            </div>
            <div className="signup-options-container">
               <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
               <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      UserStore: state.UserStore
   }
}

function mapDispatchToProps(dispatch) {
   return {
      actions: bindActionCreators(
         {
            fetchToken,
         },
         dispatch
      )
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(SignIn)
