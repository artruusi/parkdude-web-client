import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState, Dispatch } from './../../store/types';

import { ChangePage } from "./../../store/actions/userActions";

interface HeaderProps {
    userName?: string;
    changePage: (page: string) => void;
    currentPage?: string;
}

class Header extends Component < HeaderProps , {} > {

render() {
    const userName = this.props.userName;
        
    return(
        <div id="header" className="flex-row">

        <div id="header-tab-container" className="flex-row">

            <div className="tab-container flex-column-center">
                <Link to="/employees" className="header-link" onClick={() => this.props.changePage('employees')}>
                    Employees
                </Link>

                {this.props.currentPage === 'employees' ?  <hr/> : null}
            </div>

            <div className="tab-container flex-column-center ">
                <Link to="/customers" className="header-link" onClick={() => this.props.changePage('customers')}>
                    Customers
                </Link>

                {this.props.currentPage === 'customers' ?  <hr/> : null}
            </div>

            <div className="tab-container flex-column-center">
                <Link to="/parking-spots" className="header-link" onClick={() => this.props.changePage('parking-spots')}>
                    Parking spots
                </Link>

                {this.props.currentPage === 'parking-spots' ?  <hr/> : null}
            </div>

        </div>
        
        <div id="header-user-container" className="flex-column">
            
            <span>{userName}</span>
            <span>Log out</span>
        </div>
        
    </div>
    );
}
   
}

const mapState = (state: AppState) => {
    return {
        currentPage: state.user.currentPage,
        userName: state.user.userName,
       
    };

};

const mapDispatch = (dispatch: Dispatch) => {
   return {
    changePage: (page: string) => dispatch(ChangePage(page)),
   };
};
   
export default connect(mapState, mapDispatch)(Header);
