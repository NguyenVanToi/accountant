import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  FETCH_TRANSACTION,
  FETCH_TRANSACTIONS,
} from "./../actions/type";
import { ActionInterface } from "../actions/type";
import { omit, mapKeys } from "lodash";

const transactionReducer = (state = {}, action: ActionInterface) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      console.log(action.payload);
      return { ...mapKeys(action.payload, "id") };
    case FETCH_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_TRANSACTION:
      return {
        ...state,
        [action.payload.transaction.id]: action.payload.transaction,
      };
    case CREATE_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TRANSACTION:
      return omit(state, action.payload.id);
    default:
      return state;
  }
};
export default transactionReducer;
