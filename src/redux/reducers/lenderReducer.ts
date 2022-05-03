import { Transaction } from "./../../_core/api/api";
import {
  CREATE_LENDER,
  DELETE_LENDER,
  EDIT_LENDER,
  FETCH_LENDER,
  FETCH_LENDERS,
  CREATE_TRANSACTION,
} from "./../actions/type";
import { ActionInterface } from "../actions/type";
import { omit, mapKeys, get } from "lodash";

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
    case CREATE_TRANSACTION:
      const trans: Transaction = action.payload;
      if (trans.lender) {
        const currentLender = get(state, trans.lender.id.toString());
        console.log("state", currentLender);
        console.log("state", currentLender.money - trans.money);
        return {
          ...state,
          [trans.lender.id]: {
            ...currentLender,
            money: currentLender.money - trans.money,
          },
        };
      }
      return {
        ...state,
      };
    case DELETE_LENDER:
      return omit(state, action.payload.id);
    default:
      return state;
  }
};
export default lenderReducer;
