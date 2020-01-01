import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Person.css';

import check from './../../img/ic_check.svg';
import { AppState, Dispatch, IPerson } from '../../store/types';
import { getPerson, modifyPerson, killSession } from '../../store/actions/personsActions';

interface ReduxPersonProps {
  selectedPerson: IPerson;
  getData: (id: string) => void;
  killSession: (id: string) => void;
  modifyPerson: (person: IPerson, type: string) => void;
}

type PersonProps = {} & ReduxPersonProps;

interface PersonState {
  showModal: boolean;
}
class Person extends Component<PersonProps, PersonState> {

  state = {
    showModal: false,  
  };

  componentDidMount() {
    const path = window.location.pathname;
    const pathSplit = path.split('/');
    const id = pathSplit[2];
    console.log(id);
    this.props.getData(id);
    
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
 
  render() {

    const adminButton = this.props.selectedPerson.role === 'admin' 
      ? <button onClick={this.undoAdmin} className="button person-button">undo Admin</button> 
      : <button onClick={this.makeAdmin} className="button person-button">Make admin</button>;
    
    const sessionButton = this.props.selectedPerson.sessions.length !== 0
      ? <button className="button person-button" onClick={this.killSession}>Kill sesssion</button>
      : null;
    return (
      <div id="person" className="flex-column">
        <div className="flex-row" id="person-header-container">
        <h2>{this.props.selectedPerson.name}</h2>
         
        </div>

        <div className="flex-row" id="person-delete-button-container">
          <button className="button" id="person-delete-button">Delete user</button>
        </div>

        <div className="flex-row" id="person-content-wrapper">
          <div id="person-info-container">
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
              <span className="bold">Regular spot</span>
            </div>

          </div>

          <div className="flex-column" id="person-history-container">
            <span className="bold">Reservation history</span>
           
              <table className="person-table">
              <thead>
                <tr>
                 
                  <th>Date</th>
                  <th>Spot</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 
                  <td>1.1.2222</td>
                  <td>2</td>
                </tr>
                 <tr>
                  
                  <td>1.1.2222</td>
                  <td>2</td>
                </tr>
                 <tr>
          
                  <td>1.1.2222</td>
                  <td>2</td>
                </tr>

              </tbody>
            </table>
            
          </div>

          <div id="person-future-reservation-container" className="flex-column">
            <span className="bold">Future reservations</span>
            <table className="person-table">
              <thead>
                <tr>
                  <th>{}</th>
                  <th>Date</th>
                  <th>Spot</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td><input type="checkbox"/></td>
                  <td>1.1.2222</td>
                  <td>2</td>
                </tr>
                 <tr>
                  <td><input type="checkbox"/></td>
                  <td>1.1.2222</td>
                  <td>2</td>
                </tr>
                 <tr>
                   <td><input type="checkbox"/></td>
                  <td>1.1.2222</td>
                  <td>2</td>
                </tr>

              </tbody>
            </table>
            <button className="button person-button " id="person-free-selected-spots-button"> Free selected spots</button>
          </div>

        </div>
        <div id="person-button-contaier" className="flex-row">
          {adminButton}
          {sessionButton}
          <button className="button person-button">Reserve regular spot</button>
          <button className="button person-button">Change password</button>
        </div>

      </div>
                
    );
  }
}
const mapState = (state: AppState) => {
  return {
    selectedPerson: state.persons.selectedPerson,
  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {
   getData: (id: string) => dispatch(getPerson(id)),
   killSession: (id: string) => dispatch(killSession(id)),
   modifyPerson: (person: IPerson, type: string) => dispatch(modifyPerson(person, type)),
  
  };
};

export default connect(mapState, MapDispatch)(Person);
