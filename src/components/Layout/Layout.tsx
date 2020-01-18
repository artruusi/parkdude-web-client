import React, { Component } from 'react';
import Header from './../Header/Header';
import './Layout.css';
import Person from './../Person/Person';
import ParkingSpots from './../ParkingSpots/ParkingSpots';
import Persons from './../Persons/Persons';
import AcceptUsers from './../AcceptUsers/AcceptUsers';
import Reservations from './../Reservations/Reservations';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store/types';
import { ChangePage } from '../../store/actions/userActions';
 
interface OwnLayoutProps {
  page?: string;
}

type LayoutProps = ConnectedProps<typeof connector> & OwnLayoutProps;

class Layout extends Component<LayoutProps, {}> {

  componentDidMount(){
    this.updatePage();
  }

  componentDidUpdate(prevProps: LayoutProps){
    this.updatePage();
  }

  updatePage(){
    // Updates navigation change to redux
    if (this.props.page && this.props.page !== this.props.reduxPage) {
      this.props.changePage(this.props.page);
    }
  }

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
        <Header/>
        {content}
      </div>
  );
  }
}
const mapState = (state: AppState) => {
  return {
    parkingSpotsLoading: state.parkingSpot.loading,
    reduxPage: state.user.currentPage,
  };
};

const mapDispatch = {
  changePage: ChangePage,
};

const connector  = connect(mapState, mapDispatch);

export default connector(Layout);
