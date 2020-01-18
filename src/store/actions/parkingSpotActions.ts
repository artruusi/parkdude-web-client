import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch, CreateParkingSpotData } from "./../types";

axios.defaults.withCredentials = true;

// const setParkingSpots = (data: any) => {
//   return {
//     payload: data,
//     type: actionTypes.GETSPOTS,
//   };
// };

export const getParkingSpots = () => {
  return (dispatch: Dispatch) => {

    dispatch({
      type: actionTypes.STARTLOADINGPARKINGSPOTS,
    });
    console.log('parking spots');
    const url =  process.env.REACT_APP_API_URL + 'parking-spots';
    axios.get(url)
      .then(res => {
        console.log(res);
        dispatch({
          payload: res.data,
          type: actionTypes.GETSPOTS,
        });
      })
      .catch(error => {
        console.log(error);
        const {response} = error;
        dispatch({
          payload: response && response.data && response.data.message,
          type: actionTypes.GETSPOTSFAILED,
        });
      });
  };
};

export const createParkingSpot = (data: CreateParkingSpotData) => {
  return (dispatch: Dispatch) => {
    const url =  process.env.REACT_APP_API_URL + 'parking-spots';
    axios.post(url, data)
    .then(res => {
      console.log(res);
      dispatch({
        type: actionTypes.PARKINGSPOTCREATED,
      });
      return dispatch(getParkingSpots());
    })
    .catch(error => {
      console.log(error);
      const {response} = error;
      dispatch({
        payload: response && response.data && response.data.message,
        type: actionTypes.PARKINGSPOTCREATEDFAILED,
      });
    });
  };
};

export const deleteParkingSpot = (id: string) => {
  return (dispatch: Dispatch) => {
    const url =  process.env.REACT_APP_API_URL + 'parking-spots/' + id;
    axios.delete(url)
      .then(res => {
        console.log(res);
        dispatch({
          payload: id,
          type: actionTypes.DELETESPOT,        
        });
      })
      .catch(error => {
        console.log(error);
        const {response} = error;
        dispatch({
          payload: response && response.data && response.data.message,
          type: actionTypes.DELETESPOTFAILED,
        });
      });
  };
};

export const changeOwner = (id: string, name: string, newOwner: string) => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + 'parking-spots/' + id;
    const data = {
      name,
      ownerEmail: newOwner,
    };

    console.log(data);
    axios.put(url, data)
      .then(res => {
        dispatch(getParkingSpots());
        dispatch({
          type: actionTypes.CHANGEOWNER,
        });
      })
      .catch(error => {
        console.log(error);
        const {response} = error;
        dispatch({
          payload: response && response.data && response.data.message,
          type: actionTypes.CHANGEOWNERFAILED,
        });
      });
  };
};

export const closeSnackBar = () => {
  return (dispatch: Dispatch) => {
    console.log('close snack');
    dispatch({
        type: actionTypes.HIDEPARKINGSPOTSNACKBAR,
      }); 
  };
  
};
