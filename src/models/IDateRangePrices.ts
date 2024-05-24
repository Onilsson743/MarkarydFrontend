export interface IDateRangePrice {
    id?: number
    price: number
    startDate?: Date
    endDate?: Date 
    isDefaultPrice: boolean
}
export interface IDateRangePriceFetch {
    id?: number
    price: number
    startDate: string
    endDate: string
    isDefaultPrice: boolean
}