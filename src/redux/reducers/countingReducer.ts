import {
  CREATE_LENDER,
  CREATE_TRANSACTION,
  DELETE_LENDER,
  EDIT_LENDER,
  FETCH_LENDER,
  FETCH_LENDERS,
} from "./../actions/type";
import { ActionInterface } from "../actions/type";
import { reduce } from "lodash";
import { Transaction } from "../../_core/api/api";
const INITIAL_STATE = {
  total: 0,
};
const countingReducer = (state = INITIAL_STATE, action: ActionInterface) => {
  switch (action.type) {
    case FETCH_LENDERS:
      return {
        ...state,
        total: reduce(
          action.payload,
          (init: number, lender: any) => {
            return init + lender.money;
          },
          0
        ),
      };
    case CREATE_LENDER:
      return {
        ...state,
        total: state.total + action.payload.money,
      };
    case EDIT_LENDER:
      return {
        ...state,
        total: state.total + action.payload.newMoney - action.payload.oldMoney,
      };
    case DELETE_LENDER:
      return {
        ...state,
        total: state.total - action.payload.money,
      };
    default:
      return state;
  }
};
export default countingReducer;
