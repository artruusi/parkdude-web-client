import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch } from "./../types";

axios.defaults.withCredentials = true;

const setPersons = (data: any) => {
  return {
    payload: data,
    type: actionTypes.GETPERSONS,   
  };
};

export const getPersons = () => {
  return (dispatch: Dispatch) => {
    
    const url =  process.env.REACT_APP_API_URL + "users";
    axios.get(url)
    .then(res => 
      dispatch(setPersons(res.data.data)),
    )
    .catch(error => {
      console.log(error);
    });
  };
};
