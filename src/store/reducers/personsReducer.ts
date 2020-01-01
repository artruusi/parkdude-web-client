import { Reducer } from "redux";

import { PersonsState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const defaultPerson = {
  admin: false,
  email: '',
  id: '',
  name: '',
  parkingSpot: null,
  role: 'verified',
  sessions: [],
  usageStatic: 0,
  
};

const initialState: PersonsState = {
  personList: [],
  selectedPerson: defaultPerson,

};

export const personsReducer: Reducer< PersonsState, any> = (state= initialState, action) => {

 switch (action.type) {

   case actionTypes.GETPERSONS:
     return {
       personList: action.payload,
       selectedPerson: defaultPerson,
     };

    case actionTypes.ACCEPTPERSON:
      const index = state.personList.findIndex(person => person.id === action.payload);
      const newPersonList = [...state.personList];

      newPersonList[index].role = 'verified';
      return {
        personList: newPersonList,
        selectedPerson: defaultPerson,
      };

    case actionTypes.DELETEPERSON:
      const deletePersonList = state.personList.filter(person => person.id !== action.payload );
      return {
        personList: deletePersonList,
        selectedPerson: defaultPerson,
      };

    case actionTypes.GETPERSON:
      return {
        personList: state.personList,
        selectedPerson: action.payload,
      };
      
    default:
      return state;
 }

};
