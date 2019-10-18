import React, { Component} from 'react'
import {connect} from 'react-redux';
import {Dispatch} from './../../store/types';
import {checkLogIn, LogOut, LogUserIn} from './../../store/actions/userActions';



interface CheckAuthProps {
    clearStore: () => void;
    checkLogIn: () => void;
    logUserIn: () => void;
}

class CheckAuth extends Component <CheckAuthProps, {}>{
    render() {
        this.props.checkLogIn();
        return(
            <div>
                <p>CheckAuth works</p>
                <button onClick={this.props.clearStore}>Kirjaudu ulos</button>
                <button onClick={this.props.logUserIn}>kirjaudu sisään</button>
               
            </div>
           
        );
    }

}

const mapDispatch = (dispatch: Dispatch) => {

    return {
        clearStore: () => dispatch(LogOut()),
        checkLogIn: () => dispatch(checkLogIn()),
        logUserIn: () => dispatch(LogUserIn())
    }

}

export default connect(null, mapDispatch)(CheckAuth);