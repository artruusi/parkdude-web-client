import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState, Dispatch } from './../../store/types';

import { ChangePage, logOutFromServer } from "./../../store/actions/userActions";

import personIcon from './../../img/person-icon-white.png';

interface OwnHeaderProps {
  userName?: string;
  currentPage?: string;
  
}

interface ReduxHeaderprops {
  logOutFromServer: () => void;
  changePage: (page: string) => void;
 
}

interface HeaderState {
  showDropDown: boolean;
}

type HeaderProps = OwnHeaderProps & ReduxHeaderprops;

class Header extends Component < HeaderProps , HeaderState > {

  state = {
    showDropDown: false,
  };

  showDropDown = () => {
    this.setState({showDropDown: true});
  }
  hideDropDown = () => {
    this.setState({showDropDown: false});
  }

  render() {

    const dropdown = (
      <div id="header-dropdown-content" onMouseLeave={this.hideDropDown}>
        <span id="header-dropdown-username">{this.props.userName}</span>
        <span onClick={logOutFromServer} id="header-log-out-span">Log out</span>
      </div>
    );

    const visibleDropdown = this.state.showDropDown ? dropdown : null; 
    
    return(
      <div>
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

            <div className="tab-container flex-column-center">
              <Link to="/accept-users" className="header-link" onClick={() => this.props.changePage('accept-users')}>
                Accept users
              </Link>

              {this.props.currentPage === 'accept-users' ?  <hr/> : null}
            </div>

            <div className="tab-container flex-column-center">
              <Link to="/reservations" className="header-link" onClick={() => this.props.changePage('reservations')}>
                Reservations
              </Link>

              {this.props.currentPage === 'reservations' ?  <hr/> : null}
            </div>

          </div>
        
          <div id="header-icon-container" className="flex-row-center" onMouseEnter={this.showDropDown}>
            <img id="header-user-icon" src={personIcon} alt="person"/>        
            
          </div>    
        </div>
        {visibleDropdown}
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
    logOutFromServer: () => dispatch(logOutFromServer()),
  };
};
   
export default connect(mapState, mapDispatch)(Header);
