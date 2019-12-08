import { Reducer } from "redux";

import { ParkingSpotState, PersonsState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: PersonsState = {
  personList: [],
  selectedPersonIndex: -1,
};

export const personsReducer: Reducer< PersonsState, any> = (state= initialState, action) => {

 switch (action.type) {

   case actionTypes.GETPERSONS:
     return state;

    default:
      return state;
 }

};
