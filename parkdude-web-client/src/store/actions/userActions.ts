import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch } from "./../types";
import { LoginState } from "../types";

export const LogUserIn = () => {
  return {
    type: actionTypes.LOGIN,
  };
};

export const LogOut = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const logOutFromServer = () => {
  return (dispatch: Dispatch) => {
    const url = "http://localhost:3000/api/auth/logout";
    axios
      .get<LoginState>(url, { withCredentials: true })
      .then(response => dispatch(LogOut()));
  };
};

export const checkLogIn = () => {
  return (dispatch: Dispatch) => {
    const url = "http://localhost:3000/api/auth/login-state";
    axios
      .get<LoginState>(url, { withCredentials: true })
      .then(response =>
        response.data.isAuthenticated
          ? dispatch(LogUserIn())
          : dispatch(LogOut()),
      )
      .catch(error => {
        dispatch(LogOut());
      });
  };
};

export const ChangePage = (page: string) => {
  return {
    payload: page,
    type: actionTypes.CHANGEPAGE, 
  };
};
