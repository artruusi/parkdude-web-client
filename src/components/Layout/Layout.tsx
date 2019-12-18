import React, { Component } from 'react';
import Header from './../Header/Header';
import './Layout.css';
import TableView from './../TableView/TableView';
import Person from './../Person/Person';
import CheckAuth from './../../helpers/CheckAuth/CheckAuth';
import ParkingSpots from './../ParkingSpots/ParkingSpots';
import Persons from './../Persons/Persons';
import AcceptUsers from './../AcceptUsers/AcceptUsers';
 
interface LayoutProps {
  page?: string;
}

class Layout extends Component<LayoutProps, {}> {

  render() {

    console.log(this.props.page);
    let content;

    if (this.props.page === 'employee') {
      content = <Person/>;

    } else if (this.props.page === 'customers') {
      content = <Persons type="customers"/>;

    } else if (this.props.page === 'employees') {
      content = <Persons type="employees"/>;

    } else if (this.props.page === 'parking-spots') {
      content = <ParkingSpots/>;

    } else if (this.props.page === 'accept-users') {
      content = <AcceptUsers/>;

    } else if (this.props.page === 'reservations') {
      content = <TableView type="reservations"/>;
    }

    return (
      <div id="layout" className="flex-column">
        <CheckAuth/>
        <Header/>
        {content}
      </div>
  );
  }
}

export default Layout;
