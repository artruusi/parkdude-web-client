import React, { Component } from 'react';

import './Modal.css';

interface DeleteModalProps {

  close: () => void;
  type: string;

}

class ModalDelete  extends Component<DeleteModalProps, {}> {

  render() {

    let content;

    if (this.props.type === 'delete') {

      content = (

        <div id="modal" className="flex-column-center modal-delete">
          <h3>Delete Users</h3>
          <p>Are you sure you want to permanently delete 1 users?</p>

          <div id="modal-button-container">      
            <button className="button" id="modal-cancel-button" onClick={this.props.close}>Cancel</button>
            <button className="button" id="modal-yes-button">Yes</button>
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
        
        <div id="modal" className="flex-column-center modal-add-user">

          <h3>Create a new parking spot</h3>

          <input type="text" placeholder="Number" className="modal-input"/>
          <input type="text" placeholder="Select owner" className="modal-input"/>

           <div id="modal-button-container">      
            <button className="button" id="modal-cancel-button" onClick={this.props.close}>Cancel</button>
            <button className="button" id="modal-add-spot-button">Create</button>
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

export default ModalDelete;
