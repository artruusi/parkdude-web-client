import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import './TableView.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

class TableView  extends Component<{}, {}> {

    render() {

        const rows = [{session: false, userName: "Teemu", email: 'tp@gmail.com', spot: 12}, 
                     {session: true, userName: "Mika", email: 'mk@gmail.com', spot: 13}];

        return (
           <div className="flex-column" id="table-view">

               <div className="flex-row" id="table-view-create-user-button-container">
                   <Button variant="contained"  id="table-view-create-user-button">Create user</Button>
               </div>

               <div id="table-view-table-container" className="flex-column-center">

                    <Paper id="table-view-paper">
                        <Table id="table-view-table" aria-label="simple table">
                            <TableHead>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="right">Session</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Parking spot</TableCell>
                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {rows.map(row => (
                                <TableRow key={row.userName}>
                                    <TableCell component="th" scope="row">
                                        <Checkbox/>
                                    </TableCell>
                                    <TableCell align="right">session</TableCell>
                                    <TableCell align="right">{row.userName}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.spot}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </Paper>
               </div>
               <div className="flex-row" id="table-view-delete-user-button-container">
               <Button variant="contained" id="table-view-delete-user-button">Delete selected</Button>
               </div>
           </div>
        );
    }
}
export default TableView;
