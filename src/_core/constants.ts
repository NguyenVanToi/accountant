export enum AccountingType {
    INCOME = 'INCOME',
    OUTCOME = 'OUTCOME'
}

export const UNIT = 'VNĐ'

export enum SummaryType {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    YEAR = 'YEAR'
}

export interface DataSummary {
    nameCategory: string,
    value: {
        inComes?: number,
        outComes?: number
    }
}