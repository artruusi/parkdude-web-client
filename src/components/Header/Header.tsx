import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState, Dispatch } from './../../store/types';

import { logOutFromServer } from "./../../store/actions/userActions";

import personIcon from './../../img/person-icon-white.png';

interface OwnHeaderProps {
  userName?: string;
  currentPage?: string;
}

interface ReduxHeaderprops {
  logOutFromServer: () => void;
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
    console.log('show');
    this.setState({showDropDown: true});
  }
  hideDropDown = () => {
    console.log('hide');
    this.setState({showDropDown: false});
  }

  render() {
    const dropdown = (
      <div className="header-dropdown-content" onMouseLeave={this.hideDropDown}>
        <span className="header-dropdown-username">{this.props.userName}</span>
        <span onClick={this.props.logOutFromServer} className="header-log-out-span">Log out</span>
      </div>
    );

    const visibleDropdown = this.state.showDropDown ? dropdown : null; 
    
    return(
      <div>
        <div className="flex-row header">
          
          <div id="" className="flex-row header-tab-container">

            <div className="tab-container flex-column-center">
              <Link to="/employees" className="header-link">
                Employees
              </Link>

              {this.props.currentPage === 'employees' ?  <hr/> : null}
            </div>

            <div className="tab-container flex-column-center ">
              <Link to="/customers" className="header-link">
                Customers
              </Link>

              {this.props.currentPage === 'customers' ?  <hr/> : null}
            </div>

            <div className="tab-container flex-column-center">
              <Link to="/parking-spots" className="header-link">
                Parking spots
              </Link>

              {this.props.currentPage === 'parking-spots' ?  <hr/> : null}
            </div>

            <div className="tab-container flex-column-center">
              <Link to="/accept-users" className="header-link">
                Accept users
              </Link>

              {this.props.currentPage === 'accept-users' ?  <hr/> : null}
            </div>

            <div className="tab-container flex-column-center">
              <Link to="/reservations" className="header-link">
                Reservations
              </Link>

              {this.props.currentPage === 'reservations' ?  <hr/> : null}
            </div>

          </div>
        
          <div className="flex-row-center header-icon-container" onMouseEnter={this.showDropDown}>
            <img className="header-user-icon" src={personIcon} alt="person"/>  
            
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
    logOutFromServer: () => dispatch(logOutFromServer()),
  };
};
   
export default connect(mapState, mapDispatch)(Header);
