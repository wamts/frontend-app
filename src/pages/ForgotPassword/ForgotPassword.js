import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './ForgotPassword.scss';

const SERVER_ADDRESS = 'http://178.128.233.31'

class ForgotPassword extends Component {
   constructor(props) {
      super(props);
      this.state = {
         retMsg: '',
         submitted: false
      }
      this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleSubmit(event) {
      event.preventDefault()

      let email = this.refs.email.value

      this.setState({ submitted: true })

      fetch(SERVER_ADDRESS + '/frontend/reset_password', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email,
         })
      }).then(res => res.json()
      ).then(json => {
         if (json.code === "Reset successful") {
            // Do more stuff
            this.setState({ retMsg: json.code })
         } else {
            // Display Error message
            // **** Expected response: json.code + ": " + json.error
            // **** Actual response:   json.msg, json.err (err is usually just {})
            this.setState({ retMsg: json.msg })
            console.log(json.msg)
         }
      });
   }
   render() {
      return <div className="signin-container">
         <div >
            <form onSubmit={this.handleSubmit}>
               <div className="form-group">
                  <input type="email" className="form-control" id="email" placeholder="Email" ref='email' ></input>
                  {this.state.submitted && this.state.retMsg ?
                     <div className={this.state.retMsg === 'Reset failed' ? 'error-msg' : ''}>{this.state.retMsg}</div> : ''}
               </div>
               <div >
                  <button type="submit" name="signIn" className=" btn btn-info fogotpwd btn">Forgot Password</button>
               </div>
            </form>
         </div>
         <div className="signup-options-container">
            <NavLink to="/signIn" className="signup-link">Sign In</NavLink>
            <NavLink to="/signUp" className="forgot-password-link">Sign Up</NavLink>
         </div>
      </div>
   }
}

export default ForgotPassword;
