import { Transaction } from "./../../_core/api/api";
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  FETCH_TRANSACTION,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_BY_LENDER,
} from "./../actions/type";
import { ActionInterface } from "../actions/type";
import { omit, mapKeys } from "lodash";
const INIT_STATE: {
  data: Transaction[];
} = {
  data: [],
};
const transactionReducer = (state = INIT_STATE, action: ActionInterface) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_BY_LENDER:
      return { data: action.payload };
    case FETCH_TRANSACTIONS:
      return { data: action.payload };
    case FETCH_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_TRANSACTION:
      const _data: Transaction[] = [...state.data];
      const idx = _data.findIndex(
        (tran: Transaction) => tran.id === action.payload.transaction.id
      );
      _data[idx] = action.payload.transaction;
      return {
        ...state,
        data: _data,
      };
    case CREATE_TRANSACTION:
      return { ...state, data: [...state.data, action.payload] };
    case DELETE_TRANSACTION:
      const _data1: Transaction[] = state.data.filter(
        (tran: Transaction) => tran.id !== action.payload.id
      );
      return {
        ...state,
        data: _data1,
      };
    default:
      return state;
  }
};
export default transactionReducer;
