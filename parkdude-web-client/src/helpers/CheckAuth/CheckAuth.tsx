import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch, AppState } from "./../../store/types";
import { logOutFromServer } from "../../store/actions/userActions";
import { checkLogIn, LogUserIn } from "./../../store/actions/userActions";

interface CheckAuthProps {
  checkLogIn: () => void;
  logOut: () => void;
  loggedIn: boolean;
}

class CheckAuth extends Component<CheckAuthProps, {}> {
  render() {
    this.props.checkLogIn();
    const button = this.props.loggedIn ? (
      <button onClick={this.props.logOut}>Log out</button>
    ) : (
      <a href="http://localhost:3000/api/auth/google/web">Log in</a>
    );
    return (
      <div>
        <p>CheckAuth works</p>
        {button}
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
    logOut: () => dispatch(logOutFromServer()),
    logUserIn: () => dispatch(LogUserIn()),
  };
};

export default connect(
  mapState,
  mapDispatch,
)(CheckAuth);
