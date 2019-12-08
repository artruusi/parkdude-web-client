import React, { Component } from 'react';
import Header from './../Header/Header';
import './Layout.css';
import TableView from './../TableView/TableView';
import Person from './../Person/Person';

interface LayoutProps {
  page?: string;
}

class Layout extends Component<LayoutProps, {}> {

  render() {

    console.log(this.props.page);
    let content;

    if (this.props.page === 'employee') {
      content = <Person/>;

    } else if (this.props.page === 'customers') {
      content = <TableView type="customers"/>;

    } else if (this.props.page === 'employees') {
      content = <TableView type="employees"/>;

    } else if (this.props.page === 'parking-spots') {
      content = <TableView type="parking-spots"/>;

    } else if (this.props.page === 'accept-users') {
      content = <TableView type="accept-users"/>;
    }

    return (
      <div id="layout" className="flex-column">
        <Header/>
        {content}
      </div>
  );
  }
}

export default Layout;
