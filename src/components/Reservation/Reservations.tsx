import React, {Component, ChangeEvent } from 'react';
import { AppState, Dispatch } from '../../store/types';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';

import checkIcon from './../../img/ic_check.svg';

class Reservations extends Component<{}, {}> {

  render() {
    return (
      <div id="table-view">
              
        <div id="table-view-header-container" className="flex-row">
          <h2>k </h2>
          
        </div>

        <div id="table-view-table-container">
          <table id="table-view-table">

            <thead>
              k
            </thead>

            <tbody>
              k
            </tbody>
                                  
          </table>
       
        </div>

        <div id="table-view-delete-button-container" className="flex-row">
         k
        </div>      
      
      </div>
    );
  }
}

const mapState = (state: AppState) => {
  return {

  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {

  };
};
export default connect(mapState, MapDispatch)(Reservations);
