import React, { FunctionComponent} from 'react'
import {
    Redirect,
    Route,
    
  } from 'react-router-dom';


type PrivateRouteProps = {
    component: FunctionComponent<{}>;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      true 
        ? <Component />
        : <Redirect to={{
            pathname: '/kirjaudu',
            state: { from: props.location }
          }} />
    )} />
  )

  export default PrivateRoute;