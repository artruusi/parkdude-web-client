import * as actionTypes from "./actionTypes";
import axios from "axios";
import { checkLogIn } from './userActions';
import { Dispatch, IPerson, ParkingSpot } from "./../types";

interface GetReservationsRes {
  reservations: GetReservationsResReservations [];

}

interface GetReservationsResReservations {
  date: string;
  user: IPerson;
  parkingSpot: ParkingSpot;
}

interface PayloadGetReservations {
  date: string;
  parkingSpotId: string;
  parkingSpotName: string;
  user: string;
}

export const getReservations = (startDate: string, endDate: string, person: string) => {
  return (dispatch: Dispatch) => {
    let url =  process.env.REACT_APP_API_URL + "parking-reservations";
    if (startDate !== '' && endDate !== '') {
      url += '?startDate=' + startDate + '&endDate=' + endDate;
    }

    axios.get<GetReservationsRes>(url)
      .then(res => {

        const payloadRes: PayloadGetReservations []  = [];

        res.data.reservations.forEach( reservation => {

          const data = {
            date: reservation.date,
            parkingSpotId: reservation.parkingSpot.id,
            parkingSpotName: reservation.parkingSpot.name,
            user: reservation.user.name,
          };

          if (person === '') {
            
            payloadRes.push(data);
          } else {
            if (person === reservation.user.id) {
              payloadRes.push(data);
            }
          }
        });
        const noResults = payloadRes.length === 0;
        dispatch({
          noResults,   
          payload: payloadRes,         
          type: actionTypes.GETRESERVATIONS, 
           
        });
      })
      .catch(error => {
        const {response} = error;
        if (response && response.status === 401) {
          checkLogIn()(dispatch);
        }
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
        dispatch({
          payload: res.data.reservations,
          type: actionTypes.GETUSERRESERVATIONS,
          
        });
      })
      .catch(error => {
        const {response} = error;
        if (response && response.status === 401) {
          checkLogIn()(dispatch);
        }
        console.log(error);
      });
  };
};

export const deleteReservations = (id: string, dates: string, type: string) => {
  return (dispatch: Dispatch) => {
    let url = process.env.REACT_APP_API_URL + 'parking-reservations/parking-spot/' + id;

    if (dates !== '') {
      url += '?dates=' + dates;
    }
    axios.delete(url)
      .then(res => {
        dispatch({
          payload: {
            dates,
            id,
            type,          
          },
          type: actionTypes.DELETERESERVATION,
          
        });
      })
      .catch(error => {
        console.log(error);
        const {response} = error;
        dispatch({
          payload: response && response.data && response.data.message,
          type: actionTypes.DELETERESERVATIONFAILED,
        });
      });
  };
};

export const SetDeletereservationNumber = (reservationsNumber: number) => {
  return {
    payload: reservationsNumber,
    type: actionTypes.SETDELETERESERVATIONNUMBER,
   
  };
};

export const startLoading = () => {
  return {
    type: actionTypes.STARTLOADINGRESERVATIONS,
  };
};

export const hideReservationsSnackBar = () => {
  return {
    type: actionTypes.HIDERESERVATIONSSNACKBAR,
  };
};
