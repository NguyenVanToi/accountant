import { ActionInterface } from '../actions/type';

const loadingReducer = (state = {}, action: ActionInterface) => {
    const { type, payload } = action;
    const matches = /(.*)_(REQUEST|COMPLETE|ERROR)/.exec(type);
    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return {
        ...state,
        [requestName]: requestState === 'REQUEST',
        error: requestState === 'FAILURE' ? payload.message: null
    }
}

export default loadingReducer;