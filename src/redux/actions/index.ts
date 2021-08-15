import { CREATE_ACTIVITY, DELETE_ACTIVITY, EDIT_ACTIVITY, FETCH_ACTIVITIES } from './type';

export const fetchActivities = () => {
    return {type: FETCH_ACTIVITIES, payload: []}
}

export const createActivity = (activity: any) => {
    return {type: CREATE_ACTIVITY, payload: activity}
}

export const editActivity = (activity: any) => {
    return { type: EDIT_ACTIVITY, payload: activity }
}

export const deleteActivity = (id: number) => {
    return { type: DELETE_ACTIVITY, payload: null }
}
