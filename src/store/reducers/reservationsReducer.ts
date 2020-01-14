import { Reducer } from "redux";
import * as actionTypes from '../actions/actionTypes';
import { ReservationsState } from "../types";

const initialState: ReservationsState = {
  deleteReservationsNumber: 0,
  loading: false,
  reservations: [],
  userReservations: [],

};

export const reservationsReducer: Reducer<ReservationsState, any> = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.DELETERESERVATION:

      const stopLoading = state.deleteReservationsNumber !== 1;

      const userReservations = state.userReservations.filter(reservation =>
        !( reservation.date === action.payload.dates && reservation.parkingSpot.id === action.payload.id) );

      return {
        ...state,
        deleteReservationsNumber: state.deleteReservationsNumber - 1,
        loading: stopLoading,
        userReservations,
               
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
      return {
        deleteReservationsNumber: state.deleteReservationsNumber,
        loading: false,
        reservations: action.payload,
        userReservations: [],
       
      };

    case actionTypes.CLEARRESERVATIONS:
      return {
        deleteReservationsNumber: state.deleteReservationsNumber,
        loading: false,
        reservations: [],
        userReservations: [],
      };

    case actionTypes.GETUSERRESERVATIONS:
      return {
        deleteReservationsNumber: state.deleteReservationsNumber,
        loading: false,
        reservations: state.reservations,
        userReservations: action.payload,
      };

    default:
      return state;
  }
};
