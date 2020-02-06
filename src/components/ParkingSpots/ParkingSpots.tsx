import React, { Component, ChangeEvent } from 'react';
import { AppState, Dispatch, ParkingSpot, IPerson } from '../../store/types';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';

import checkIcon from './../../img/ic_check.svg';
import { getParkingSpots, deleteParkingSpot, closeParkingSpotsSnackBar } from '../../store/actions/parkingSpotActions';

import './ParkingSpots.css';
import { getPersons } from '../../store/actions/personsActions';
import { SnackbarOrigin, Snackbar, Checkbox } from '@material-ui/core';
import Spinner from '../Spinner/Spinner';

interface ListButtonProps {
  id: string;
  name: string;
  openChangeOwnerModalWithParams: (id: string, name: string) => void;
}
// should provide faster rendering
const ListButton = (props: ListButtonProps) => {
  const handleClick = () => {
    props.openChangeOwnerModalWithParams(props.id, props.name);
  };
  return (
    <button className='button table-button accept-button' onClick={handleClick}>Change owner</button>

  );
};

interface SelectedRows {
  [key: string]: boolean;
}

interface OwnParkingSpotsProps {
  type?: string;
}
interface ReduxParkingSpotsProps {
  closeSnackBar: () => void;
  getParkingSpots: () => void;
  loading: boolean;
  parkingSpots: ParkingSpot[];
  persons: IPerson[];
  deleteParkingSpot: (id: string) => void;
  getPersons: () => void;
  snackBarMessage: string;
}

type ParkingSpotsProps = OwnParkingSpotsProps & ReduxParkingSpotsProps;

interface ParkingspotSate {
  showAddSpotModal: boolean;
  showChangeOwnerModal: boolean;
  showDeleteModal: boolean;
  selectedRows: SelectedRows;
  clickedSpotName: string;
  clickedSpotId: string;
}

class Parkingspots extends Component<ParkingSpotsProps, ParkingspotSate> {

  state = {
    clickedSpotId: '',
    clickedSpotName: '',
    selectedRows: {} as SelectedRows,
    showAddSpotModal: false,
    showChangeOwnerModal: false,
    showDeleteModal: false,

  };

  openAddSpotModal = () => {
    this.setState({ showAddSpotModal: true });
  }

  closeAddSpotModal = () => {
    this.setState({ showAddSpotModal: false });
  }

  openDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  }
  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  }
  openChangeOwnerModal = () => {
    this.setState({ showChangeOwnerModal: true });
  }
  openChangeOwnerModalWithParams = (id: string, name: string) => {
    const newState = {
      clickedSpotId: id,
      clickedSpotName: name,
      showChangeOwnerModal: true,
    };
    this.setState(newState);
  }
  closechangeOwnerModal = () => {
    this.setState({ showChangeOwnerModal: false });
  }

  handleCheckBoxClick = (event: ChangeEvent<HTMLInputElement>) => {

    const value: string = event.target.value;
    const oldvalue = this.state.selectedRows[value];
    const newSelectedRows = { ...this.state.selectedRows };

    if (typeof oldvalue === 'undefined') {

      newSelectedRows[value] = true;
      this.setState({ selectedRows: newSelectedRows });

    } else {

      newSelectedRows[value] = !newSelectedRows[value];
      this.setState({ selectedRows: newSelectedRows });

    }
  }

  deleteParkingSpots = () => {
    this.closeDeleteModal();

    Object.keys(this.state.selectedRows).forEach(row => {
      if (this.state.selectedRows[row]) {
        this.props.deleteParkingSpot(row);
      }

    });

  }

  componentDidMount() {
    this.props.getParkingSpots();
    this.props.getPersons();
  }

  componentDidUpdate(prevProps: ParkingSpotsProps) {
    if (prevProps.parkingSpots !== this.props.parkingSpots) {
      const parkingSpotIds = new Set(...this.props.parkingSpots.map(parkingSpot => parkingSpot.id));
      const filteredSelection = Object.entries(this.state.selectedRows).filter(([id]) => parkingSpotIds.has(id));
      this.setState({ selectedRows: Object.fromEntries(filteredSelection) });
    }
  }

  render() {
    const deleteObjectNumber: number = Object.keys(this.state.selectedRows).reduce((acc, row) => {
      if (this.state.selectedRows[row]) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const addButton = <button className='button parking-spots-add-user accept-button' onClick={this.openAddSpotModal}>Add</button>;
    const addSpotModal = this.state.showAddSpotModal
      ? <Modal close={this.closeAddSpotModal} type='addSpot' persons={this.props.persons} />
      : null;
    const changeOwnerModal = this.state.showChangeOwnerModal
      ? (
        <Modal
          close={this.closechangeOwnerModal}
          type='changeOwner'
          persons={this.props.persons}
          spotId={this.state.clickedSpotId}
          spotname={this.state.clickedSpotName}
        />
      )
      : null;
    const deleteModal = this.state.showDeleteModal
      ? (
        <Modal
          close={this.closeDeleteModal}
          confirmDelete={this.deleteParkingSpots}
          type='delete-spots'
          deleteObjectNumber={deleteObjectNumber}
        />
      )
      : null;
    const deleteButton = (
      <button
        className='button parking-spots-delete-button'
        onClick={this.openDeleteModal}
        disabled={!deleteObjectNumber}
      >
        Delete
      </button>
    );

    const tableHeader = (
      <tr>
        <th>{}</th>
        <th>Number</th>
        <th>Regular spot</th>
        <th>Owner</th>
        <th className='change-owner-column'>{}</th>
      </tr>
    );

    const content = this.props.parkingSpots.map(item => (

      <tr key={item.id}>
        <td>
          <Checkbox
            onChange={this.handleCheckBoxClick}
            value={item.id}
            style={{ color: '#544C09' }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </td>

        <td>{item.name}</td>
        <td>{item.owner ? <img src={checkIcon} className='table-check' alt='check icon' /> : null}</td>
        <td>{item.owner ? item.owner.name : null}</td>
        <td className='textRight'>
          <ListButton name={item.name} id={item.id} openChangeOwnerModalWithParams={this.openChangeOwnerModalWithParams} />
        </td>
      </tr>

    ));

    const snackLocation: SnackbarOrigin = {
      horizontal: 'center',
      vertical: 'bottom',
    };

    let page = (
      <div className='parking-spots'>

        <div className='flex-row parking-spots-header-container'>
          <h2>Parking spots </h2>
          {addButton}

        </div>

        <div className='table-container'>
          <table className='table'>

            <thead>
              {tableHeader}
            </thead>

            <tbody>
              {content}
            </tbody>

          </table>

        </div>

        <div className='flex-row align-left-button-container parking-spots-delete-button-container'>
          {deleteButton}
        </div>

        {addSpotModal}
        {deleteModal}
        {changeOwnerModal}

        <Snackbar
          className='delete-snack'
          open={this.props.snackBarMessage !== ''}
          anchorOrigin={snackLocation}
          message={<span>{this.props.snackBarMessage}</span>}
          onClose={this.props.closeSnackBar}
          autoHideDuration={3000}

        />

      </div>
    );

    if (this.props.loading) {
      page = <Spinner />;
    }

    return (

      <>
        {page}
      </>
    );
  }
}

const mapState = (state: AppState) => {
  return {
    loading: state.parkingSpot.loading,
    parkingSpots: state.parkingSpot.parkingSpotList,
    persons: state.persons.personList,
    snackBarMessage: state.parkingSpot.snackBarMessage,

  };
};

const MapDispatch = (dispatch: Dispatch) => {
  return {
    closeSnackBar: () => dispatch(closeParkingSpotsSnackBar()),
    deleteParkingSpot: (id: string) => dispatch(deleteParkingSpot(id)),
    getParkingSpots: () => dispatch(getParkingSpots()),
    getPersons: () => dispatch(getPersons()),

  };
};
export default connect(mapState, MapDispatch)(Parkingspots);
