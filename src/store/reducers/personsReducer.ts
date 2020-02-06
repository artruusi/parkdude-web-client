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
  loading: false,
  personList: [],
  selectedPerson: defaultPerson,
  snackBarMessage: '',

};

export const personsReducer: Reducer< PersonsState, any> = (state= initialState, action) => {

 switch (action.type) {

   case actionTypes.FREEUSERSPARKINGSPOT:

     const spotId = action.payload.spotId;
     const filteredSpots = state.selectedPerson.ownedParkingSpots.filter(spot => spot.id !== spotId);
     const newSelectedPerson = state.selectedPerson;
     newSelectedPerson.ownedParkingSpots = filteredSpots;

     return {
       ...state,
       selectedPerson: newSelectedPerson,
     };

  case actionTypes.STARTLOADINGPERSONS:

  return {
    ...state,
    loading: true,
  };

   case actionTypes.GETPERSONS:
     return {
       ...state,
       loading: false,
       personList: action.payload,
  
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
        ...state,
        personList: newPersonList,
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
        ...state,
        personList: deletePersonList,
        snackBarMessage: snackBarMessageDelete,
      };

    case actionTypes.GETPERSON:
      return {
        ...state,
        loading: false,
        selectedPerson: action.payload,
          
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
        snackBarMessage: action.payload || 'User creation failed',
      };

    case actionTypes.PASSWORDCHANGED:
      return {
        ...state,
        snackBarMessage: 'Password changed succesfully',
      };

    case actionTypes.PASSWORDCHANGEFAILED:
      return {
        ...state,
        snackBarMessage: action.payload || 'Password change failed',
      };

    case actionTypes.GETPERSONSFAILED:
      return {
        ...state,
        loading: false,
        snackBarMessage: 'Fetching persons from server failed',
       
      };

    case actionTypes.GETPERSONFAILED:
      return {
        ...state,
        loading: false,
        snackBarMessage: action.payload || 'Fetching person data from server failed',

      };

    case actionTypes.KILLSESSIONFAILED:
      return {
        ...state,
        snackBarMessage: action.payload || "User's session killing failed",
      };

    case actionTypes.KILLSESSION:
      const selectedPerson = state.selectedPerson;
      selectedPerson.sessions = [];

      return {
        ...state,
        selectedPerson,
        snackBarMessage: "User's session killed succesfully",

      };

    case actionTypes.ACCETPERSONFAILED:
      return {
        ...state,
        snackBarMessage: action.payload || 'Person accept failed',
      };
      
    default:
      return state;
 }

};
