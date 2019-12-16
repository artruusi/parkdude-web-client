import { Reducer } from "redux";

import { ParkingSpotState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: ParkingSpotState = {

  parkingSpotList: [],

};

export const parkingSpotReducer: Reducer<ParkingSpotState, any> = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.GETSPOTS:

      return {
        parkingSpotList: action.payload.data,
        
      };

    case actionTypes.DELETESPOT:
      const newParkingSpotlist = state.parkingSpotList.filter(spot => spot.id !== action.payload);
      return {
        parkingSpotList: newParkingSpotlist,
      };  
    default:
      return state;

  }

};
