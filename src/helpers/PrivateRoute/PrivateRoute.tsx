import React, { FunctionComponent, Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AppState, UserRole } from "./../../store/types";

interface PrivateRouteProps {
  component: FunctionComponent<{}> | any;
  path: string;
  loggedIn: boolean;
  page: string;
  userRole?: UserRole;
}

class PrivateRoute extends Component<PrivateRouteProps, {}> {
  render() {
    return <Route path={this.props.path} render={this.renderRouteContent} exact={true} />;
  }

  renderRouteContent = () => {
    if (!this.props.loggedIn){
      return <Redirect to="/login" />;
    }
    if (this.props.userRole !== UserRole.ADMIN) {
      return <Redirect to="/forbidden" />;
    }
    const Layout = this.props.component;
    const page = this.props.page;
    return <Layout page={page}/>;
  }
}

const mapState = (state: AppState) => {
  return {
    loggedIn: state.user.loggedIn,
    userRole: state.user.userRole,
  };
};

export default connect(mapState)(PrivateRoute);
