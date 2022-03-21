import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  FETCH_TRANSACTIONS,
} from "./type";

export const fetchTransactions =
  (lenderId: number) => async (dispatch: any) => {
    const data = [
      {
        id: 1,
        description: "Moi tra",
        money: 2000000,
        lenderId: 1,
        createAt: "12/11/2021",
      },
      {
        id: 2,
        money: 1000000,
        lenderId: 1,
        createAt: "12/11/2021",
      },
      {
        id: 3,
        description: "Moi tra",
        money: 2000000,
        lenderId: 1,
        createAt: "12/11/2021",
      },
    ];
    return dispatch({ type: FETCH_TRANSACTIONS, payload: data });
  };

export const createTransaction =
  (transaction: any) => async (dispatch: any) => {
    // const api = new AccountingApi();
    // const response = await api.category.createOneBaseCategoryControllerCategory(category as CreateCategoryDto);
    return dispatch({ type: CREATE_TRANSACTION, payload: transaction });
  };

export const editTransaction =
  (transactionUpdated: any, oldTransaction: any) => async (dispatch: any) => {
    // const api = new AccountingApi();
    // const response = await api.category.createOneBaseCategoryControllerCategory(category as CreateCategoryDto);
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
    // const api = new AccountingApi();
    // const response = await api.category.createOneBaseCategoryControllerCategory(category as CreateCategoryDto);
    return dispatch({ type: DELETE_TRANSACTION, payload: transaction });
  };
