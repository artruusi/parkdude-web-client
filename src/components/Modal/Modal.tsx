import React, { Component, ChangeEvent, ReactNode } from 'react';
import './Modal.css';
import { connect } from 'react-redux';
import {  Dispatch, CreateParkingSpotData, IPerson } from './../../store/types';
import {createParkingSpot, changeOwner} from './../../store/actions/parkingSpotActions';
import { FormControl, MenuItem, InputLabel, Select } from '@material-ui/core';

interface OwnModalProps {

  close: () => void;
  type: string;
  deleteObjectNumber?: number;
  confirmDelete?: () => void;
  persons?: IPerson [];
  spotId?: string;
  spotname?: string;

}

interface ReduxModalprops {
  createParkingSpot: (data: CreateParkingSpotData) => void;
  changeOwner: (id: string, name: string, newOwner: string) => void;
}

type ModalProps = OwnModalProps & ReduxModalprops;

interface ModalState {
  spotNumberInput: string;
  selectedSpotOwner: string;
}

class ModalDelete  extends Component<ModalProps, ModalState> {

  state = {
    selectedSpotOwner: '',
    spotNumberInput: '',
  };

  handleSpotNumber = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({spotNumberInput: event.target.value});
    // console.log('new value: ' + event.target.value);
  }

  createNewSpot = () => {

    const ownerEmail = this.state.selectedSpotOwner !== '' ? this.state.selectedSpotOwner : null; 
   
    const data = {   
      name: this.state.spotNumberInput,
      ownerEmail,    
    };
    console.log(data);
    this.props.createParkingSpot(data);
    this.props.close();
  }

  changeOwner = () => {
    console.log('owner');
    console.log(this.props.spotId);
    this.props.changeOwner(this.props.spotId as string, this.props.spotname as string, this.state.selectedSpotOwner);
    this.props.close();
  }

  handleSpotOwnerChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: ReactNode) => {

    const value: string = event.target.value as string;
    this.setState({selectedSpotOwner: value});
    console.log(value);
  }

  render() {

    let content;

    if (this.props.type.includes('delete') ) {
      let deleteObjec = '';

      if (this.props.type === 'delete-persons') {
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

      const persons = (this.props.persons || []).map(person => <MenuItem key={person.id} value={person.email}>{person.name}</MenuItem>);
      console.log(persons);

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
          
          <FormControl >
            <InputLabel >Select Owner</InputLabel>
            <Select className="modal-select" value={this.state.selectedSpotOwner} onChange={this.handleSpotOwnerChange}>
              {persons}
            </Select>
          </FormControl>

          <div id="modal-button-container">      
            <button className="button" id="modal-cancel-button" onClick={this.props.close}>Cancel</button>
            <button className="button" id="modal-add-spot-button" onClick={this.createNewSpot}>Create</button>
          </div>

        </div>
      );
    } else if (this.props.type === 'changeOwner') {

      const persons = (this.props.persons || []).map(person => <MenuItem key={person.id} value={person.email}>{person.name}</MenuItem>);
      content = (
        <div id="modal" className="flex-column-center modal-change-owner">
          <h3>Select a new owner</h3>

          <FormControl >
            <InputLabel >Select Owner</InputLabel>
            <Select className="modal-select" value={this.state.selectedSpotOwner} onChange={this.handleSpotOwnerChange}>
              {persons}
            </Select>
          </FormControl>

          <div id="modal-button-container">      
            <button className="button" id="modal-cancel-button" onClick={this.props.close}>Cancel</button>
            <button className="button modal-accept-button" onClick={this.changeOwner}>Create</button>
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
    changeOwner: (id: string, name: string, newOwner: string) => dispatch(changeOwner(id, name, newOwner)),
    createParkingSpot: (data: CreateParkingSpotData) => dispatch(createParkingSpot(data)),
    
  };
};

export default connect(null, MapDispatch)(ModalDelete);
