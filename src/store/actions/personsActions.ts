import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch, ModifyUserData, IPerson } from "./../types";

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

export const getPerson = (id: string) => {
  return (dispatch: Dispatch) => {
    
    const url =  process.env.REACT_APP_API_URL + "users/" + id;
    console.log(url);
    axios.get(url)
    .then(res => 
      dispatch({
        payload: res.data.data,
        type: actionTypes.GETPERSON,
        
      }),
    )
    .catch(error => {
      console.log(error);
    });
  };
};

export const modifyPerson = (person: IPerson, type: string) => {
  return (dispatch: Dispatch) => {

    const url =  process.env.REACT_APP_API_URL + "users/" + person.id;

    let role = '';

    if (type === 'accept-user' || type === 'undo-admin') {
      role = 'verified';
    } else if (type === 'make-admin') {
      role = 'admin';
    }
    const data: ModifyUserData = {
      email: person.email,
      name: person.name,
      role, 
    };
    axios.put(url, data)
      .then(res => {
        console.log(res);

        if (type === 'make-admin' || type === 'undo-admin') {
          dispatch( getPerson(person.id));
         
        } else {
          dispatch({
            payload: person.id,
            type: actionTypes.ACCEPTPERSON,      
          });

        }
        
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

export const killSession = (id: string) => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + "users/" + id + '/clearSessions';
    axios.post(url, {})
      .then(res => {
        console.log(res);

        dispatch({
          type: actionTypes.KILLSESSION,
        });
      })
      .catch(error => {
        console.log(error);
      });

  };
};

export const createPerson = (email: string, name: string, password: string) => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + "users/";
    const data = {
      email,
      name,
      password,
    };
    axios.post(url, data)
      .then(res => {
        console.log(res);
        dispatch(getPersons());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const changePassword = (id: string, password: string) => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + "users/" + id + "/password";
    const data = {
      password,
    };
    axios.post(url, data)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
};
