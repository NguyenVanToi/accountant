import {
    ActionInterface,
    CREATE_ACTIVITY,
    DELETE_ACTIVITY,
    EDIT_ACTIVITY,
    FETCH_ACTIVITIES,
    FETCH_ACTIVITY
} from '../actions/type';
import { omit, mapKeys } from 'lodash';

export default (state = {}, action: ActionInterface) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            return {...state, ...mapKeys(action.payload, 'id')};
        case FETCH_ACTIVITY:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_ACTIVITY:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_ACTIVITY:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_ACTIVITY:
            return omit(state, action.payload);
        default:
            return state;
    }
}
