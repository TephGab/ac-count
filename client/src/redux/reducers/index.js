import { combineReducers } from 'redux';
import acReducer from './AcReducer';
import oldAcReducer from './OldAcReducer';
import authReducer from './AuthReducer';
import countAcReducer from './CountAcReducer';


export default combineReducers({
    acReducer, countAcReducer, authReducer, oldAcReducer
});