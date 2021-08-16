export interface ActionInterface {
    type: string;
    payload: any;
}

export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';
export const FETCH_ACTIVITY = 'FETCH_ACTIVITY';
export const EDIT_ACTIVITY = 'EDIT_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
