import React, { Component } from 'react';
import Header from './../Header/Header';
import './Layout.css';
import Person from './../Person/Person';
import CheckAuth from './../../helpers/CheckAuth/CheckAuth';
import ParkingSpots from './../ParkingSpots/ParkingSpots';
import Persons from './../Persons/Persons';
import AcceptUsers from './../AcceptUsers/AcceptUsers';
import Reservations from './../Reservations/Reservations';
import { connect } from 'react-redux';
import { AppState } from '../../store/types';
 
interface OwnLayoutProps {
  page?: string;
}

interface ReduxLayoutProps {
  parkingSpotsLoading: boolean;

}
type LayoutProps = OwnLayoutProps & ReduxLayoutProps;

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
      content = <Reservations/>;
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
const mapState = (state: AppState) => {
  return {
    parkingSpotsLoading: state.parkingSpot.loading,
  };
};

export default connect(mapState)( Layout);
