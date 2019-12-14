import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch } from "./../types";

axios.defaults.withCredentials = true;

const setParkingSpots = (data: any) => {
  return {
    payload: data,
    type: actionTypes.GETSPOTS,
  };
};

export const getParkingSpots = () => {
  return (dispatch: Dispatch) => {
    console.log('parking spots');
    const url =  process.env.REACT_APP_API_URL + 'parking-spots';
    axios.get(url)
      .then(res => {
        console.log(res);
        return dispatch(setParkingSpots(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
