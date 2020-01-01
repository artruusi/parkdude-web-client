import React, {Component, ChangeEvent } from 'react';
import { AppState, Dispatch, IPerson } from '../../store/types';
import { connect } from 'react-redux';
import { modifyPerson } from '../../store/actions/personsActions';

interface SelectedRows {
  [key: string]: boolean;
}

interface ReduxAcceptUserProps {
  persons: IPerson [];
  acceptPerson: (person: IPerson, type: string) => void;
}

type AcceptUserProps = {} & ReduxAcceptUserProps;

interface AcceptUserState {
  showAcceptModal: boolean;
  selectedRows: SelectedRows; 
}
class AcceptUsers extends Component<AcceptUserProps, AcceptUserState> {

  state = {
    selectedRows: {} as SelectedRows,
    showAcceptModal: false,
  };

  acceptPersons = () => {
    Object.keys(this.state.selectedRows).forEach(row => {
      if (this.state.selectedRows[row]) {

        const index = this.props.persons.findIndex( person => person.id === row);     
        this.props.acceptPerson(this.props.persons[index], 'accept-user');
      }
     
    });

  }

  handleCheckBoxClick = (event: ChangeEvent<HTMLInputElement>) => {
   
    const value: string = event.target.value;
    const oldvalue = this.state.selectedRows[value];
    const newSelectedRows = {...this.state.selectedRows};

    if (typeof oldvalue === "undefined") {
     
      newSelectedRows[value] = true;
      this.setState({selectedRows: newSelectedRows});
      
    } else {
     
      newSelectedRows[value] = !newSelectedRows[value];
      this.setState({selectedRows: newSelectedRows});

    }
  }
  render() {

    const header = 'Accept users';
    const acceptButton = <button id="table-view-accept-button" className="button" onClick={this.acceptPersons}>Accept selected</button>;

    const tableHeader = (
      <tr>
        <th>{}</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    );

    const content = this.props.persons.map((item) => {
      if ( item.role === 'unverified') {
        return (

          <tr key={item.id}>
            <td><input type="checkbox" value={item.id} onChange={this.handleCheckBoxClick}/></td>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>

        );
      } else {return null; }
     
    });

    return (
      <div id="table-view">
              
        <div id="table-view-header-container" className="flex-row">
          <h2>{header} </h2>
          
        </div>

        <div id="table-view-table-container">
          <table id="table-view-table">

            <thead>
              {tableHeader}
            </thead>

            <tbody>
              {content}
            </tbody>
                                  
          </table>
       
        </div>

        <div id="table-view-delete-button-container" className="flex-row">
          {acceptButton}
        </div>      
      
      </div>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    persons: state.persons.personList,
  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {
    acceptPerson: (person: IPerson, type: string) => dispatch(modifyPerson(person, type)),
  };
};
export default connect(mapState, MapDispatch)(AcceptUsers);
