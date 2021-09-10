import {
    // GET_ALL_OLD_AC,
    ADD_OLD_AC,
    // UPDATE__OLD_AC,
    // DELETE_OLD_AC
  } from "../actions/AcActions";
  
  
  const initialState = {};
  
  export default function oldAcReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_OLD_AC:
        return [...state, action.payload]
      default:
        return state;
    }
  }