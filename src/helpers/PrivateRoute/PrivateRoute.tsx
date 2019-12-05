import React, { FunctionComponent, Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./../../store/types";

interface PrivateRouteProps {
  component: FunctionComponent<{}> | any;
  path: string;
  loggedIn: boolean;
  page: string;
}

class PrivateRoute extends Component<PrivateRouteProps, {}> {
  render() {
    const Layout = this.props.component;
    const page = this.props.page;

    const routeContent = this.props.loggedIn ? (
      <Layout page={page} />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );

    return <Route path={this.props.path} render={props => routeContent} exact={true} />;
  }
}

const mapState = (state: AppState) => {
  return {
    loggedIn: state.user.loggedIn,
  };
};

export default connect(mapState)(PrivateRoute);
