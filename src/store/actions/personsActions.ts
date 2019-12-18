import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch, AcceptUserData, Person } from "./../types";

axios.defaults.withCredentials = true;

const setPersons = (data: any) => {
  return {
    payload: data,
    type: actionTypes.GETPERSONS,   
  };
};

export const getPersons = () => {
  return (dispatch: Dispatch) => {
    
    const url =  process.env.REACT_APP_API_URL + "users";
    axios.get(url)
    .then(res => 
      dispatch(setPersons(res.data.data)),
    )
    .catch(error => {
      console.log(error);
    });
  };
};

export const acceptPerson = (person: Person) => {
  return (dispatch: Dispatch) => {

    const url =  process.env.REACT_APP_API_URL + "users/" + person.id;
    const data: AcceptUserData = {
      email: person.email,
      name: person.name,
      role: 'verified', 
    };
    axios.put(url, data)
      .then(res => {
        console.log(res);

        dispatch({
          payload: person.id,
          type: actionTypes.ACCEPTPERSON,      
        });
      })
      .catch(error => {
        console.log(error);
      });

  };
};

export const deletePerson = (id: string) => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + "users/" + id;
    axios.delete(url)
      .then(res => {
        console.log(res);

        dispatch({
          payload: id,
          type: actionTypes.DELETEPERSON,
        });
      })
      .catch(error => {
        console.log(error);
      });

  };
};
