export interface ActionInterface {
    type: string;
    payload: any;
}

export const CREATE_ACTIVITY = 'CREATE_TRIP';
export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';
export const FETCH_ACTIVITY = 'FETCH_ACTIVITY';
export const EDIT_ACTIVITY = 'EDIT_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
