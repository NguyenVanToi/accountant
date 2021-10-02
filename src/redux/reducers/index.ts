import { combineReducers } from 'redux';
import activityReducer from './activityReducer';
import accountingReducer from './accountingReducer';
import categoryReducer from './categoryReducer';
import summaryReducer from './summaryReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    activity: activityReducer,
    accounting: accountingReducer,
    category: categoryReducer,
    summary: summaryReducer,
    loading: loadingReducer
})
