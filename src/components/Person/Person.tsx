import React, { Component, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import './Person.css';
import {spotListToString} from './../../helpers/helperFunctions';
import check from './../../img/ic_check.svg';
import { AppState, Dispatch, IPerson, UserReservations, ParkingSpot } from '../../store/types';
import { getPerson, modifyPerson, killSession, hidePersonsSnackBar } from '../../store/actions/personsActions';
import { getUserReservations, deleteReservations, startLoading, SetDeletereservationNumber, hideReservationsSnackBar } from '../../store/actions/reservationsActions';
import Modal from '../Modal/Modal';
import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import Spinner from '../Spinner/Spinner';
import { changeOwner, getParkingSpots, freeSpot, closeParkingSpotsSnackBar } from '../../store/actions/parkingSpotActions';

interface ReduxPersonProps {
  changeOwner: (id: string, name: string, newOwner: string, type: string) => void;
  closeSnackBar: () => void;
  deletereservations: (id: string, dates: string, type: string) => void;
  selectedPerson: IPerson;
  getData: (id: string) => void;
  getParkingSpots: () => void;
  getUserReservations: (id: string) => void;
  freePersonSpot: (spotId: string, spotName: string, personId: string) => void;
  hideParkingSpotSnackBar: () => void;
  hideReservationsSnackBar: () => void;
  killSession: (id: string) => void;
  loadingPersons: boolean;
  loadingReservations: boolean;
  startLoadingDeletereservations: () => void;
  modifyPerson: (person: IPerson, type: string) => void;
  parkingSpots: ParkingSpot [];
  userReservations: UserReservations [];
  snackBarMessagePersons: string;
  snackBarMessageReservations: string;
  snackBarMessageParkingSpots: string;
  setDeleteReservationsNumber: (reservationsnumber: number) => void;
  loadingParkingSpots: boolean;

}

interface SelectedRows {
  [key: string]: boolean;
}

type PersonProps = {} & ReduxPersonProps;

interface PersonState {
  selectedRows: SelectedRows; 
  showPasswordModal: boolean;
  showSpotModal: boolean;
}
class Person extends Component<PersonProps, PersonState> {

  state = {
    selectedRows: {} as SelectedRows,
    showPasswordModal: false,
    showSpotModal: false,  
  };

  componentDidMount() {
    const path = window.location.pathname;
    const pathSplit = path.split('/');
    const id = pathSplit[2];
    console.log(id);
    this.props.getUserReservations(id);
    this.props.getData(id);
    this.props.getParkingSpots();
  }

  componentDidUpdate(prevProps: PersonProps) {
    if (prevProps.userReservations !== this.props.userReservations) {
      const reservationKeys = new Set(...this.props.userReservations.map(reservation => {
        return reservation.parkingSpot.id + '&' + reservation.date;
      }));
      const filteredSelection = Object.entries(this.state.selectedRows).filter(([key]) => reservationKeys.has(key));
      this.setState({selectedRows: Object.fromEntries(filteredSelection)});
    }
  }

  makeAdmin = () => {
    this.props.modifyPerson(this.props.selectedPerson, 'make-admin');
  }
  undoAdmin = () => {
    this.props.modifyPerson(this.props.selectedPerson, 'undo-admin');
  }

  killSession = () => {
    this.props.killSession(this.props.selectedPerson.id);
  }

  showPasswordModal = () => {
    this.setState({showPasswordModal: true});
  }
  closePasswordModal = () => {
    this.setState({showPasswordModal: false});
  }
  showSpotModal = () => {
    this.setState({showSpotModal: true});
  }
  closeSpotModal = () => {
    this.setState({showSpotModal: false});
  }

  // TODO stack the reservations of the same day
  handleDeleteReservationsClick = () => {
    console.log(this.state.selectedRows);

    let deletereservationNumber = 0;
    Object.keys(this.state.selectedRows).forEach(row => {

      if (this.state.selectedRows[row]) {
        deletereservationNumber += 1;       
      }   
    });

    this.props.setDeleteReservationsNumber( deletereservationNumber);
    this.props.startLoadingDeletereservations();

    Object.keys(this.state.selectedRows).forEach(row => {
      if (this.state.selectedRows[row]) {

       const rowSplit = row.split('&');
       const id = rowSplit[0];
       const date = rowSplit[1];
       this.props.deletereservations(id, date, 'personReservation');
      }
     
    });

  }
  freeParkingSpots = () => {

    const parkingSpots: ParkingSpot [] = this.props.selectedPerson.ownedParkingSpots;

    parkingSpots.forEach(spot => {
      this.props.freePersonSpot(spot.id, spot.name, this.props.selectedPerson.id);
    });
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
 
  render() {

    const adminButton = this.props.selectedPerson.role === 'admin' 
      ? <button onClick={this.undoAdmin} className="button person-button">Undo admin</button> 
      : <button onClick={this.makeAdmin} className="button person-button">Make admin</button>;
    
    const sessionButton = this.props.selectedPerson.sessions.length !== 0
      ? <button className="button person-button" onClick={this.killSession}>Kill sesssion</button>
      : null;

    const parkingSpotButton = this.props.selectedPerson.ownedParkingSpots.length !== 0
      ? <button className="button person-button" onClick={this.freeParkingSpots} >Free user's spots</button>
      : <button className="button person-button" onClick={this.showSpotModal} >Get permanent spot</button>;

    const passwordButton = this.props.selectedPerson.isEmailValidated
      ? null
      : <button className="button person-button" onClick={this.showPasswordModal}>Change password</button>;

    const changepasswordModal = this.state.showPasswordModal 
      ? (
        <Modal 
          close={this.closePasswordModal} 
          type='changePassword' 
          personId={this.props.selectedPerson.id}         
        /> 
        )
      : null;

    console.log(this.props.parkingSpots);

    const giveSpotModal = this.state.showSpotModal 
      ? (
        <Modal 
          close={this.closeSpotModal} 
          type='giveSpot' 
          personEmail={this.props.selectedPerson.email}  
          personId={this.props.selectedPerson.id}    
          parkingSpots={this.props.parkingSpots}
        />
        ) 
      : null;

    const futurereservations: JSX.Element [] = [];
    const pastReservations: JSX.Element [] = [];
    const hasSelectedReservations = Object.values(this.state.selectedRows).some(value => value);

    const currentDay = new Date();

    this.props.userReservations.forEach(row => {
      const reservationDay = new Date(row.date);
      
      if (reservationDay > currentDay) {
        const element = (
          <tr key={row.parkingSpot.name + row.date}> 
           <td><input type="checkbox" value={row.parkingSpot.id + '&' + row.date} onChange={this.handleCheckBoxClick}/></td>             
            <td>{row.date}</td>
            <td>{row.parkingSpot.name}</td>
          </tr>
        );
        
        futurereservations.push(element);
      } else {
        const element = (
          <tr key={row.date + row.parkingSpot.name}>        
            <td>{row.date}</td>
            <td>{row.parkingSpot.name}</td>
          </tr>
        );
        pastReservations.push(element);
      }
    });

    // console.log(futurereservations);
    // console.log(pastReservations);

    const snackLocation: SnackbarOrigin = {
      horizontal: 'center',
      vertical: 'bottom',
    };

    let page = (
      <div className="flex-column person">
      <div className="flex-row person-header-container" >
        <h2>{this.props.selectedPerson.name}</h2>     
      </div>

      <div className="flex-row person-content-wrapper" >
        <div className="person-info-container">
          <div>
            <span className="bold">Email: </span>
            <span>{this.props.selectedPerson.email}</span>
          </div>
          <div>
            <span className="bold">Session: </span>
            {this.props.selectedPerson.sessions.length !== 0 ? <img src={check} alt="check" className="person-check"/> : null}
          </div>
          <div>
            <span className="bold">Admin: </span>
            {this.props.selectedPerson.role === 'admin' ? <img src={check} alt="check" className="person-check"/> : null}
          </div>
          <div>
            <span className="bold">Regular spot: </span>
            {spotListToString(this.props.selectedPerson.ownedParkingSpots)}
          </div>

        </div>

        <div className="flex-column person-history-container">
          <span className="bold">Reservation history</span>
          <div className="table-container">
            <table className="person-table">
              <thead>
                <tr>
                
                  <th>Date</th>
                  <th>Spot</th>
                </tr>
              </thead>
              <tbody>
              {pastReservations.length ? pastReservations : this.renderNoReservationsRow(2)}
              </tbody>
            </table>
          </div>
          
        </div>

        <div className="flex-column person-future-reservation-container">
          <span className="bold">Future reservations</span>
          <div className="table-container">
            <table className="person-table">
              <thead>
                <tr>
                  <th>{}</th>
                  <th>Date</th>
                  <th>Spot</th>
                </tr>
              </thead>
              <tbody>
                {futurereservations.length ? futurereservations : this.renderNoReservationsRow(3)}
              </tbody>
            </table>
          </div>
          <button 
            className="button person-button person-free-selected-spots-button" 
            onClick={this.handleDeleteReservationsClick}
            disabled={!hasSelectedReservations}
          > 
            Remove reservations
          </button>
        </div>

      </div>
      <div className="flex-row person-button-container">
        {adminButton}
        {sessionButton}
        {parkingSpotButton}
        {passwordButton}
      </div>

      {changepasswordModal}
      {giveSpotModal}
      <Snackbar 
        open={this.props.snackBarMessagePersons !== ''}
        anchorOrigin={snackLocation}
        message={<span>{this.props.snackBarMessagePersons}</span>}
        onClose={this.props.closeSnackBar}
        autoHideDuration={3000}
       
      />
      <Snackbar 
        open={this.props.snackBarMessageReservations !== ''}
        anchorOrigin={snackLocation}
        message={<span>{this.props.snackBarMessageReservations}</span>}
        onClose={this.props.hideReservationsSnackBar}
        autoHideDuration={3000}
       
      />
      <Snackbar 
        open={this.props.snackBarMessageParkingSpots !== ''}
        anchorOrigin={snackLocation}
        message={<span>{this.props.snackBarMessageParkingSpots}</span>}
        onClose={this.props.hideParkingSpotSnackBar}
        autoHideDuration={3000}
       
      />

    </div>   

    );
    if (this.props.loadingPersons || this.props.loadingReservations || this.props.loadingParkingSpots) {
      page = <Spinner/>;
    }
  
    return (
      <>
      {page}
      </>
                
    );
  }

  renderNoReservationsRow(colspan: number) {
    return (
      <tr>
        <td colSpan={colspan}>No reservations</td>
      </tr>
    );
  }
}
const mapState = (state: AppState) => {
  return {
    loadingParkingSpots: state.parkingSpot.loading,
    loadingPersons: state.persons.loading,
    loadingReservations: state.reservations.loading,
    parkingSpots: state.parkingSpot.parkingSpotList,
    selectedPerson: state.persons.selectedPerson,
    snackBarMessageParkingSpots: state.parkingSpot.snackBarMessage,
    snackBarMessagePersons: state.persons.snackBarMessage,
    snackBarMessageReservations: state.reservations.snackBarMessage,
    userReservations: state.reservations.userReservations,
  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {
   changeOwner: (id: string, name: string, newOwner: string, type: string) => dispatch(changeOwner(id, name, newOwner, type)),
   closeSnackBar: () => dispatch(hidePersonsSnackBar()),
   deletereservations: (id: string, dates: string, type: string) => dispatch(deleteReservations(id, dates, type)),
   freePersonSpot: (spotId: string, spotName: string, personId: string) => dispatch(freeSpot(spotId, spotName, personId)),
   getData: (id: string) => dispatch(getPerson(id)),
   getParkingSpots: () => dispatch(getParkingSpots()),
   getUserReservations: (id: string) => dispatch(getUserReservations(id)),
   hideParkingSpotSnackBar: () => dispatch(closeParkingSpotsSnackBar()),
   hideReservationsSnackBar: () => (dispatch(hideReservationsSnackBar())),
   killSession: (id: string) => dispatch(killSession(id)),
   modifyPerson: (person: IPerson, type: string) => dispatch(modifyPerson(person, type)),
   setDeleteReservationsNumber: (reservationsnumber: number) => dispatch(SetDeletereservationNumber(reservationsnumber)),
   startLoadingDeletereservations: () => dispatch(startLoading()),
  
  };
};

export default connect(mapState, MapDispatch)(Person);
