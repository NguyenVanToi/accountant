import { AccountingApi } from '../../_core/api/accountingApi';
import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, FETCH_CATEGORIES, FETCH_CATEGORY } from './type';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../../_core/api/api';

export const fetchCategories = () => async (dispatch: any) =>{
    const api = new AccountingApi();
    const response = await api.category.getManyBaseCategoryControllerCategory();
    return dispatch({type: FETCH_CATEGORIES, payload: response.data});
}
export const fetchCategory = (id: number) => async (dispatch: any) =>{
    const api = new AccountingApi();
    const response = await api.category.getOneBaseCategoryControllerCategory(id);
    return dispatch({type: FETCH_CATEGORY, payload: response.data});
}
export const createCategory = (category: Category) => async (dispatch: any) =>{
    const api = new AccountingApi();
    const response = await api.category.createOneBaseCategoryControllerCategory(category as CreateCategoryDto);
    return dispatch({type: CREATE_CATEGORY, payload: response.data});
}
export const editCategory = (category: Category) => async (dispatch: any) =>{
    const api = new AccountingApi();
    const response = await api.category.updateOneBaseCategoryControllerCategory(category.id, category as UpdateCategoryDto);
    return dispatch({type: EDIT_CATEGORY, payload: response.data});
}
export const deleteCategory = (categoryId: number) => async (dispatch: any) =>{
    const api = new AccountingApi();
    const response = await api.category.deleteOneBaseCategoryControllerCategory(categoryId);
    return dispatch({type: DELETE_CATEGORY, payload: response.data});
}
