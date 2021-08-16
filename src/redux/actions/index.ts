import { CREATE_ACTIVITY, DELETE_ACTIVITY, EDIT_ACTIVITY, FETCH_ACTIVITIES } from './type';
import { AccountingApi } from '../../_core/api/accountingApi';
import { Activity } from '../../_core/api/api';

export const fetchActivities = (accountId?: string) => async (dispatch: any) =>{
    const api = new AccountingApi();
    // { filter: [`accountId||$eq||${accountId}`] }
    const response = await api.activities.getManyBaseActivityControllerActivity();
    return dispatch({type: FETCH_ACTIVITIES, payload: response.data});
}

export const createActivity = (activity: Activity) => async (dispatch: any) => {
    const api = new AccountingApi();
    const response = await api.activities.createOneBaseActivityControllerActivity(activity);
    return dispatch({type: CREATE_ACTIVITY, payload: response.data });
}

export const editActivity = (activity: Activity) => async (dispatch: any) => {
    const api = new AccountingApi();
    const oldPrice = activity.amount;
    const response = await api.activities.createOneBaseActivityControllerActivity(activity);
    return dispatch({ type: EDIT_ACTIVITY, payload: {activity: response.data, oldPrice} });
}

export const deleteActivity = (activity: Activity) => async (dispatch: any) => {
    const api = new AccountingApi();
    await api.activities.deleteOneBaseActivityControllerActivity(activity.id);
    return dispatch({ type: DELETE_ACTIVITY, payload: activity });
}
