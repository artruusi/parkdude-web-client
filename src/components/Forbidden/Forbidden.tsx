import React, { Component} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState, UserRole } from './../../store/types';

import parkDudeLogo from './../../img/parkdude.svg';
import { logOutFromServer } from '../../store/actions/userActions';
import './Forbidden.css';

type Props = ConnectedProps<typeof connector>;

class Forbidden extends Component<Props> {
  render() {
    if (this.props.userRole === UserRole.ADMIN || !this.props.loggedIn) {
      return <Redirect to="/"/>;
    }
    return (
      <div className="flex-column-center forbidden-view">
        <img src={parkDudeLogo} alt="Parkdude logo" className="parkdude-logo"/>
        <h3>Forbidden</h3>
        <p>You don't have permission to access this content.</p>
        <button className="button" onClick={this.props.logOut}>Log out</button>
      </div>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    loggedIn: state.user.loggedIn,
    userRole: state.user.userRole,
  };
};

const mapDispatch = {
  logOut: logOutFromServer,
};

const connector = connect(mapState, mapDispatch);
export default connector(Forbidden);
