import {
  CREATE_LENDER,
  DELETE_LENDER,
  EDIT_LENDER,
  FETCH_LENDER,
  FETCH_LENDERS,
} from "./type";

export const fetchLenders = () => async (dispatch: any) => {
  const data = [
    {
      id: 1,
      name: "Nha A",
      description: "Moi tra",
      money: 5000000,
    },
    {
      id: 2,
      name: "Nha B",
      money: 1000000,
    },
    {
      id: 3,
      name: "Nha C",
      description: "Moi tra",
      money: 2000000,
    },
  ];
  return dispatch({ type: FETCH_LENDERS, payload: data });
};

export const fetchLender = (id: number) => async (dispatch: any) => {
  // const api = new AccountingApi();
  // const response = await api.category.createOneBaseCategoryControllerCategory(category as CreateCategoryDto);
  return dispatch({
    type: FETCH_LENDER,
    payload: {
      id: 1,
      name: "Nha A",
      description: "Moi tra",
      money: 5000000,
    },
  });
};

export const createLender = (lender: any) => async (dispatch: any) => {
  // const api = new AccountingApi();
  // const response = await api.category.createOneBaseCategoryControllerCategory(category as CreateCategoryDto);
  return dispatch({ type: CREATE_LENDER, payload: lender });
};

export const editLender =
  (lenderUpdated: any, oldLender: any) => async (dispatch: any) => {
    // const api = new AccountingApi();
    // const response = await api.category.createOneBaseCategoryControllerCategory(category as CreateCategoryDto);
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
  // const api = new AccountingApi();
  // const response = await api.category.createOneBaseCategoryControllerCategory(category as CreateCategoryDto);
  return dispatch({ type: DELETE_LENDER, payload: lender });
};
