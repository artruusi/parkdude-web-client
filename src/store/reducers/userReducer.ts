import { Reducer } from "redux";

import { Actions, UserState } from "../types";
import * as actionTypes from '../actions/actionTypes';

const initialState: UserState = {
    loggedIn: false,
};

export const userReducer: Reducer<UserState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT:
            return {
                loggedIn: false,
            };

        case actionTypes.LOGIN:
            return {
                loggedIn: true,
            };
        default:
            return state;
    }
};
