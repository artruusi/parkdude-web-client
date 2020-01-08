import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState, Dispatch, PasswordLogInData } from './../../store/types';
import { checkLogIn, passwordLogIn } from './../../store/actions/userActions';

import parkDudeLogo from './../../img/parkdude.svg';
import './Login.css';

interface LogInProps {
  loggedIn: boolean;
  checkLogIn: () => void;
  passwordLogIn: (data: PasswordLogInData) => void;
  
}

interface LogInSate {
  emailInput: string;
  passwordInput: string;
}

class LogIn extends Component<LogInProps, LogInSate> {

  state = {
    emailInput: '',
    passwordInput: '',
  };

  renderRedirect = () => {
    if (this.props.loggedIn) {
      return <Redirect to='/customers'/>;
    }
  }

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({emailInput: event.target.value});
  }

  handlePWChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({passwordInput: event.target.value});
  }

  googleLogIn = () => {

    const googleURL = process.env.REACT_APP_GOOGLE_LOG_IN as string;
    console.log(googleURL);
    document.location.href = googleURL;
  }
  passwordLogIn = () => { 
    const data = {
      email: this.state.emailInput,
      password: this.state.passwordInput,
    };
   
    this.props.passwordLogIn(data);
  }

  render() {
    this.props.checkLogIn();
    return (
      <div id="log-in" className="flex-column-center">
        {this.renderRedirect()}

        <img src={parkDudeLogo} alt="parkDude logo" id="log-in-logo"/>
        <h3>Log in</h3>
        
        <input type="text" placeholder="email" id="log-in-email" value={this.state.emailInput} onChange={this.handleEmailChange}/>
        <input type="password" placeholder="password" id="log-in-password" value={this.state.passwordInput} onChange={this.handlePWChange}/>

        <button className="button" id="log-in-log-button" onClick={this.passwordLogIn}>Log in</button>

        <div className="flex-row-center" id="log-in-or-container">
          <hr/>
          <span>OR</span>
          <hr/>
        </div>

        <button className="button" id="log-in-google-button" onClick={this.googleLogIn}>Log in with Google</button>
      </div>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    loggedIn: state.user.loggedIn,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    checkLogIn: () => dispatch(checkLogIn()),
    passwordLogIn: (data: PasswordLogInData) => dispatch(passwordLogIn(data)),
  };
};
export default connect(mapState, mapDispatch)(LogIn);
