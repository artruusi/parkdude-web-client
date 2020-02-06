import * as actionTypes from "./actionTypes";
import axios from "axios";
import { Dispatch, ModifyUserData, IPerson } from "./../types";
import { checkLogIn } from './userActions';

axios.defaults.withCredentials = true;

export const getPersons = () => {
  return (dispatch: Dispatch) => {

    dispatch({
      type: actionTypes.STARTLOADINGPERSONS,
    });
    
    const url =  process.env.REACT_APP_API_URL + "users";
    axios.get(url)
    .then(res => {

      dispatch({
        payload: res.data.data,
        type: actionTypes.GETPERSONS,   
      });

    })
    .catch(error => {
      console.log(error);
      const {response} = error;
      if (response && response.status === 401) {
        checkLogIn()(dispatch);
      }
      dispatch({
        type: actionTypes.GETPERSONSFAILED,
      });
    });
  };
};

export const getPerson = (id: string) => {
  return (dispatch: Dispatch) => {
    
    dispatch({
      type: actionTypes.STARTLOADINGPERSONS,
    });
    const url =  process.env.REACT_APP_API_URL + "users/" + id;
    axios.get(url)
    .then(res => 
      dispatch({
        payload: res.data.data,
        type: actionTypes.GETPERSON,
      }),
    )
    .catch(error => {
      const {response} = error;
      if (response && response.status === 401) {
        checkLogIn()(dispatch);
      }
      console.log(error);
      dispatch({
        payload:  response && response.data && response.data.message,
        type: actionTypes.GETPERSONFAILED,

      });
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

        if (type === 'make-admin' ) {
        
          dispatch({
            type: actionTypes.MAKEADMIN,
          });
          dispatch( getPerson(person.id));
         
        } else if (type === 'undo-admin') {

          dispatch({
            type: actionTypes.UNDOADMIN,
          });
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
        const {response} = error;
        if (response && response.status === 401) {
          checkLogIn()(dispatch);
        }
        if (type === 'make-admin' ) {
        
          dispatch({
            payload: response && response.data && response.data.message,
            type: actionTypes.MAKEADMINFAILED,
          });
         
        } else if (type === 'undo-admin') {

         dispatch({
           payload: response && response.data && response.data.message,
           type: actionTypes.UNDOADMINFAILED,
         });
        
        } else {
          dispatch({
            payload: response && response.data && response.data.message,
            type: actionTypes.ACCETPERSONFAILED,      
          });

        }
      });

  };
};

export const deletePerson = (id: string) => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + "users/" + id;
    axios.delete(url)
      .then(res => {

        dispatch({
          payload: id,
          type: actionTypes.DELETEPERSON,
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.DELETEPERSONFAILED,
        });
      });

  };
};

export const killSession = (id: string) => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + "users/" + id + '/clearSessions';
    axios.post(url, {})
      .then(res => {

        dispatch({
          type: actionTypes.KILLSESSION,
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.KILLSESSIONFAILED,
        });
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

        dispatch({
          type: actionTypes.PERSONCREATED,
        });
        dispatch(getPersons());
      })
      .catch(error => {
        console.log(error);
        const {response} = error;
        dispatch({
          payload: response && response.data && response.data.message,
          type: actionTypes.PERSONCREATIONFAILED,
        });
      });
  };
};

export const changePassword = (id: string, password: string) => {
  return (dispatch: Dispatch) => {
    const url = process.env.REACT_APP_API_URL + "users/" + id + "/password";
    const data = {
      password,
    };
    axios.put(url, data)
      .then(res => {
        console.log(res);
        dispatch({
          type: actionTypes.PASSWORDCHANGED,
        });
      })
      .catch(error => {
        console.log(error);
        const {response} = error;
        dispatch({
          payload: response && response.data && response.data.message,
          type: actionTypes.PASSWORDCHANGEFAILED,
        });
      });
  };
};

export const hidePersonsSnackBar = () => {
  return {
    type: actionTypes.HIDEPERSONSSNACKBAR,
  };
};

export const freeParkingSpotFromPerson = (id: string, spotId: string) => {

  const payload = {
    personId: id,
    spotId,
  };
  return {
    payload,
    type: actionTypes.FREEUSERSPARKINGSPOT,
  };
};
