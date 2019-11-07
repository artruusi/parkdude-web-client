import React from "react";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import PrivateRoute from "./helpers/PrivateRoute/PrivateRoute";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CheckAuth from "./helpers/CheckAuth/CheckAuth";
import Layout from "./components/Layout/Layout";
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div>
      <CheckAuth />
      <BrowserRouter>

        <Route exact={true} path="/" component={Layout} />
        <Route path="/login" component={LogIn} />
        <PrivateRoute path="/protected" component={ProtectedComponent} />
        <PrivateRoute path="/customers" component={Layout} />
        <PrivateRoute path="/employees" component={Layout} />
        <PrivateRoute path="/parking-spots" component={Layout} />
      </BrowserRouter>
    </div>
  );
};

const ProtectedComponent = () => <p>Protected route contents</p>;

export default App;
