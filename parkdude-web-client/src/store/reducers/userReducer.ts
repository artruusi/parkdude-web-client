import { Reducer } from "redux";

import { Actions, State } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loggedIn: false
}

export const userReducer: Reducer<State, Actions> = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOGOUT:
            return {
                loggedIn: false
            }

        case actionTypes.LOGIN:
            return {
                loggedIn: true
            }
        default:
            return state;
    }
}