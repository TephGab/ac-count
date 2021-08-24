import { combineReducers } from 'redux';
import acReducer from './AcReducer';
import authReducer from './AuthReducer';

export default combineReducers({
    acReducer, authReducer
});