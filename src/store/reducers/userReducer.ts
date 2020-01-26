import { Reducer } from "redux";

import { UserState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: UserState = {
  authChecked: false,
  currentPage: 'customers',
  loggedIn: false,
  snackBarMessage: '',
  userName: '',
  userRole: undefined,
};

export const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return {
        ...state,
        authChecked: true,
        loggedIn: false,
        userName: '',
        userRole: undefined,
      };

    case actionTypes.LOGIN:
      return {
        authChecked: true,
        currentPage: state.currentPage,
        loggedIn: true,
        snackBarMessage: '',
        userName: action.payload.username,
        userRole: action.payload.userRole,
      };

    case actionTypes.LOGINFAILED:
      return {
        ...state,
        currentPage: state.currentPage,
        loggedIn: false,
        snackBarMessage: action.payload || '',
        userName: '',
      };

    case actionTypes.CHANGEPAGE:
      return {
        ...state,
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
