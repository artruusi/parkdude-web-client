import React, {Component} from 'react';
import './TableView.css';
import Modal from '../Modal/Modal';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../store/types';
import { connect } from 'react-redux';
import { ParkingSpot, Person} from '../../store/types';

import checkIcon from './../../img/ic_check.svg';

interface OwnTableViewProps {
  type: string;
  
}
// syystä X typescript menee Reduxin kanssa sekaisin, jos antaa personsWaiting: PersonNameEmail []. Ei käänny silloin ollenkaan, tutkitaan
interface ReduxTableViewProps {
  parkingSpots: ParkingSpot [];
  persons: Person [];
  personsWaiting: any;
}

interface TableViewState {
  showDeleteModal: boolean;
  showAddUserModal: boolean;
  showAddSpotModal: boolean;
  employeeSelected: number;
}

interface PersonNameEmail {
  id: string;
  name: string;
  email: string;
}

type TableViewProps = OwnTableViewProps & ReduxTableViewProps;

class TableView  extends Component<TableViewProps, TableViewState> {

  state = {

    employeeSelected: 0,
    showAddSpotModal: false,
    showAddUserModal: false,  
    showDeleteModal: false,
    
  };

  openDeleteModal = () => {
    this.setState({showDeleteModal: true});
  }
  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  }

  openAddUserModal = () => {
    this.setState({showAddUserModal: true});
  }

  closeAdduserModal = () => {
    this.setState({showAddUserModal: false});
  }
  openAddSpotModal = () => {
    this.setState({showAddSpotModal: true});
  }

  closeAddSpotModal = () => {
    this.setState({showAddSpotModal: false});
  }

  renderRedirect = () => {
    if (this.state.employeeSelected !== 0) {
      console.log('seex');
      return  <Redirect to='/employees/1'/>;
      
    }
  } 

  setEmployeeSelected = () => {
    this.setState({employeeSelected: 1});
   
  }

  render() {
    console.log(process.env.REACT_APP_API_URL);
    console.log('env yllä');
   
    const deleteModal = this.state.showDeleteModal ? <Modal close={this.closeDeleteModal} type='delete'/> : null;
    const addUserModal = this.state.showAddUserModal ? <Modal close={this.closeAdduserModal} type='addUser' /> : null;
    const addSpotModal = this.state.showAddSpotModal ? <Modal close={this.closeAddSpotModal} type='addSpot' /> : null;

    let header;
    let tableHeader;
    let content;
    let addButton;
    let deleteButton;
    let searchReservations = null;

    if (this.props.type === 'employees') {

      header = 'Employees';
      addButton = <button id="table-view-add-user" className="button" onClick={this.openAddUserModal}> Add user</button>;
      deleteButton = <button id="table-view-delete-button" className="button" onClick={this.openDeleteModal}>Delete selected</button>;

      tableHeader = (
        <tr>
          <th>{}</th>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Parking spot</th>
          <th>Usage statistic</th>
        </tr>
      );

      content = this.props.persons.map((item, key) => {
        if ( item.email.includes('@innogiant')) {
          return (

            <tr key={item.id} onClick={this.setEmployeeSelected}>
              <td><input type="checkbox"/></td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.admin ? <img src={checkIcon} className="table-check" alt="check icon"/> : null}</td>
              <td>{item.parkingSpot}</td>
              <td>{item.usageStatic}</td>
            </tr>

          );
        }
      });
    
    } else if (this.props.type === 'customers') {

      header = 'Customers';
      addButton = <button id="table-view-add-user" className="button" onClick={this.openAddUserModal}> Add user</button>;
      deleteButton = <button id="table-view-delete-button" className="button" onClick={this.openDeleteModal}>Delete selected</button>;

      tableHeader = (
        <tr>
          <th>{}</th>
          <th>Approved</th>
          <th>Name</th>
          <th>Email</th>
          <th>Usage statistic</th>
        </tr>
      );
      console.log(this.props.persons);
      content = this.props.persons.map((item, key) => {
        if ( !item.email.includes('@innogiant')) {
          return (

            <tr key={item.id} onClick={this.setEmployeeSelected}>
              <td><input type="checkbox"/></td>
              <td>{<img src={checkIcon} className="table-check" alt="check icon"/>}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.usageStatic}</td>
            </tr>

          );
        }
      });

    }  else if (this.props.type === 'accept-users') {

      header = 'Accept users';
      addButton = null;
      deleteButton = <button id="table-view-accept-button" className="button" onClick={this.openDeleteModal}>Accept selected</button>;

      tableHeader = (
        <tr>
          <th>{}</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      );

      console.log(this.props.personsWaiting);
      content = this.props.personsWaiting.map((item: any, key: any) => {
        return (

          <tr key={item.id}>
            <td><input type="checkbox"/></td>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>

        );
      });

    }  else if (this.props.type === 'parking-spots') {

      header = 'Parking spots';
      addButton = <button id="table-view-add-user" className="button" onClick={this.openAddSpotModal}> Add parking spot</button>;
      deleteButton = <button id="table-view-delete-button" className="button" onClick={this.openDeleteModal}>Delete selected</button>;

      tableHeader = (
        <tr>
          <th>{}</th>
          <th>Number</th>
          <th>Regular spot</th>
          <th>Owner</th>
        </tr>
      );

      console.log(this.props.parkingSpots);
      content = this.props.parkingSpots.map((item, key) => ( 

      <tr key={item.id}>
        <td><input type="checkbox"/></td>
        <td>{item.number}</td>
        <td>{item.permanent ? <img src={checkIcon} className="table-check" alt="check icon"/> : null}</td>
        <td>{item.ownerName}</td>
      </tr>

      )); 

      searchReservations = (
        <div className="flex-column" id="search-reservation-container">
          <h3>Search reservations</h3>
          <div className="flex-row">
            <input className="table-input" type="text" placeholder="start day"/>
            <input className="table-input"  type="text" placeholder="end day"/>
            <input className="table-input"  type="text" placeholder="parking spot"/>
            <button className="button" id="table-search-reservations-button">Search</button>
          </div>
        </div>
      );
                 
    }
   
    return(
      
      <div id="table-view">
        {this.renderRedirect()}
        
        <div id="table-view-header-container" className="flex-row">
          <h2> {header}</h2>
          {addButton}
        </div>

        <div id="table-view-table-container">
          <table id="table-view-table">

            <thead>
              {tableHeader}
            </thead>

            <tbody>
              {content}
            </tbody>
                                  
          </table>
       
        </div>

        <div id="table-view-delete-button-container" className="flex-row">
         {deleteButton}
        </div>

         {searchReservations}

        {deleteModal}
        {addUserModal}
        {addSpotModal}
     
      </div>
      );
  
  }

}

const mapState = (state: AppState) => {

  return {
    parkingSpots: state.parkingSpot.parkingSpotList,
    persons: state.persons.personList,
    personsWaiting: state.persons.waitingForAccept,
  };
};

export default connect(mapState)(TableView) ;
