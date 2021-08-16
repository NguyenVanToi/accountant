import {
    ActionInterface,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    FETCH_CATEGORIES,
    FETCH_CATEGORY
} from '../actions/type';
import { mapKeys, omit } from 'lodash';

export default (state = {}, action: ActionInterface) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {...state, ...mapKeys(action.payload, 'id')};
        case FETCH_CATEGORY:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_CATEGORY:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_CATEGORY:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_CATEGORY:
            return omit(state, action.payload.id);
        default:
            return state;
    }
}
