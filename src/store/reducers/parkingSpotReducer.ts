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
    default:
      return state;

  }

};
