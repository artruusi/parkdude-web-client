import { Reducer } from "redux";

import { PersonsState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: PersonsState = {
  personList: [],

  selectedPersonIndex: -1,

};

export const personsReducer: Reducer< PersonsState, any> = (state= initialState, action) => {

 switch (action.type) {

   case actionTypes.GETPERSONS:
     return {
       ...state,
       personList: action.payload,
     };

    default:
      return state;
 }

};
