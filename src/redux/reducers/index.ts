import { combineReducers } from 'redux';
import activityReducer from './activityReducer';
import accountingReducer from './accountingReducer';

export default combineReducers({
    activity: activityReducer,
    accounting: accountingReducer
})
