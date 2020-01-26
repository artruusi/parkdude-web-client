import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState, Dispatch, PasswordLogInData } from './../../store/types';
import { checkLogIn, passwordLogIn } from './../../store/actions/userActions';

import parkDudeLogo from './../../img/parkdude.svg';
import './Login.css';
import { closeUserSnackBar } from '../../store/actions/userActions';
import { Snackbar, SnackbarOrigin } from '@material-ui/core';

interface LogInProps {
  closeSnackBar: () => void;
  loggedIn: boolean;
  checkLogIn: () => void;
  passwordLogIn: (data: PasswordLogInData) => void;
  snackBarMessage: string;
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
  passwordLogIn = (event: FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    const data = {
      email: this.state.emailInput,
      password: this.state.passwordInput,
    };
   
    this.props.passwordLogIn(data);
  }

  render() {
    this.props.checkLogIn();
    
    const snackLocation: SnackbarOrigin = {
      horizontal: 'center',
      vertical: 'bottom',
    };
    
    return (
      <form id="" className="flex-column-center log-in" onSubmit={this.passwordLogIn}>
        {this.renderRedirect()}

        <img src={parkDudeLogo} alt="Parkdude logo" className="log-in-logo"/>
        <h3>Log in</h3>
        
        <input type="email" placeholder="Email" className="log-in-email" value={this.state.emailInput} onChange={this.handleEmailChange}/>
        <input 
          type="password" 
          placeholder="Password" 
          className="log-in-password" 
          value={this.state.passwordInput} 
          onChange={this.handlePWChange}
        />

        <button className="button log-in-log-button"  type="submit">Log in</button>

        <div className="flex-row-center log-in-or-container">
          <hr/>
          <span>OR</span>
          <hr/>
        </div>

        <button className="button log-in-google-button" onClick={this.googleLogIn}>Log in with Google</button>

        <Snackbar 
          className='delete-snack'
          open={this.props.snackBarMessage !== ''}
          anchorOrigin={snackLocation}
          message={<span>{this.props.snackBarMessage}</span>}
          onClose={this.props.closeSnackBar}
          autoHideDuration={3000}
        
        />
      </form>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    loggedIn: state.user.loggedIn,
    snackBarMessage: state.user.snackBarMessage,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    checkLogIn: () => dispatch(checkLogIn()),
    closeSnackBar: () => dispatch(closeUserSnackBar()),
    passwordLogIn: (data: PasswordLogInData) => dispatch(passwordLogIn(data)),
  };
};
export default connect(mapState, mapDispatch)(LogIn);
