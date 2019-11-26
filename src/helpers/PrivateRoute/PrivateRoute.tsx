import React, { FunctionComponent, Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./../../store/types";

interface PrivateRouteProps {
  component: FunctionComponent<{}> | any;
  path: string;
  loggedIn: boolean;
}

/* const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        true 
        ? <Component />
        : <Redirect to={{
            pathname: '/kirjaudu',
            state: { from: props.location }
            }} 
          />
      )} 
    />
  ) */

class PrivateRoute extends Component<PrivateRouteProps, {}> {
  render() {
    const Content = this.props.component;
    const routeContent = this.props.loggedIn ? (
      <Content />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );

    return <Route path={this.props.path} render={props => routeContent} />;
  }
}

const mapState = (state: AppState) => {
  return {
    loggedIn: state.user.loggedIn,
  };
};

export default connect(mapState)(PrivateRoute);
