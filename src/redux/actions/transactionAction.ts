import { AccountingApi } from "./../../_core/api/accountingApi";
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  FETCH_TRANSACTIONS,
} from "./type";

export const fetchTransactions =
  (lenderId: number) => async (dispatch: any) => {
    const api = new AccountingApi();
    const response =
      await api.transaction.transactionControllerGetTransactionsOfLender(
        lenderId
      );
    return dispatch({ type: FETCH_TRANSACTIONS, payload: response.data });
  };

export const createTransaction =
  (transaction: any) => async (dispatch: any) => {
    const api = new AccountingApi();
    const response =
      await api.transaction.createOneBaseTransactionControllerTransaction(
        transaction
      );
    const transExtend = { ...transaction, ...response.data };
    return dispatch({ type: CREATE_TRANSACTION, payload: transExtend });
  };

export const editTransaction =
  (transactionUpdated: any, oldTransaction: any) => async (dispatch: any) => {
    const api = new AccountingApi();
    await api.category.updateOneBaseCategoryControllerCategory(
      transactionUpdated.id,
      transactionUpdated
    );
    return dispatch({
      type: EDIT_TRANSACTION,
      payload: {
        newMoney: transactionUpdated.money,
        oldMoney: oldTransaction.money,
        transaction: transactionUpdated,
      },
    });
  };
export const deleteTransaction =
  (transaction: any) => async (dispatch: any) => {
    const api = new AccountingApi();
    await api.category.deleteOneBaseCategoryControllerCategory(transaction.id);
    return dispatch({ type: DELETE_TRANSACTION, payload: transaction });
  };
