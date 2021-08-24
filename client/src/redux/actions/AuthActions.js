import axios from "axios";

export const LOGOUT = "LOGOUT";
export const AUTH = "AUTH";
export const LOGOU = "LOGOU";
export const GET_ALL_AC = "GET_ALL_AC";
export const ADD_AC = "ADD_AC";
export const UPDATE_AC = "UPDATE_AC";
export const DELETE_AC = "DELETE_AC";

// errors
export const GET_AC_ERRORS = "GET_POST_ERRORS";
//const REACT_APP_API_URL = "https://ac-count.herokuapp.com";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getAc = (num) => {
  return (dispatch) => {
    return axios
      .get(`${REACT_APP_API_URL}/api/ac/`)
      .then((res) => {
       // const array = res.data.slice(0, num);
        //dispatch({ type: GET_PROJECTS, payload: array });
        dispatch({ type: GET_ALL_AC, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getUserAc = (num) => {
  return (dispatch) => {
    return axios
      .get(`${REACT_APP_API_URL}/api/ac/`)
      .then((res) => {
       // const array = res.data.slice(0, num);
        //dispatch({ type: GET_PROJECTS, payload: array });
        dispatch({ type: GET_ALL_AC, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addAc = (data, etat) => {
  return (dispatch) => {
    return axios
      .post(`${REACT_APP_API_URL}/api/ac/`, {data, etat})
      .then((res) => {
        if (res.data.errors) {
          console.log('error');
          // dispatch({ type: GET_PROJECT_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: ADD_AC, payload: res.data });
          console.log('Success');
          // const array = res.data.slice(0, data);
          // dispatch({ type: GET_PROJECTS, payload: array });
          // dispatch({ type: GET_PROJECT_ERRORS, payload: "" });
        }
      });
  };
};

export const updateAc = (acId, accessCode, etat) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${REACT_APP_API_URL}/api/ac/${acId}`,
      data: { id: acId, accessCode: accessCode, etat: etat },
    })
      .then((res) => {
        dispatch({ type: UPDATE_AC, payload: { acId, accessCode, etat } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteAc = (acId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${REACT_APP_API_URL}/api/ac/${acId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_AC, payload: { acId } });
      })
      .catch((err) => console.log(err));
  };
};