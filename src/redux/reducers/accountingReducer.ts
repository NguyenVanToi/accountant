import { ActionInterface, DELETE_ACTIVITY, EDIT_ACTIVITY, FETCH_ACTIVITIES, FETCH_ACTIVITY } from '../actions/type';
import { reduce } from 'lodash';
import { AccountingType } from '../../_core/constants';
const INITIAL_STATE = {
    amountIn: 0,
    amountOut: 0,
}

export default (state = INITIAL_STATE, action: ActionInterface) => {
    switch (action.type) {
        case FETCH_ACTIVITIES:
            const activities = action.payload || [];
            const taskOutComes = activities.filter((activity: any ) => activity.type === AccountingType.OUTCOME) || [];
            const taskInComes = activities.filter((activity: any ) => activity.type === AccountingType.INCOME) || [];
            return {
                ...state,
                amountIn: reduce(taskOutComes, (init: number, activity: any) => {return init + (activity.amount || 0)}, 0),
                amountOut: reduce(taskInComes, (init: number, activity: any) => {return init + (activity.amount || 0)}, 0)
            }
        case EDIT_ACTIVITY:
            const oldPrice = action.payload.oldPrice;
            const activity = action.payload.acivity;
            return {
                ...state,
                amountIn: activity.type === AccountingType.INCOME ? state.amountIn - oldPrice + activity.amount : state.amountIn,
                amountOut: activity.type === AccountingType.OUTCOME ? state.amountOut - oldPrice + activity.amount : state.amountOut,
            };
        case DELETE_ACTIVITY:
            return {
                ...state,
                amountIn: action.payload.type === AccountingType.INCOME ? state.amountIn + action.payload.amount : state.amountIn,
                amountOut: action.payload.type === AccountingType.OUTCOME ? state.amountOut + action.payload.amount : state.amountOut,
            };

        default:
            return state;
    }
}
