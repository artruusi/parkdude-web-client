import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



interface LogInProps {
    loggedIn: boolean;
}

class LogIn extends Component <LogInProps, {}> {

    renderRedirect = () => {
        if (this.props.loggedIn) {
          return <Redirect to='/' />
        }
      }

    render() {
        return (
            <div >
                {this.renderRedirect()}

                <p>Kirjaudu siään käyttäen Google tiliäsi</p>
                
            </div>
        );
    }

    }
    
const mapState = (state: any) => {
    return {
        loggedIn: state.user.loggedIn
    }
}
export default connect(mapState)(LogIn);