import {
    ActionInterface,
    CREATE_ACTIVITY,
    DELETE_ACTIVITY,
    EDIT_ACTIVITY,
    FETCH_ACTIVITIES,
} from '../actions/type';
import { reduce } from 'lodash';
import { AccountingType } from '../../_core/constants';
const INITIAL_STATE = {
    amountIn: 0,
    amountOut: 0,
}

const accountingReducer = (state = INITIAL_STATE, action: ActionInterface) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            const activities = action.payload || [];
            const taskOutComes = activities.filter((activity: any ) => activity.type === AccountingType.OUTCOME) || [];
            const taskInComes = activities.filter((activity: any ) => activity.type === AccountingType.INCOME) || [];
            return {
                ...state,
                amountIn: reduce(taskInComes, (init: number, activity: any) => {return init + (activity.amount || 0)}, 0),
                amountOut: reduce(taskOutComes, (init: number, activity: any) => {return init + (activity.amount || 0)}, 0)
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                amountIn: action.payload.type === AccountingType.INCOME ? state.amountIn + action.payload.amount : state.amountIn,
                amountOut: action.payload.type === AccountingType.OUTCOME ? state.amountOut + action.payload.amount : state.amountOut,
            };
        case EDIT_ACTIVITY:
            console.log('edit', action);
            const oldActivity = action.payload.oldActivity;
            const activity = action.payload.activity;
            let amountIn = state.amountIn;
            let amountOut = state.amountOut;
            if (oldActivity.type === activity.type) {
                amountIn = activity.type === AccountingType.INCOME ? amountIn - oldActivity.amount + activity.amount : amountIn;
                amountOut = activity.type === AccountingType.OUTCOME ? amountOut - oldActivity.amount + activity.amount : amountOut;
            } else {
                amountIn = activity.type === AccountingType.INCOME ? amountIn + activity.amount : amountIn - oldActivity.amount;
                amountOut = activity.type === AccountingType.OUTCOME ? amountOut + activity.amount : amountOut - oldActivity.amount;
            }
            return {
                ...state,
                amountIn,
                amountOut,
            };
        case DELETE_ACTIVITY:
            return {
                ...state,
                amountIn: action.payload.type === AccountingType.INCOME ? state.amountIn - action.payload.amount : state.amountIn,
                amountOut: action.payload.type === AccountingType.OUTCOME ? state.amountOut - action.payload.amount : state.amountOut,
            };

        default:
            return state;
    }
}

export default accountingReducer;