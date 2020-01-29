import React, {Component, ChangeEvent } from 'react';
import { AppState, Dispatch, IPerson, ParkingSpot } from '../../store/types';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import './Persons.css';
import checkIcon from './../../img/ic_check.svg';
import { getPersons, deletePerson, hidePersonsSnackBar } from '../../store/actions/personsActions';
import { Snackbar, SnackbarOrigin, Checkbox } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

interface SelectedRows {
  [key: string]: boolean;
}

interface PersonsState {
  showAddUserModal: boolean;  
  showDeleteModal: boolean;
  selectedRows: SelectedRows; 
  selectedPerson: string | null;
}

interface OwnPersonsProps {
  type: string;
}

interface ReduxPersonsProps {
  closeSnackBar: () => void;
  deletePerson: (id: string) => void;
  loading: boolean;
  snackBarMessage: string;
  getPersons: () => void;
  persons: IPerson [];
}

type PersonsProps = OwnPersonsProps & ReduxPersonsProps;

class Persons extends Component<PersonsProps, PersonsState> {

  state = {
    selectedPerson: null,
    selectedRows: {} as SelectedRows,
    showAddUserModal: false,  
    showDeleteModal: false,
  };

  openAddUserModal = () => {
    this.setState({showAddUserModal: true});
  }

  closeAddUserModal = () => {
    this.setState({showAddUserModal: false});
  }

  openDeleteModal = () => {
    this.setState({showDeleteModal: true});
  }
  closeDeleteModal = () => {
    this.setState({showDeleteModal: false});
  }

  handleTableClick(person: string) {
    this.setState({selectedPerson: person});
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
    this.closeDeleteModal();

    Object.keys(this.state.selectedRows).forEach(row => {
      if (this.state.selectedRows[row]) {
        this.props.deletePerson(row);
      }
     
    });
  }

  renderRedirect = () => {
    if (this.state.selectedPerson !== null) {     
      const url = '/employees/' + this.state.selectedPerson;
      return  <Redirect to={url}/>;
      
    }
  } 
  componentDidMount() {
    this.props.getPersons();
  }

  componentDidUpdate(prevProps: PersonsProps) {
    if (prevProps.persons !== this.props.persons) {
      const personIds = new Set(...this.props.persons.map(person => person.id));
      const filteredSelection = Object.entries(this.state.selectedRows).filter(([id]) => personIds.has(id));
      this.setState({selectedRows: Object.fromEntries(filteredSelection)});
    }
  }

