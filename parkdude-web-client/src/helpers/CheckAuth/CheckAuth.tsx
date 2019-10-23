import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "./../../store/types";
import {
  checkLogIn,
  LogOut,
  LogUserIn,
} from "./../../store/actions/userActions";

interface CheckAuthProps {
  clearStore: () => void;
  checkLogIn: () => void;
  logUserIn: () => void;
}

class CheckAuth extends Component<CheckAuthProps, {}> {
  render() {
    this.props.checkLogIn();
    return (
      <div>
        <p>CheckAuth works</p>
        <button onClick={this.props.clearStore}>Log in</button>
        <button onClick={this.props.logUserIn}>Log out</button>
      </div>
    );
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  return {
    checkLogIn: () => dispatch(checkLogIn()),
    clearStore: () => dispatch(LogOut()),
    logUserIn: () => dispatch(LogUserIn()),
  };
};

export default connect(
  null,
  mapDispatch,
)(CheckAuth);
