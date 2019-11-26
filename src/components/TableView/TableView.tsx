import React, {Component} from 'react';
import './TableView.css';

class TableView  extends Component<{}, {}> {

    render() {

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
                    <button id="table-view-delete-button" className="button">Delete selected</button>
                </div>
            </div>
        );
   
    }

}

export default TableView;
