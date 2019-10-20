import React from 'react';
import './App.css';
import LogIn from './components/LogIn/LogIn';
import PrivateRoute from './helpers/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import CheckAuth from './helpers/CheckAuth/CheckAuth';

const App: React.FC = () => {
  
  return (
    <div >
      <CheckAuth/>
      <BrowserRouter>
        <Link to='/suojattu'>Suojattu</Link>
        
        <Route exact={true} path="/" component={LogIn}/>
        <Route path="/kirjaudu" component={LogIn}/>
        <PrivateRoute path="/suojattu" component={Header}/>

      </BrowserRouter> 
         
    </div>
   
  );
};

export default App;
