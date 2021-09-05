import { ActionInterface, FETCH_SUMMARIES } from '../actions/type';

const summaryReducer = (state = {}, action: ActionInterface) => {
    switch (action.type) {
        case FETCH_SUMMARIES:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}

export default summaryReducer;