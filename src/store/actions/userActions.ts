import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch } from "./../types";
import { LoginState, PasswordLogInData } from "../types";

axios.defaults.withCredentials = true;

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
    axios.post<LoginState>(url, {})      
      .then(response => dispatch(LogOut()));
  };
};

export const passwordLogIn = (data: PasswordLogInData) => {
  return (dispatch: Dispatch) => {

    const url = process.env.REACT_APP_API_URL + 'auth/login';
    axios.post(url, data)
      .then(res => 
        dispatch(LogUserIn(res.data.name)),
      )
      .catch(error => {
        console.log(error);
        const {response} = error;
        dispatch({
          payload: response && response.data && response.data.message,
          type: actionTypes.LOGINFAILED,
        });
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

export const closeUserSnackBar = () => {
  return (dispatch: Dispatch) => {
    dispatch({
        type: actionTypes.HIDEUSERSNACKBAR,
      }); 
  };
};
