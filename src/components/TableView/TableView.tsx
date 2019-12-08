import React, {Component} from 'react';
import './TableView.css';
import Modal from '../Modal/Modal';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../store/types';
import { connect } from 'react-redux';
import { ParkingSpot} from '../../store/types';

interface OwnTableViewProps {
  type: string;
  
}

interface ReduxTableViewProps {
  parkingSpots: ParkingSpot [];
}

interface TableViewState {
  showDeleteModal: boolean;
  showAddUserModal: boolean;
  employeeSelected: number;
}

type TableViewProps = OwnTableViewProps & ReduxTableViewProps;

class TableView  extends Component<TableViewProps, TableViewState> {

  state = {

    employeeSelected: 0,
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
   
    const deleteModal = this.state.showDeleteModal ? <Modal close={this.closeDeleteModal} type='delete'/> : null;
    const addUserModal = this.state.showAddUserModal ? <Modal close={this.closeAdduserModal} type='addUser' /> : null;

    let header;
    let tableHeader;
    let content;

    if (this.props.type === 'employees') {
      header = 'Employees';
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
    } else if (this.props.type === 'customers') {
      header = 'Customers';

      tableHeader = (
        <tr>
          <th>{}</th>
          <th>Approved</th>
          <th>Name</th>
          <th>Email</th>
          <th>Usage statistic</th>
        </tr>
      );
    }  else if (this.props.type === 'accept-users') {
      header = 'Accept users';

      tableHeader = (
        <tr>
          <th>{}</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      );
    }  else if (this.props.type === 'parking-spots') {
      header = 'Parking spots';

      tableHeader = (
        <tr>
          <th>{}</th>
          <th>Number</th>
          <th>Regular spot</th>
          <th>Owner</th>
        </tr>
      );
      console.log(this.props.parkingSpots);
      content = this.props.parkingSpots.map((item, key) =>  <tr key={item.id}><td>{item.number}</td></tr>); 
                 
    }
   
    return(
      
      <div id="table-view">
        {this.renderRedirect()}
        
        <div id="table-view-header-container" className="flex-row">
          <h2> {header}</h2>
          <button id="table-view-add-user" className="button" onClick={this.openAddUserModal}> Add user</button>
        </div>

        <div id="table-view-table-container">
          <table id="table-view-table">
            <thead>
              {tableHeader}

            </thead>
            <tbody>
              {content}
  
              <tr>
                  <td><input type="checkbox"/></td>
                  <td>Harri Rajala</td>
                  <td>harri.rajala@innogiant.com</td>
                  <td>No</td>
                  <td>12</td>
                  <td>1</td>
              </tr>
              <tr>
                  <td><input type="checkbox"/></td>
                  <td>Harri Rajala</td>
                  <td>harri.rajala@innogiant.com</td>
                  <td>No</td>
                  <td>12</td>
                  <td>1</td>
              </tr>
              <tr>
                  <td><input type="checkbox"/></td>
                  <td>Harri Rajala</td>
                  <td>harri.rajala@innogiant.com</td>
                  <td>No</td>
                  <td>12</td>
                  <td>1</td>
              </tr>
              <tr>
                  <td><input type="checkbox"/></td>
                  <td>Harri Rajala</td>
                  <td>harri.rajala@innogiant.com</td>
                  <td>No</td>
                  <td>12</td>
                  <td>1</td>
              </tr>
              <tr>
                  <td><input type="checkbox"/></td>
                  <td>Harri Rajala</td>
                  <td>harri.rajala@innogiant.com</td>
                  <td>No</td>
                  <td>12</td>
                  <td>1</td>
              </tr>
              <tr>
                  <td><input type="checkbox"/></td>
                  <td>Harri Rajala</td>
                  <td>harri.rajala@innogiant.com</td>
                  <td>No</td>
                  <td>12</td>
                  <td>1</td>
              </tr>

            </tbody>
                                  
          </table>
        </div>

        <div id="table-view-delete-button-container" className="flex-row">
          <button id="table-view-delete-button" className="button" onClick={this.openDeleteModal}>Delete selected</button>
        </div>

        {deleteModal}
        {addUserModal}
     
      </div>
      );
  
  }

}

const mapState = (state: AppState) => {

  return {
    parkingSpots: state.parkingSpot.parkingSpotList,
  };
};

export default connect(mapState)(TableView) ;
