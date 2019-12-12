import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch } from "./../types";
import { LoginState, PasswordLogInData } from "../types";

export const LogUserIn = (name: string) => {
  return {
    payload: name,
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
    const url =  process.env.REACT_APP_API_URL + "auth/logout";
    axios
      .get<LoginState>(url, { withCredentials: true })
      .then(response => dispatch(LogOut()));
  };
};

export const passwordLogIn = (data: PasswordLogInData) => {
  return (dispatch: Dispatch) => {

    const url = process.env.REACT_APP_API_URL + 'auth/'; // TODO oikea url
    axios.post(url, data)
    .then(res => {
      dispatch(LogUserIn(res.data.name));
    });

  };

};

export const checkLogIn = () => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + 'auth/login-state';
    axios
      .get<LoginState>(url, { withCredentials: true })
      .then(response =>
        response.data.isAuthenticated
          ? dispatch(LogUserIn(response.data.name))
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
