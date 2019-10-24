import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from './../../store/types';

interface LogInProps {
  loggedIn: boolean;
}

class LogIn extends Component<LogInProps, {}> {
  renderRedirect = () => {
    if (this.props.loggedIn) {
      return <Redirect to='/' />;
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}

        <p>Login with your Google account</p>
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