  render() {

    let content;
    const header = this.props.type === 'employees' ? 'Employees' : 'Customers';
    const deleteObjectNumber: number = Object.keys(this.state.selectedRows).reduce((acc, row) => {
      if (this.state.selectedRows[row]) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const addButton = this.props.type !== 'employees'
      ? <button  className="button persons-add-user" onClick={this.openAddUserModal}>Add</button>
      : null;
    const addUserModal = this.state.showAddUserModal ? <Modal close={this.closeAddUserModal} type='addUser' /> : null;
    const deleteModal = this.state.showDeleteModal 
      ? (
        <Modal 
          close={this.closeDeleteModal} 
          confirmDelete={this.deletePersons} 
          type='delete-persons' 
          deleteObjectNumber={deleteObjectNumber}
        /> 
      )
      : null;
    const deleteButton = (
      <button 
        className="button persons-delete-button" 
        onClick={this.openDeleteModal}
        disabled={deleteObjectNumber === 0}
      >
        Delete
      </button>
      );

    let tableHeader;  
    if (this.props.type === 'employees') {
      tableHeader = (
        <tr>
          <th  className="table-cell">{}</th>
          <th className="table-cell">Name</th>
          <th  className="table-cell">Email</th>
          <th  className="table-cell">Admin</th>
          <th  className="table-cell">Parking spot</th>
          <th  className="table-cell">Usage statistic</th>
        </tr>
      );
    } else {
      tableHeader = (
        <tr>
          <th className="table-cell-customers ">{}</th>
          <th className="table-cell-customers ">Approved</th>
          <th className="table-cell-customers ">Name</th>
          <th className="table-cell-customers ">Email</th>
          <th className="table-cell-customers ">Usage statistic</th>
        </tr>
      );
    } 
    
    content = this.props.persons.map(person => {

      if (this.props.type === 'employees') {
        if ( person.email.includes('@innogiant') ) {

          let parkingSpotsSTR =  person.ownedParkingSpots.reduce(
            (acc: string, spot: ParkingSpot) => acc + spot.name + ', ',
             '',
          );
          // remove last ,
          parkingSpotsSTR = parkingSpotsSTR.slice(0, -1);
          parkingSpotsSTR = parkingSpotsSTR.slice(0, -1);
      
          return (       

            <tr key={person.id}  id={person.id}>
              <td className="persons-table-1-column">
                <Checkbox
                  onChange={this.handleCheckBoxClick}
                  value={person.id}
                  style={{ color: "#544C09"}}       
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />

              </td>
                                
             <td  className="persons-table-1-column" onClick={() => this.handleTableClick(person.id)}>{person.name}</td>
             <td  className="persons-table-1-column" onClick={() => this.handleTableClick(person.id)}>{person.email}</td>
             <td  className="persons-table-1-column" onClick={() => this.handleTableClick(person.id)}>
                {person.role === 'admin' ? <img src={checkIcon} className="table-check" alt="check icon"/> : null}
              </td>
             <td   className="persons-table-1-column" onClick={() => this.handleTableClick(person.id)}>{parkingSpotsSTR}</td>
             <td   className="persons-table-1-column" onClick={() => this.handleTableClick(person.id)}>{person.reservationCount}</td>
           </tr>
  
          );
        } else {return null; }

      } else {
        if ( !person.email.includes('@innogiant') ) {
          return (
  
          <tr key={person.id} >
            <td className="table-cell-customers ">
              <Checkbox
                onChange={this.handleCheckBoxClick}
                value={person.id}
                style={{ color: "#544C09"}}       
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </td>
            
            <td className="table-cell-customers " onClick={() => this.handleTableClick(person.id)}>
              {person.role !== 'unverified' ? <img src={checkIcon} className="table-check" alt="check icon"/> : null}
            </td>
            <td className="table-cell-customers " onClick={() => this.handleTableClick(person.id)}>{person.name}</td>
            <td className="table-cell-customers " onClick={() => this.handleTableClick(person.id)}>{person.email}</td>
            <td className="table-cell-customers " onClick={() => this.handleTableClick(person.id)}>{person.reservationCount}</td>
          </tr>
  
          );
        } else {return null; }

      }
         
    });

    const snackLocation: SnackbarOrigin = {
      horizontal: 'center',
      vertical: 'bottom',
    };

    let page = (
      <div className="persons">
        {this.renderRedirect()}
              
        <div className="flex-row persons-header-container">
          <h2>{header}</h2>
          {addButton}
          
        </div>

        <div className="table-container">
          <table className="persons-table">

            <thead>
              {tableHeader}
            </thead>

            <tbody>
              {content}
            </tbody>
                                  
          </table>
      
        </div>

        <div className="flex-row align-left-button-container persons-delete-button-container">
        {deleteButton}
        </div>      
        
        {addUserModal}
        {deleteModal}
        <Snackbar 
          open={this.props.snackBarMessage !== ''}
          anchorOrigin={snackLocation}
          message={<span>{this.props.snackBarMessage}</span>}
          onClose={this.props.closeSnackBar}
          autoHideDuration={3000}
         
        />
      </div>

    );

    if ( this.props.loading) {
      page = <Spinner/>;
    }
  
    return (
      <>
        {page}
      </>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    loading: state.persons.loading,
    persons: state.persons.personList,
    snackBarMessage: state.persons.snackBarMessage,
  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {
    closeSnackBar: () => dispatch(hidePersonsSnackBar()),
    deletePerson: (id: string) => dispatch(deletePerson(id)),
    getPersons: () => dispatch(getPersons()),
  };
};
export default connect(mapState, MapDispatch)(Persons);
