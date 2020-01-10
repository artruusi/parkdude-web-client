import { Reducer } from "redux";

import { ParkingSpotState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: ParkingSpotState = {

  parkingSpotList: [],
  snackBarMessage: '',

};

export const parkingSpotReducer: Reducer<ParkingSpotState, any> = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.GETSPOTS:

      return {
        parkingSpotList: action.payload.data,
        snackBarMessage: state.snackBarMessage,
        
      };

    case actionTypes.DELETESPOT:
      const newParkingSpotlist = state.parkingSpotList.filter(spot => spot.id !== action.payload);
      const snackBarMessage = state.snackBarMessage !== 'Parking spot delete failed' ? 'Parking spot deleted succesfully' : 'Parking spot delete failed';
      return {
        parkingSpotList: newParkingSpotlist,
        snackBarMessage,
      };  

    case actionTypes.HIDEPARKINGSPOTSNACKBAR:
      return {
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: '',
      };

    case actionTypes.PARKINGSPOTCREATED:
      return {
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: 'Parking spot created succesfully',
      };

    case actionTypes.GETSPOTSFAILED:
      return {
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: 'fetching parking spots from server failed',
      };

    case actionTypes.PARKINGSPOTCREATEDFAILED:
      return {
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: 'Creating parking spot failed',
      };

    case actionTypes.DELETESPOTFAILED:
      return {
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: 'Parking spot delete failed',
      };

    case actionTypes.CHANGEOWNER:
      return {
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: 'Owner changed succesfully',
      };

    case actionTypes.CHANGEOWNERFAILED:
      return {
        parkingSpotList: state.parkingSpotList,
        snackBarMessage: 'Failed to change owner',
      };
    default:
      return state;

  }

};
