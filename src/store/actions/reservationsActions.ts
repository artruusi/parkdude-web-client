import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch } from "./../types";

export const getReservations = (startDate: string, endDate: string, person: string) => {
  return (dispatch: Dispatch) => {
    let url =  process.env.REACT_APP_API_URL + "parking-reservations/calendar";
    if (startDate !== '' && endDate !== '') {
      url += '?startDate=' + startDate + '&endDate=' + endDate;
    }
    if (person !== '') {
      url += '&person' + person;
    }
    axios.get(url)
      .then(res => {
        console.log(res);
        dispatch({
          payload: res.data.calendar,
          type: actionTypes.GETRESERVATIONS,     
        });
      })
      .catch(error => {
        console.log(error);
      });
      
  };
};

export const clearReservations = () => {
  return {
    type: actionTypes.CLEARRESERVATIONS,
  };
};

export const getUserReservations = (id: string) => {
  return (dispatch: Dispatch) => {
    const startDate = '2019-01-01'; // TODO calculate real start date

    const url =  process.env.REACT_APP_API_URL + 'users/' + id + '/reservations?startDate=' +  startDate;
    axios.get(url)
      .then(res => {
        console.log(res);
        dispatch({
          payload: res.data.reservations,
          type: actionTypes.GETUSERRESERVATIONS,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteReservations = (id: string, dates: string) => {
  return (dispatch: Dispatch) => {
    let url = process.env.REACT_APP_API_URL + 'parking-reservations/parking-spot/' + id;

    if (dates !== '') {
      url += '?dates=' + dates;
    }
    axios.delete(url)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.DELETERESERVATIONFAILED,
        });
      });
  };
};
