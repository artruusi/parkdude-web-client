import React, { Component} from 'react';
import { Link } from 'react-router-dom';

import parkDudeLogo from './../../img/parkdude.svg';
import './LoginError.css';

export default class LoginError extends Component {
  render() {
    return (
      <div className="flex-column-center login-error-view">
        <img src={parkDudeLogo} alt="Parkdude logo" className="parkdude-logo"/>
        <h3>Login error</h3>
        <p>{this.getError() || "Login failed for unknown reason. Try again."}</p>
        <Link to="/login" className="button">Return to login</Link>
      </div>
    );
  }

  getError() {
    // Get error from query parameter
    const url = window.location.href;
    const key = 'error';
    const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results || !results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}
