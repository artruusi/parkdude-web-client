import React from "react";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import PrivateRoute from "./helpers/PrivateRoute/PrivateRoute";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AppState } from "./store/types";
import { checkLogIn } from './store/actions/userActions';
import { connect, ConnectedProps } from 'react-redux';
import Forbidden from "./components/Forbidden/Forbidden";
type Props = ConnectedProps<typeof connector>;

export class App extends React.Component<Props> {
  componentDidMount() {
    this.props.checkLogIn();
  }

  render() {
    if (!this.props.authChecked) {
      // At start user will be briefly shown a white page while loading login state, 
      // because otherwise the screen would flicker very quickly
      // Authorised and non-authorised users see different containers for starting pages,
      // so there is no good loading container that would allow smooth transition to both kinds
      // of pages
      return (
        <div/>
      );
    }
    return (
      <div>
        <BrowserRouter>
        
          <Route exact={true} path="/" component={LogIn} />
          <Route path="/login" component={LogIn} />
          <Route path="/forbidden" component={Forbidden} />
          <PrivateRoute path="/customers" component={Layout} page='customers'  />
          <PrivateRoute path="/employees" component={Layout} page='employees' />
          <PrivateRoute path="/employees/:id" component={Layout} page='employee' />
          <PrivateRoute path="/parking-spots" component={Layout} page='parking-spots' />
          <PrivateRoute path="/accept-users" component={Layout} page='accept-users' />
          <PrivateRoute path="/reservations" component={Layout} page='reservations' />
          
        </BrowserRouter>
      </div>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    authChecked: state.user.authChecked,
  };
};

const mapDispatch = {
  checkLogIn,
};

const connector = connect(mapState, mapDispatch);
export default connector(App);
