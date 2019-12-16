import React, {Component, ChangeEvent } from 'react';
import { AppState, Dispatch, ParkingSpot, Person } from '../../store/types';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import './Persons.css';
import checkIcon from './../../img/ic_check.svg';
import { getPersons } from '../../store/actions/personsActions';

interface SelectedRows {
  [key: string]: boolean;
}

interface PersonsState {
  showAddUserModal: boolean;  
  showDeleteModal: boolean;
  selectedRows: SelectedRows; 
}

interface OwnPersonsProps {
  type: string;
}

interface ReduxPersonsProps {
  getPersons: () => void;
  persons: Person [];
}

type PersonsProps = OwnPersonsProps & ReduxPersonsProps;

class Persons extends Component<PersonsProps, PersonsState> {

  state = {
    selectedRows: {} as SelectedRows,
    showAddUserModal: false,  
    showDeleteModal: false,
  };

  openAddUserModal = () => {
    this.setState({showAddUserModal: true});
  }

  closeAdduserModal = () => {
    this.setState({showAddUserModal: false});
  }

  openDeleteModal = () => {
    this.setState({showDeleteModal: true});
  }
  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  }

  handleCheckBoxClick = (event: ChangeEvent<HTMLInputElement>) => {
   
    const value: string = event.target.value;
    const oldvalue = this.state.selectedRows[value];
    const newSelectedRows = {...this.state.selectedRows};

    if (typeof oldvalue === "undefined") {
     
      newSelectedRows[value] = true;
      this.setState({selectedRows: newSelectedRows});
      
    } else {
     
      newSelectedRows[value] = !newSelectedRows[value];
      this.setState({selectedRows: newSelectedRows});

    }

  }

  deletePersons = () => {
    console.log('delete');
  }

  render() {
    let content;
    const deleteObjectNumber: number = Object.keys(this.state.selectedRows).reduce((acc, row) => {
      if (this.state.selectedRows[row]) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const addButton = <button id="persons-add-user" className="button" onClick={this.openAddUserModal}> Add parking spot</button>;
    const addSpotModal = this.state.showAddUserModal ? <Modal close={this.closeAdduserModal} type='addSpot' /> : null;
    const deleteModal = this.state.showDeleteModal 
      ? (
        <Modal 
          close={this.closeDeleteModal} 
          confirmDelete={this.deletePersons} 
          type='delete-spots' 
          deleteObjectNumber={deleteObjectNumber}
        /> 
      )
      : null;
    const deleteButton = (
      <button 
        id="persons-delete-button" 
        className="button" 
        onClick={this.openDeleteModal}
      >
        Delete selected
      </button>
      );

    let tableHeader;  
    if (this.props.type === 'employees') {
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
    } else {
      tableHeader = (
        <tr>
           <th>{}</th>
          <th>Approved</th>
          <th>Name</th>
          <th>Email</th>
          <th>Usage statistic</th>
        </tr>
      );
    } 
    

    content = this.props.persons.map((item) => {
      if ( !item.email.includes('@innogiant')) {
        return (

          <tr key={item.id} >
            <td><input type="checkbox"/></td>
            <td>{<img src={checkIcon} className="table-check" alt="check icon"/>}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.usageStatic}</td>
          </tr>

        );
      } else {return null; }
    });

    return (
      <div id="persons">
              
        <div id="persons-header-container" className="flex-row">
          <h2>Parking spots </h2>
          {addButton}
          
        </div>

        <div id="persons-table-container">
          <table id="persons-table">

            <thead>
              {tableHeader}
            </thead>

            <tbody>
              {content}
            </tbody>
                                  
          </table>
      
        </div>

        <div id="persons-delete-button-container" className="flex-row">
        {deleteButton}
        </div>      
        
        {addSpotModal}
        {deleteModal}
      </div>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    persons: state.persons.personList,
  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {
    getPersons: () => dispatch(getPersons()),
    
  };
};
export default connect(mapState, MapDispatch)(Persons);
