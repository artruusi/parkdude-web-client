import { Reducer } from "redux";

import { UserState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: UserState = {

  currentPage: 'customers',
  loggedIn: false,
  userName: '',
    
};

export const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return {
        currentPage: state.currentPage,
        loggedIn: false,
        userName: state.userName,
          
      };

    case actionTypes.LOGIN:
      return {
        currentPage: state.currentPage,
        loggedIn: true,
        userName: action.payload,
      };

    case actionTypes.CHANGEPAGE:
      return {
        currentPage: action.payload,
        loggedIn: true,
        userName: state.userName,
      };
    default:
      return state;
  }
};
