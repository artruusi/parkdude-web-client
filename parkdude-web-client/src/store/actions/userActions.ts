import * as actionTypes from './actionTypes';
import axios from 'axios';
import {Dispatch} from './../types';

export const LogUserIn = () => {
    return {
        type: actionTypes.LOGIN,
    };
};
export const LogOut = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};

export const checkLogIn = () => {
    return (dispath: Dispatch) => {
        const baseURL = 'http://localhost:3000';
        axios.get(baseURL)
        .then(data => {dispath(LogUserIn()); })
        .catch(error => {dispath(LogOut()); });
    };
};
