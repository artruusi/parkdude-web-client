import { Reducer } from "redux";

import { ParkingSpotState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: ParkingSpotState = {

  parkingSpotList: [{id: '1', number: 12, permanent: true, owner: '123', ownerName: 'Harri'},
    {id: '2', number: 122, permanent: true, owner: '123', ownerName: 'Esko'},
    {id: '3', number: 1, permanent: true, owner: '123', ownerName: 'Teemu'},
    {id: '14', number: 4, permanent: false, owner: '123', ownerName: 'Pertti'}],
  selectedSpotIndex: -1,

};

export const parkingSpotReducer: Reducer<ParkingSpotState, any> = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.GETSPOTS:
      return {
        parkingSpotList: action.payload,
        selectedSpotIndex: -1,
      };

    default:
      return state;

  }

};
