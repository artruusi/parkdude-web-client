import { Reducer } from "redux";
import * as actionTypes from '../actions/actionTypes';
import { ReservationsState } from "../types";

const initialState: ReservationsState = {
  reservations: [],
  userReservations: [],
};

export const reservationsReducer: Reducer<ReservationsState, any> = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.GETRESERVATIONS:
      return {
        reservations: action.payload,
        userReservations: [],
      };

    case actionTypes.CLEARRESERVATIONS:
      return {
        reservations: [],
        userReservations: [],
      };

    case actionTypes.GETUSERRESERVATIONS:
      return {
        reservations: state.reservations,
        userReservations: action.payload,
      };

    default:
      return state;
  }
};
