import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from './../../store/types';

import parkDudeLogo from './../../img/parkdude.svg';
import './Login.css';

interface LogInProps {
  loggedIn: boolean;
  
}

interface LogInState {
  dummyLogIn: boolean;
}
class LogIn extends Component<LogInProps, LogInState> {

  state = {
    dummyLogIn: false,
  };

  renderRedirect = () => {
    if (this.props.loggedIn && this.state.dummyLogIn) {
      return <Redirect to='/customers'/>;
    }
  }
  changeDummyState = () => {
    this.setState({dummyLogIn: true});
  }

  render() {
    return (
      <div id="log-in" className="flex-column-center">
        {this.renderRedirect()}

        <img src={parkDudeLogo} alt="parkDude logo" id="log-in-logo"/>
        <h3>Log in</h3>
        
        <input type="text" placeholder="email" id="log-in-email"/>
        <input type="password" placeholder="password" id="log-in-password"/>

        <button className="button" id="log-in-log-button" onClick={this.changeDummyState}>Log in</button>

        <div className="flex-row-center" id="log-in-or-container">
          <hr/>
          <span>OR</span>
          <hr/>
        </div>

        <button className="button" id="log-in-google-button" onClick={this.changeDummyState}>Log in with Google</button>
      </div>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    loggedIn: state.user.loggedIn,
  };
};
export default connect(mapState)(LogIn);
