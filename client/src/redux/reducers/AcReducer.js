import {
    GET_ALL_AC,
    ADD_AC,
    ADD_OLD_AC,
    UPDATE_AC,
    DELETE_AC
  } from "../actions/AcActions";
  
  const initialState = {};
  
  export default function acReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_AC:
        return action.payload;
      case ADD_AC:
        return [...state, action.payload]
      case ADD_OLD_AC:
        return [...state, action.payload]
      case UPDATE_AC:
      return state.map((ac) => {
        if (ac._id === action.payload.acId) {
          if(action.payload.etat === true){
            return {
              ...ac,
              doneAccessCode: [action.payload.accessCode, ...ac.doneAccessCode]
            };
          }
          if(action.payload.etat === false){
            return {
              ...ac,
              undoneAccessCode: [action.payload.accessCode, ...ac.undoneAccessCode]
            };
          }
        }
        return ac;
      });
      
      // case UPDATE_AC:
      //   return state.map((ac) => {
      //     if (ac._id === action.payload.acId) {
      //       return {
      //         ...ac,
      //         doneAccessCode: [...ac.doneAccessCode, action.payload.doneAccessCode]
      //       };
      //     } return ac;
      //   });
      case DELETE_AC:
        return state.filter((ac) => ac._id !== action.payload.acId);
      default:
        return state;
    }
  }