import React from 'react';
import './App.css';
import LogIn from './components/LogIn/LogIn';
import PrivateRoute from './helpers/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import CheckAuth from './helpers/CheckAuth/CheckAuth';

const App: React.FC = () => {
  return (
    <div>
      <CheckAuth />
      <BrowserRouter>
        <Link to='/protected'>Protected</Link>

        <Route exact={true} path='/' component={LogIn} />
        <Route path='/login' component={LogIn} />
        <PrivateRoute path='/protected' component={Header} />
      </BrowserRouter>
    </div>
  );
};

export default App;
