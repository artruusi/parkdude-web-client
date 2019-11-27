import { Reducer } from "redux";

import { UserState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: UserState = {

  currentPage: 'customers',
  loggedIn: true,
  userName: 'Smith',
    
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
        userName: state.userName,
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
