import {
    COUNT_AC
  } from "../actions/AcActions";
  
  const initialState = {};
  
  export default function countAcReducer(state = initialState, action) {
    switch (action.type) {
      case COUNT_AC:
        return action.payload;
      default:
        return state;
    }
  }