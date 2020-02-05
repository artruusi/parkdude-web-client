import { Reducer } from 'redux';

import { ParkingSpotState } from '../types';
import * as actionTypes from '../actions/actionTypes';

const initialState: ParkingSpotState = {
  loading: false,
  parkingSpotList: [],
  snackBarMessage: '',
};

export const parkingSpotReducer: Reducer<ParkingSpotState, any> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.STARTLOADINGPARKINGSPOTS:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GETSPOTS:
      return {
        loading: false,
        parkingSpotList: action.payload.data,
        snackBarMessage: state.snackBarMessage,
      };

    case actionTypes.DELETESPOT:
      const newParkingSpotlist = state.parkingSpotList.filter(
        spot => spot.id !== action.payload,
      );
      const snackBarMessage =
        state.snackBarMessage !== 'Parking spot delete failed'
          ? 'Parking spot deleted succesfully'
          : 'Parking spot delete failed';
      return {
        loading: state.loading,
        parkingSpotList: newParkingSpotlist,
        snackBarMessage,
      };

    case actionTypes.HIDEPARKINGSPOTSNACKBAR:
      return {
        loading: state.loading,
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: '',
      };

    case actionTypes.PARKINGSPOTCREATED:
      return {
        loading: state.loading,
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: 'Parking spot created succesfully',
      };

    case actionTypes.GETSPOTSFAILED:
      return {
        ...state,
        snackBarMessage: 'Fetching parking spots from server failed',
      };

    case actionTypes.PARKINGSPOTCREATEDFAILED:
      return {
        ...state,
        snackBarMessage: action.payload || 'Creating parking spot failed',
      };

    case actionTypes.DELETESPOTFAILED:
      return {
        ...state,
        snackBarMessage: action.payload || 'Parking spot delete failed',
      };

    case actionTypes.CHANGEOWNER:
      return {
        ...state,
        loading: false,
        snackBarMessage: 'Owner changed succesfully',
      };

    case actionTypes.CHANGEOWNERFAILED:
      return {
        ...state,
        snackBarMessage: action.payload || 'Failed to change owner',
      };
    default:
      return state;
  }
};
