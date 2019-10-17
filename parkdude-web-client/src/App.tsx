import React from 'react';
import './App.css';
import LogIn from './components/LogIn/LogIn';
import PrivateRoute from './helpers/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import {
  BrowserRouter,
  Route,
  
} from 'react-router-dom';

const App: React.FC = () => {
  
  return (
    <div >
      
      <BrowserRouter>
        
        <Route exact path = "/" component = {LogIn}/>
        <Route path = "/kirjaudu" component = {LogIn}/>
        <PrivateRoute path = "/suojattu" component = {Header}/>

      </BrowserRouter> 
      
     
    </div>
   
  );
}

export default App;
