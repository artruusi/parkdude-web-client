import { Reducer } from "redux";

import { UserState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: UserState = {
  currentPage: 'customers',
  loggedIn: false,
  snackBarMessage: '',
  userName: '',
};

export const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userName: '',          
      };

    case actionTypes.LOGIN:
      return {
        currentPage: state.currentPage,
        loggedIn: true,
        snackBarMessage: '',
        userName: action.payload,
      };

    case actionTypes.LOGINFAILED:
      return {
        currentPage: state.currentPage,
        loggedIn: false,
        snackBarMessage: action.payload || '',
        userName: '',
      };

    case actionTypes.CHANGEPAGE:
      return {
        currentPage: action.payload,
        loggedIn: true,
        snackBarMessage: '',
        userName: state.userName,
      };

    case actionTypes.HIDEUSERSNACKBAR:
      return {
        ...state,
        snackBarMessage: '',
      };
    default:
      return state;
  }
};
