import axios from "axios";

export const GET_ALL_AC = "GET_ALL_AC";
export const ADD_AC = "ADD_AC";
export const UPDATE_AC = "UPDATE_AC";
export const COUNT_AC = "COUNT_AC";
export const DELETE_AC = "DELETE_AC";

export const ADD_OLD_AC = "ADD_OLD_AC";

// errors
export const GET_AC_ERRORS = "GET_POST_ERRORS";
//const REACT_APP_API_URL = "https://ac-count.herokuapp.com";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getAc = (email) => {
  const isGettingUser = true;
  axios.post(`${REACT_APP_API_URL}/api/ac/`, {isGettingUser, email})
  // .then((res) => {
  return (dispatch) => {
    return axios
      .get(`${REACT_APP_API_URL}/api/ac/`)
      .then((res) => {
        const totalDone = res.data[0].doneAccessCode.length;
        const totalUndone = res.data[0].undoneAccessCode.length;
        dispatch({ type: COUNT_AC, payload: { totalDone, totalUndone }});
        dispatch({ type: GET_ALL_AC, payload: res.data });
      })
      .catch((err) => console.log(err));
    };
  // });
};

export const addAc = (data, etat, email, isDel) => {
  return (dispatch) => {
    return axios
      .post(`${REACT_APP_API_URL}/api/ac/`, {data, etat, email, isDel})
      .then((res) => {
        if (res.data.errors) {
          console.log('error');
        } else {
          if(isDel === 'reset'){
           // dispatch({ type: GET_ALL_AC, payload: res.data });
            // dispatch({ type: ADD_OLD_AC, payload: res.data });
            console.log('reset action en fonction')
          }else{
            dispatch({ type: ADD_AC, payload: res.data });
           // dispatch({ type: GET_ALL_AC, payload: res.data });
          }
          console.log('Success');
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