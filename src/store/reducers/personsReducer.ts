import { Reducer } from "redux";

import { PersonsState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: PersonsState = {
  personList: [],

};

export const personsReducer: Reducer< PersonsState, any> = (state= initialState, action) => {

 switch (action.type) {

   case actionTypes.GETPERSONS:
     return {
       personList: action.payload,
     };

    case actionTypes.ACCEPTPERSON:
      const index = state.personList.findIndex(person => person.id === action.payload);
      const newPersonList = [...state.personList];

      newPersonList[index].role = 'verified';
      return {
        personList: newPersonList,
      };

    case actionTypes.DELETEPERSON:
      const deletePersonList = state.personList.filter(person => person.id !== action.payload );
      return {
        personList: deletePersonList,
      };
      
    default:
      return state;
 }

};
