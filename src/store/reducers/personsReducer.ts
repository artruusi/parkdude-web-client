import { Reducer } from "redux";

import { PersonsState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const defaultPerson = {
  admin: false,
  email: '',
  id: '',
  name: '',
  ownedParkingSpots: [],
  parkingSpot: null,
  reservationCount: 0,
  role: 'verified',
  sessions: [],
 
};

const initialState: PersonsState = {
  personList: [],
  selectedPerson: defaultPerson,
  snackBarMessage: '',

};

export const personsReducer: Reducer< PersonsState, any> = (state= initialState, action) => {

 switch (action.type) {

   case actionTypes.GETPERSONS:
     return {
       personList: action.payload,
       selectedPerson: defaultPerson,
       snackBarMessage: state.snackBarMessage,
     };

    case actionTypes.ACCEPTPERSON:
      const index = state.personList.findIndex(person => person.id === action.payload);
      const newPersonList = [...state.personList];

      newPersonList[index].role = 'verified';

      let snackBarMessage = '';
      if  (state.snackBarMessage === '' || state.snackBarMessage === 'User accepted succesfully') {
        snackBarMessage = 'User accepted succesfully';
      } else {
        snackBarMessage = state.snackBarMessage;
      }

      return {
        personList: newPersonList,
        selectedPerson: defaultPerson,
        snackBarMessage,
      };

    case actionTypes.DELETEPERSON:
      const deletePersonList = state.personList.filter(person => person.id !== action.payload );

      let snackBarMessageDelete = '';
      if  (state.snackBarMessage === '' || state.snackBarMessage === 'User deleted succesfully') {
        snackBarMessageDelete = 'User deleted succesfully';
      } else {
        snackBarMessageDelete = state.snackBarMessage;
      }

      return {
        personList: deletePersonList,
        selectedPerson: defaultPerson,
        snackBarMessage: snackBarMessageDelete,
      };

    case actionTypes.GETPERSON:
      return {
        personList: state.personList,
        selectedPerson: action.payload,
        snackBarMessage: state.snackBarMessage,
      };

    case actionTypes.HIDEPERSONSSNACKBAR:
      return {
        ...state,
        snackBarMessage: '',
      };

    case actionTypes.PERSONCREATED:
      return {
        ...state,
        snackBarMessage: 'User created succesfully',
      };

    case actionTypes.PERSONCREATIONFAILED:
      return {
        ...state,
        snackBarMessage: 'User creation failed',
      };

    case actionTypes.PASSWORDCHANGED:
      return {
        ...state,
        snackBarMessage: 'Password changed succesfully',
      };

    case actionTypes.PASSWORDCHANGEFAILED:
      return {
        ...state,
        snackBarMessage: 'Password change failed',
      };

    case actionTypes.GETPERSONSFAILED:
      return {
        ...state,
        snackBarMessage: 'Fetching persons from server failed',
      };

    case actionTypes.KILLSESSIONFAILED:
      return {
        ...state,
        snackBarMessage: "user's session killing failed",
      };

    case actionTypes.ACCETPERSONFAILED:
      return {
        ...state,
        snackBarMessage: 'Person accept failed',
      };
      
    default:
      return state;
 }

};
