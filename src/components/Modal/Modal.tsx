import React, { Component, ChangeEvent } from 'react';

import './Modal.css';
import { connect } from 'react-redux';
import { AppState, Dispatch, CreateParkingSpotData } from './../../store/types';
import {createParkingSpot} from './../../store/actions/parkingSpotActions';

interface OwnModalProps {

  close: () => void;
  type: string;
  deleteObjectNumber?: number;
  confirmDelete?: () => void;

}

interface ReduxModalprops {
  createParkingSpot: (data: CreateParkingSpotData) => void;
}

type ModalProps = OwnModalProps & ReduxModalprops;

interface ModalState {
  spotNumberInput: string;
}

class ModalDelete  extends Component<ModalProps, ModalState> {

  state = {
    spotNumberInput: '',
  };

  handleSpotNumber = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({spotNumberInput: event.target.value});
  }
  createNewSpot = () => {
    const data = {
      created: new Date().toString(),
      name: this.state.spotNumberInput,
      updated: new Date().toString(),
      user: null,    
    };

    this.props.createParkingSpot(data);
    this.props.close();
  }

  render() {

    let content;

    if (this.props.type.includes('delete') ) {
      let deleteObjec = '';

      if (this.props.type === 'delete-users') {
        if (this.props.deleteObjectNumber === 1) {
          deleteObjec = 'user';
        } else {
          deleteObjec = 'users';
        }
      } else if (this.props.type === 'delete-spots') {
        if (this.props.deleteObjectNumber === 1) {
          deleteObjec = 'parking spot';
        } else {
          deleteObjec = 'parking spots';
        }
      }

      content = (

        <div id="modal" className="flex-column-center modal-delete">
          <h3>Delete Users</h3>
          <p>Are you sure you want to permanently delete {this.props.deleteObjectNumber} {deleteObjec}?</p>

          <div id="modal-button-container">      
            <button className="button" id="modal-cancel-button" onClick={this.props.close}>Cancel</button>
            <button className="button" id="modal-yes-button" onClick={this.props.confirmDelete}>Yes</button>
          </div>

        </div>
        
      );
    } else if (this.props.type === 'addUser') {
      
      content = (

        <div id="modal" className="flex-column-center modal-add-user">
          <h3 className="modal-add-user-header">Add user</h3>

          <input type="text" placeholder="Email" className="modal-input"/>
          <input type="text" placeholder="Name" className="modal-input"/>
          <input type="text" placeholder="password" className="modal-input"/>

          <div id="modal-add-user-button-container">      
            <button className="button" id="modal-cancel-button" onClick={this.props.close}>Cancel</button>
            <button className="button" id="modal-add-user-button">Add user</button>
          </div>

        </div>
      );
    } else if (this.props.type === 'addSpot') {

      content = (
        
        <div id="modal" className="flex-column-center modal-add-spot">

          <h3>Create a new parking spot</h3>

          <input 
            type="text" 
            placeholder="Number" 
            className="modal-input" 
            onChange={this.handleSpotNumber} 
            value={this.state.spotNumberInput}
          />
          <input type="text" placeholder="Select owner" className="modal-input"/>

           <div id="modal-button-container">      
            <button className="button" id="modal-cancel-button" onClick={this.props.close}>Cancel</button>
            <button className="button" id="modal-add-spot-button" onClick={this.createNewSpot}>Create</button>
          </div>

        </div>
      );
    }

    return (
      <div id="modal-container">
        {content}
      </div>
    );
  }

}
const MapDispatch = (dispatch: Dispatch) => {
  return {
    createParkingSpot: (data: CreateParkingSpotData) => dispatch(createParkingSpot(data)),
  };
};

export default connect(null, MapDispatch)(ModalDelete);
