import { AccountingApi } from "../../_core/api/accountingApi";
import { CreateLenderDto, UpdateLenderDto } from "../../_core/api/api";
import {
  CREATE_LENDER,
  DELETE_LENDER,
  EDIT_LENDER,
  FETCH_LENDER,
  FETCH_LENDERS,
} from "./type";

export const fetchLenders = () => async (dispatch: any) => {
  const api = new AccountingApi();
  const response = await api.lender.lenderControllerLendersWithTransactions();
  return dispatch({ type: FETCH_LENDERS, payload: response.data });
};

export const fetchLender = (id: number) => async (dispatch: any) => {
  const api = new AccountingApi();
  const response = await api.lender.getOneBaseLenderControllerLender(id);
  return dispatch({
    type: FETCH_LENDER,
    payload: response.data,
  });
};

export const createLender = (lender: any) => async (dispatch: any) => {
  const api = new AccountingApi();
  const response = await api.lender.createOneBaseLenderControllerLender(
    lender as CreateLenderDto
  );
  return dispatch({ type: CREATE_LENDER, payload: response.data });
};

export const editLender =
  (lenderUpdated: any, oldLender: any) => async (dispatch: any) => {
    const api = new AccountingApi();
    await api.lender.updateOneBaseLenderControllerLender(
      lenderUpdated.id,
      lenderUpdated as UpdateLenderDto
    );
    return dispatch({
      type: EDIT_LENDER,
      payload: {
        newMoney: lenderUpdated.money,
        oldMoney: oldLender.money,
        lender: lenderUpdated,
      },
    });
  };
export const deleteLender = (lender: any) => async (dispatch: any) => {
  const api = new AccountingApi();
  await api.lender.deleteOneBaseLenderControllerLender(lender.id);
  return dispatch({ type: DELETE_LENDER, payload: lender });
};
