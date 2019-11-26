import React, {Component} from 'react';
import './TableView.css';
import Modal from './../Modal/Modal';

interface TableViewState {
    showModal: boolean;
}

class TableView  extends Component<{}, TableViewState> {

    state = {
        showModal: false,
    };

    openModal = () => {
        this.setState({showModal: true});
    }
    closeModal = () => {
        this.setState({showModal: false});
    }

    render() {

        const modal = this.state.showModal ? <Modal close={this.closeModal}/> : null;

        return(
            <div id="table-view">
                <div id="table-view-header-container" className="flex-row">
                    <h2> Employees</h2>
                    <button id="table-view-add-user" className="button"> Add user</button>
                </div>
                <div id="table-view-table-container">
                    <table id="table-view-table">
                        <thead>
                            <tr>
                                <th>{}</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Parking spot</th>
                                <th>Usage statistic</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Harri Rajala</td>
                                <td>harri.rajala@innogiant.com</td>
                                <td>No</td>
                                <td>12</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Harri Rajala</td>
                                <td>harri.rajala@innogiant.com</td>
                                <td>No</td>
                                <td>12</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Harri Rajala</td>
                                <td>harri.rajala@innogiant.com</td>
                                <td>No</td>
                                <td>12</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Harri Rajala</td>
                                <td>harri.rajala@innogiant.com</td>
                                <td>No</td>
                                <td>12</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Harri Rajala</td>
                                <td>harri.rajala@innogiant.com</td>
                                <td>No</td>
                                <td>12</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>Harri Rajala</td>
                                <td>harri.rajala@innogiant.com</td>
                                <td>No</td>
                                <td>12</td>
                                <td>1</td>
                            </tr>

                        </tbody>
                                           
                    </table>
                </div>
                <div id="table-view-delete-button-container" className="flex-row">
                    <button id="table-view-delete-button" className="button" onClick={this.openModal}>Delete selected</button>
                </div>
                {modal}
            </div>
        );
   
    }

}

export default TableView;
