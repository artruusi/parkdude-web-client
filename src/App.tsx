import React from "react";
import "./App.css";
import LogIn from "./components/LogIn/LogIn";
import PrivateRoute from "./helpers/PrivateRoute/PrivateRoute";
import { BrowserRouter, Route } from "react-router-dom";
import CheckAuth from "./helpers/CheckAuth/CheckAuth";
import Layout from "./components/Layout/Layout";
const App: React.FC = () => {
  return (
    <div>
      <CheckAuth />
      <BrowserRouter>
       
        <Route exact={true} path="/" component={LogIn} />
        <Route path="/login" component={LogIn} />
        <PrivateRoute path="/protected" component={ProtectedComponent} page='protected' />
        <PrivateRoute path="/customers" component={Layout} page='customers'  />
        <PrivateRoute path="/employees" component={Layout} page='employees' />
        <PrivateRoute path="/employees/:id" component={Layout} page='employee' />
        <PrivateRoute path="/parking-spots" component={Layout} page='parking-spots' />
        <PrivateRoute path="/accept-users" component={Layout} page='accept-users' />
         
      </BrowserRouter>
    </div>
  );
};

const ProtectedComponent = () => <p>Protected route contents</p>;

export default App;
