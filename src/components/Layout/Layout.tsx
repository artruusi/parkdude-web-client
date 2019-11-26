import React, { Component } from 'react';
import Header from './../Header/Header';
import './Layout.css';
import TableView from './../TableView/TableView';

class Layout extends Component<{}, {}> {

    render() {
        return (
            <div id="layout" className="flex-column">
              <Header/>
              <TableView/>
            </div>
        );
    }
}

export default Layout;
