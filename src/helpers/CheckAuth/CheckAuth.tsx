import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch, AppState } from "./../../store/types";
import { Redirect } from "react-router-dom";

interface CheckAuthProps {
  loggedIn: boolean;
}

class CheckAuth extends Component<CheckAuthProps, {}> {
  render() {
    const content = null;

    if ( !this.props.loggedIn) {
      const ownURL = process.env.REACT_APP_OWN_URL ? process.env.REACT_APP_OWN_URL : '';
      // content = <Redirect to={ownURL}/>;
    }
   
    return (
    <> 
      {content}
    </>
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
   
  };
};

export default connect(mapState, mapDispatch)(CheckAuth);
