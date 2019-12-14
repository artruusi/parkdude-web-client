import { Reducer } from "redux";

import { ParkingSpotState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: ParkingSpotState = {

  parkingSpotList: [],
  selectedSpotIndex: -1,

};

export const parkingSpotReducer: Reducer<ParkingSpotState, any> = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.GETSPOTS:

      return {
        parkingSpotList: action.payload.data,
        selectedSpotIndex: -1,
      };

    default:
      return state;

  }

};
