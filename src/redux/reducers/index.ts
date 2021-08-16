import { combineReducers } from 'redux';
import activityReducer from './activityReducer';
import accountingReducer from './accountingReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    activity: activityReducer,
    accounting: accountingReducer,
    category: categoryReducer
})
