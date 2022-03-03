import {
  CREATE_LENDER,
  DELETE_LENDER,
  EDIT_LENDER,
  FETCH_LENDER,
  FETCH_LENDERS,
} from "./../actions/type";
import { ActionInterface } from "../actions/type";
import { omit, mapKeys } from "lodash";

const lenderReducer = (state = {}, action: ActionInterface) => {
  switch (action.type) {
    case FETCH_LENDERS:
      return { ...mapKeys(action.payload, "id") };
    case FETCH_LENDER:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_LENDER:
      return { ...state, [action.payload.lender.id]: action.payload.lender };
    case CREATE_LENDER:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_LENDER:
      return omit(state, action.payload.id);
    default:
      return state;
  }
};
export default lenderReducer;
