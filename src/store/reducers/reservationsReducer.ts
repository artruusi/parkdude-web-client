import { Reducer } from "redux";
import * as actionTypes from '../actions/actionTypes';
import { ReservationsState, UserReservations, Reservation } from "../types";

const initialState: ReservationsState = {
  deleteReservationsNumber: 0,
  loading: false,
  reservations: [],
  snackBarMessage: '',
  userReservations: [],
  
};

export const reservationsReducer: Reducer<ReservationsState, any> = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.HIDERESERVATIONSSNACKBAR:
      return {
        ...state,
        snackBarMessage: '',
      };

    case actionTypes.DELETERESERVATION:

      const stopLoading = state.deleteReservationsNumber !== 1;

      const snackBarMessageDelete = !stopLoading && state.snackBarMessage === ''
        ? 'Reservations deleted succesfully' 
        : state.snackBarMessage;

      let userReservations: UserReservations [] = [];
      let listReservations: Reservation [] = [];
      if (action.payload.type === 'personReservation') {
        
        userReservations = state.userReservations.filter(reservation =>
          !( reservation.date === action.payload.dates && reservation.parkingSpot.id === action.payload.id) );
      } else {
        listReservations = state.reservations.filter(reservation => 
          !( reservation.date === action.payload.dates && reservation.parkingSpotId === action.payload.id));
      }

      return {
        ...state,
        deleteReservationsNumber: state.deleteReservationsNumber - 1,
        loading: stopLoading,
        reservations: listReservations,
        snackBarMessage: snackBarMessageDelete,
        userReservations,
                 
      };

    case actionTypes.DELETERESERVATIONFAILED:
      return {
        ...state,
        snackBarMessage: action.payload || 'Failed to delete a reservation',
      };

    case actionTypes.STARTLOADINGRESERVATIONS:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.SETDELETERESERVATIONNUMBER:

      return {
        ...state,
        deleteReservationsNumber: action.payload,
      };

    case actionTypes.GETRESERVATIONS:

      const reservations: [] = action.payload;
      const snackBarMessage = reservations.length === 0 ? 'No results found' : '';
      
      return {
        ...state,
        loading: false,
        reservations: action.payload,
        snackBarMessage,
           
      };

    case actionTypes.CLEARRESERVATIONS:
      return {
        deleteReservationsNumber: state.deleteReservationsNumber,
        loading: false,
        reservations: [],
        snackBarMessage: '',
        userReservations: [],
       
      };

    case actionTypes.GETUSERRESERVATIONS:
      return {
        ...state,
        loading: false,       
        userReservations: action.payload,
      };

    default:
      return state;
  }
};
