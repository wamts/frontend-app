import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';


import './SignUp.scss';

class SignUp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: {
            userName: '',
            password: '',
            email: '',
            referralCode: '',
         },
         submitted: false,
         validForm: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event) {
      const { id, value } = event.target;
      const { user } = this.state;
      this.setState({
         user: {
            ...user,
            [id]: value
         }
      });
   }

   handleSubmit(event) {
      event.preventDefault();
      // Redirect to Sign in page if successful, else return error message
      this.setState({ submitted: true });
      const { user } = this.state
      const errors = this.validateForm(user)
      let errorFree = !errors.userName && !errors.password && !errors.email && !errors.referralCode
      if (errorFree) {
         // Register user
         
         //
         this.setState({ validForm: true })
      }
      // Invalid fields are highlighted in red
   }

   validateForm(user) {
      const errors = {
         userName: '',
         password: '',
         email: '',
         referralCode: '',
      };

      // Validators
      const minLength = (len) => (val) => (val) && (val.length >= len);
      const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

      // Add additional validators as needed
      if (!user.userName)                             // Username
         errors.userName = 'Please Enter a username';
      else if (!minLength(3)(user.userName))
         errors.userName = 'Username must be at least 3 characters long';

      if (!user.password)                             // Password
         errors.password = 'Please Enter a password';
      else if (!minLength(8)(user.password))
         errors.password = 'Password must be at least 8 characters long';

      if (!user.email)                                // Email
         errors.email = 'Please Enter your email';
      else if (!validEmail(user.email))
         errors.email = 'Invalid Email Address';

      if (!user.referralCode)                         // Referral Code
         errors.referralCode = 'Please Enter your referral code';

      return errors;
   }

   render() {
      const user = this.state.user
      const submitted = this.state.submitted
      const validForm = this.state.validForm

      const errors = this.validateForm(user)
      if (submitted && validForm) {
         return <Redirect to='/signIn' />
      }
      return (
         <div className="signin-container">
            <div >
               <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                     <input type="text" id="userName" placeholder="Username"
                        className={'form-control' + (submitted && errors.userName ? ' has-error' : '')}
                        value={this.state.user.userName} onChange={this.handleChange} />
                     {submitted && errors.userName ?
                        <div className="error-msg">{errors.userName}</div> : ''}
                  </div>
                  <div className="form-group">
                     <input type="password" id="password" placeholder="Password"
                        className={'form-control' + (submitted && errors.password ? ' has-error' : '')}
                        value={this.state.user.password} onChange={this.handleChange} />
                     {submitted && errors.password ?
                        <div className="error-msg">{errors.password}</div> : ''}
                  </div>
                  <div className="form-group">
                     <input type="email" id="email" placeholder="Email"
                        className={'form-control' + (submitted && errors.email ? ' has-error' : '')}
                        value={this.state.user.email} onChange={this.handleChange} />
                     {submitted && errors.email ?
                        <div className="error-msg">{errors.email}</div> : ''}
                  </div>
                  <div className="form-group">
                     <input type="text" id="referralCode" placeholder="Referral code"
                        className={'form-control' + (submitted && errors.referralCode ? ' has-error' : '')}
                        value={this.state.user.referralCode} onChange={this.handleChange} />
                     {submitted && errors.referralCode ?
                        <div className="error-msg">{errors.referralCode}</div> : ''}
                  </div>
                  <div >
                     <button type="submit" name="signIn" className=" btn btn-info signup-btn">Sign Up</button>
                  </div>
               </form>
            </div>
            <div className="signup-options-container">
               <NavLink to="/signIn" className="signup-link" >Sign In</NavLink>
               <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>

            </div>
         </div>
      )
   }
}

export default SignUp;
