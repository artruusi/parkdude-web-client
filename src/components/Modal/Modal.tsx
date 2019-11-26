import React, { Component } from 'react';

interface ModalProps {

    close: () => void;

}

class Modal  extends Component<ModalProps, {}> {

    render() {
        return (
            <div id="modal-container">
                <div id="modal" className="flex-column-center">
                    <h3>Delete Users</h3>
                    <p>Are you sure you want to permanently delete 1 users?</p>
                    <div id="modal-button-container">
                        <button className="button" id="modal-cancel-button" onClick={this.props.close}>Cancel</button>
                        <button className="button" id="modal-yes-button">Yes</button>
                    </div>
                    
                </div>
            </div>
        );
    }

}

export default Modal;
