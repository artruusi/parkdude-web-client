import React, {Component, ChangeEvent, ReactNode } from 'react';
import { AppState, Dispatch, IPerson, Reservation } from '../../store/types';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './Reservations.css';
import { MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { getReservations, clearReservations } from '../../store/actions/reservationsActions';
import { getPersons } from '../../store/actions/personsActions';

interface ReservationsState {
  startDate: Date | null;
  endDate: Date | null;
  person: string;

}

interface ReduxReservationsProps {
  clearReservations: () => void;
  getPersons: () => void;
  persons: IPerson [];
  reservations: Reservation [];
  makeSearch: (startDate: string, endDate: string, person: string) => void;
 }

type ReservationsProps = {} & ReduxReservationsProps;

class Reservations extends Component<ReservationsProps, ReservationsState> {

  state = {
    endDate: new Date(),
    person: '',
    startDate: new Date(),
  };

  handleStartDayChange = (date: Date | null) => {
    console.log(date);
    this.setState({startDate: date});
  }
  handleEndDayChange = (date: Date | null) => {
    console.log(date);
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
      console.log(queryStartDay);
    }
    this.props.makeSearch(queryStartDay, queryEndDay, '');
  }
  componentDidMount() {
    this.props.getPersons();
    this.props.clearReservations();
  }
  
  render() {
    const persons = (this.props.persons || []).map(person => <MenuItem key={person.id} value={person.email}>{person.name}</MenuItem>);
    const content: JSX.Element [] = [];
    this.props.reservations.forEach(row => {
      row.spacesReservedByUser.forEach(reservation => {
 
        const element = (
          <tr key={reservation.id}>
            <td><input type="checkbox"/></td>
            <td>{row.date}</td>
            <td>{reservation.name}</td>
          </tr>
        );
        content.push(element);
      });
    });

    const resultTable = this.props.reservations.length !== 0
      ? (
        <div id="persons-table-container">
          <table id="persons-table">

            <thead>
              <tr>
                <th>{}</th>
                <th>Date</th>
                <th>Spot</th>
              </tr>
            </thead>

            <tbody>
              {content}
            </tbody>
                                  
          </table>
    
        </div>
      )
      : null;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="flex-column" id="search-reservation-container">
          <h3>Search reservations</h3>
          <div className="flex-row search-reservations-input-container">
            <div id="date-picker-start-day">
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
          
            <div id="date-picker-end-day">
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
            <div id="reservations-person-drop-down">
              <FormControl >
                <InputLabel >Person</InputLabel>
                <Select className="reservations-select" value={this.state.person} onChange={this.handlePersonChange}>
                  {persons}
                </Select>
              </FormControl>

            </div>
            
            <button className="button" id="table-search-reservations-button" onClick={this.handleButtonClick}>Search</button>
          </div>
          {resultTable}
        </div>
    </MuiPickersUtilsProvider>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    persons: state.persons.personList,
    reservations: state.reservations.reservations,
  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {
    clearReservations: () => dispatch(clearReservations()),
    getPersons: () => dispatch(getPersons()),
    makeSearch : (startDate: string, endDate: string, person: string) => dispatch(getReservations(startDate, endDate, person)),
  };
};
export default connect(mapState, MapDispatch)(Reservations);
