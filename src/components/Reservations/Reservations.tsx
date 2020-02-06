import React, {Component, ChangeEvent, ReactNode } from 'react';
import { AppState, Dispatch, IPerson, Reservation } from '../../store/types';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './Reservations.css';
import { MenuItem, FormControl, InputLabel, Select, Checkbox, Snackbar, SnackbarOrigin } from '@material-ui/core';
import { getReservations, clearReservations, hideReservationsSnackBar, SetDeletereservationNumber, startLoading, deleteReservations } from '../../store/actions/reservationsActions';
import { getPersons } from '../../store/actions/personsActions';

interface ReservationsState {
  startDate: Date | null;
  endDate: Date | null;
  person: string;
  selectedRows: SelectedRows; 

}

interface SelectedRows {
  [key: string]: boolean;
}

interface ReduxReservationsProps {
  clearReservations: () => void;
  closeSnackBar: () => void;
  deletereservations: (id: string, dates: string, type: string) => void;
  getPersons: () => void;
  persons: IPerson [];
  reservations: Reservation [];
  makeSearch: (startDate: string, endDate: string, person: string) => void;
  snackBarMessage: string;
  startLoadingDeletereservations: () => void;
  setDeleteReservationsNumber: (reservationsnumber: number) => void;
 }

type ReservationsProps = {} & ReduxReservationsProps;

class Reservations extends Component<ReservationsProps, ReservationsState> {

  state = {
    endDate: new Date(),
    person: '',
    selectedRows: {} as SelectedRows,
    startDate: new Date(),
    
  };

  handleStartDayChange = (date: Date | null) => {

    this.setState({startDate: date});
  }
  handleEndDayChange = (date: Date | null) => {
 
    this.setState({endDate: date});
  }
  handlePersonChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => {
    const value: string = event.target.value as string;
    this.setState({person: value});
  }
  handleButtonClick = () => {
    let queryStartDay = '';
    let queryEndDay = '';
    if (this.state.endDate === null && this.state.startDate === null && this.state.person === '') {
      // inputs empty
      return;

    } else if (this.state.endDate !== null && this.state.startDate !== null) {
      queryStartDay = this.state.startDate.toISOString().substring(0, 10);
      queryEndDay = this.state.endDate.toISOString().substring(0, 10);

    }
    this.props.makeSearch(queryStartDay, queryEndDay, this.state.person);
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
  handleDeleteReservationsClick = () => {

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
       this.props.deletereservations(id, date, 'reservationSearch');
      }
     
    });

  }
  componentDidMount() {
    this.props.getPersons();
    this.props.clearReservations();
  }
  
  componentDidUpdate(prevProps: ReservationsProps) {
    if (prevProps.reservations !== this.props.reservations) {
      // Remove deleted reservations from selection
      const reservationKeys = new Set(...this.props.reservations.map(reservation => reservation.parkingSpotId + '&' + reservation.date));
      const filteredSelection = Object.entries(this.state.selectedRows).filter(([key]) => reservationKeys.has(key));
      this.setState({selectedRows: Object.fromEntries(filteredSelection)});
    }
  }

  render() {
    const numberOfSelectedRows = Object
      .values(this.state.selectedRows)
      .filter(value => value)
      .length;
    const persons = (this.props.persons || []).map(person => 
      <MenuItem key={person.id} value={person.id}> {person.name + ' (' + person.email + ')'}</MenuItem>);
       
    persons.unshift(<MenuItem key={'1234567'} value=''>Clear selected person</MenuItem>);

    const content = (this.props.reservations || []).map(reservation => {

      const date = new Date(reservation.date);
      const dateUI = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

      return (
        <tr key={reservation.date + reservation.parkingSpotId}>
          <td>
            <Checkbox
              onChange={this.handleCheckBoxClick}
              value={reservation.parkingSpotId + '&' + reservation.date}
              style={{ color: "#544C09"}}       
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            
          </td>
          <td>{dateUI}</td>
          <td>{reservation.parkingSpotName}</td>
          <td>{reservation.user}</td>
        </tr>
      );
    });
    
    const resultTable = this.props.reservations.length !== 0
      ? (
        <div className="table-container">
          <table className="table">

            <thead>
              <tr>
                <th>{}</th>
                <th>Date</th>
                <th>Spot</th>
                <th>User</th>
              </tr>
            </thead>

            <tbody>
              {content}
            </tbody>
                                  
          </table>
    
        </div>
      )
      : null;

    const snackLocation: SnackbarOrigin = {
        horizontal: 'center',
        vertical: 'bottom',
      };

    const deleteButton = this.props.reservations.length !== 0
    ? (
      <button 
        className="button reservation-delete-button delete-button" 
        onClick={this.handleDeleteReservationsClick}
        disabled={numberOfSelectedRows === 0}
      >
        Delete
      </button>
      )
    : null;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="flex-column search-reservation-container">
          <h3>Search reservations</h3>
          <div className="flex-row search-reservations-input-container">
            <div className="date-picker-start-day">
              <KeyboardDatePicker
                  disableToolbar={true}
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="none"                 
                  label="Start day"
                  value={this.state.startDate}
                  onChange={this.handleStartDayChange}
                  KeyboardButtonProps={{ 'aria-label': 'change date'}}
                          
              />
            </div>
          
            <div className="date-picker-end-day">
              <KeyboardDatePicker
                  disableToolbar={true}
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="none"
                  label="End day"
                  value={this.state.endDate}
                  onChange={this.handleEndDayChange}
                  KeyboardButtonProps={{ 'aria-label': 'change date'}}
                          
              />

            </div>
            <div className="reservations-person-drop-down">
              <FormControl >
                <InputLabel >Person</InputLabel>
                <Select className="reservations-select" value={this.state.person} onChange={this.handlePersonChange}>
                  {persons}
                </Select>
              </FormControl>

            </div>
       
            <button className="button accept-button search-button"  onClick={this.handleButtonClick}>Search</button>
          </div>
          {resultTable}
          <div className="align-left-button-container">
            {deleteButton}
          </div>
          <Snackbar 
            id='delete-snack'
            open={this.props.snackBarMessage !== ''}
            anchorOrigin={snackLocation}
            message={<span>{this.props.snackBarMessage}</span>}
            onClose={this.props.closeSnackBar}
            autoHideDuration={3000}
         
          />
        </div>
    </MuiPickersUtilsProvider>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    persons: state.persons.personList,
    reservations: state.reservations.reservations,
    snackBarMessage: state.reservations.snackBarMessage,
  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {
    clearReservations: () => dispatch(clearReservations()),
    closeSnackBar: () => dispatch(hideReservationsSnackBar()),
    deletereservations: (id: string, dates: string, type: string) => dispatch(deleteReservations(id, dates, type)),
    getPersons: () => dispatch(getPersons()),
    makeSearch : (startDate: string, endDate: string, person: string) => dispatch(getReservations(startDate, endDate, person)),
    setDeleteReservationsNumber: (reservationsnumber: number) => dispatch(SetDeletereservationNumber(reservationsnumber)),
    startLoadingDeletereservations: () => dispatch(startLoading()),
  };
};
export default connect(mapState, MapDispatch)(Reservations);
