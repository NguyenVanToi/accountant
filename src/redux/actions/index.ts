import { CREATE_ACTIVITY, DELETE_ACTIVITY, EDIT_ACTIVITY, FETCH_ACTIVITIES } from './type';
import { AccountingApi } from '../../_core/api/accountingApi';
import { Activity, UpdateActivityDto } from '../../_core/api/api';
import moment from 'moment';

export const fetchActivities = (filter?: any) => async (dispatch: any) =>{
    const api = new AccountingApi();
    let filterStr = [];
    let query = {};
    let createdAt = moment();
    
    if (filter) {
        if (filter.createdAt) {
            createdAt = filter.createdAt;
        }
        Object.keys(filter).forEach(field => {
            if (field !== 'createdAt' && filter[field])
            filterStr.push(`${field}||$eq||${filter[field]}`);
        })
    }
    filterStr.push(`created_at||$gte||${moment(createdAt).startOf('day').toISOString()}`);
        filterStr.push(`created_at||$lte||${moment(createdAt).endOf('day').toISOString()}`);
    query = {filter: [...filterStr]};    
    const response = await api.activities.getManyBaseActivityControllerActivity(query);
    return dispatch({type: FETCH_ACTIVITIES, payload: response.data});
}

export const createActivity = (activity: Activity) => async (dispatch: any) => {
    const api = new AccountingApi();
    const response = await api.activities.createOneBaseActivityControllerActivity(activity);
    return dispatch({type: CREATE_ACTIVITY, payload: response.data });
}

export const editActivity = (activity: Activity) => async (dispatch: any, getState: any) => {
    const api = new AccountingApi();
    const oldActivity = getState().activity[activity.id];
    const response = await api.activities.updateOneBaseActivityControllerActivity(activity.id, activity);
    return dispatch({ type: EDIT_ACTIVITY, payload: {activity: response.data, oldActivity} });
}

export const deleteActivity = (activity: Activity) => async (dispatch: any) => {
    const api = new AccountingApi();
    await api.activities.deleteOneBaseActivityControllerActivity(activity.id);
    return dispatch({ type: DELETE_ACTIVITY, payload: activity });
}
