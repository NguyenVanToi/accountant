import { Category, Summary } from './../../_core/api/api';
import { SummaryType, DataSummary } from './../../_core/constants';
import { fetchCategories } from './categoryAction';
import { AccountingApi } from '../../_core/api/accountingApi';
import { FETCH_SUMMARIES } from './type';
import moment from 'moment';
import { isEmpty } from 'lodash';
export interface FilterSummary {
    type: string,
    value: string,  // Date format YYYY-MM-DD
}

export const matchSummary = ({type, value}: {type: string, value: any}) => async (dispatch: any, getState: any) => {

    let categories: Category[] = getState().category;
    console.log(categories);
    if (!categories || isEmpty(categories)) {
        await dispatch(fetchCategories());
        categories = getState().category;
    }
    categories = Object.values(categories);
    
    const api = new AccountingApi();
    let filter: any = [];
    let day = 0;
    let week = 0;
    let month = 0;
    let year = moment().get('year');
    switch(type) {
        case SummaryType.DAY:
            day = moment(value).day() + 1;
            week = moment(value).get('week');
            month = moment(value).get('month') + 1;
            break;
        case SummaryType.WEEK:
            day = -1;
            week = value;
            month = moment().week(value).get('month') + 1;
            break;
        case SummaryType.MONTH:
            day = -1;
            week = -1;
            month = value;
            break;
    };
    filter = [
        `day||$eq||${day}`,
        `week||$eq||${week}`,
        `month||$eq||${month}`,
        `year||$eq||${year}`,
    ];
    const response: any = await api.summary.getManyBaseSummaryControllerSummary({filter: [...filter]});
    console.log(response);
    
    if (!response.data || response.data.length <= 0) {
        return dispatch({ type: FETCH_SUMMARIES, payload: [] });
    }
    const result = JSON.parse(response.data[0].data);
    
    const data: any = Object.keys(result).map(key => {
        return {categoryId: +key, value: result[key]};
    });   

    let payload: DataSummary[] = [];
    data.forEach((element: any) => {
        const category = categories.find(cate => cate.id === element.categoryId);
        if (category) {
            payload.push({nameCategory: `${category.code}-${category.name}`, value: element.value});
        }
    });
    console.log(payload);
    return dispatch({ type: FETCH_SUMMARIES, payload });
}

export const fetchSummaries = () => async (dispatch: any, getState: any) =>{
    const api = new AccountingApi();
    const response = await api.summary.getManyBaseSummaryControllerSummary();
    return dispatch({type: FETCH_SUMMARIES, payload: response.data});
}
