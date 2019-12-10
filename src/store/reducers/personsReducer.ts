import { Reducer } from "redux";

import { ParkingSpotState, PersonsState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: PersonsState = {
  personList: [{id: '1', name: 'Kimmo Käyttäjä', email: 'kimmo.k@gmail.com', parkingSpot: null, usageStatic: 1, admin: false},
  {id: '2', name: 'Katri Käyttäjä', email: 'Katri.k@gmail.com', parkingSpot: null, usageStatic: 1, admin: false},
  {id: '3', name: 'Kari Käyttäjä', email: 'Kari.k@innogiant.com', parkingSpot: 1, usageStatic: 14, admin: false},
  {id: '4', name: 'Kati Käyttäjä', email: 'kimmo.k@innogiant.com', parkingSpot: 2, usageStatic: 12, admin: false},
  {id: '5', name: 'Katja Käyttäjä', email: 'katja.k@innogiant.com', parkingSpot: 2, usageStatic: 12, admin: false},
  {id: '6', name: 'Konsta Käyttäjä', email: 'Konsta.k@innogiant.com', parkingSpot: 2, usageStatic: 12, admin: true}],

  selectedPersonIndex: -1,

  waitingForAccept: [{id: '23', name: 'Katja Käyttäjä', email: 'katja.as@gmail.com'},
  {id: '23q', name: 'Katja Käyttäjä', email: 'katja.as@gmail.com'},
  {id: '23w', name: 'Petra Käyttäjä', email: 'petra.as@gmail.com'},
  {id: '23e', name: 'Kari Käyttäjä', email: 'kari.as@gmail.com'}],

};

export const personsReducer: Reducer< PersonsState, any> = (state= initialState, action) => {

 switch (action.type) {

   case actionTypes.GETPERSONS:
     return state;

    default:
      return state;
 }

};
