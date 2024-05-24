import { IDateRangePrice } from "@/models/IDateRangePrices";

export const GetDatePrice = (date : Date, datePrices : IDateRangePrice[]) => {
    var returnPrice = 0;
    datePrices.map(price => {
        if(price.startDate && price.endDate) {
            const startDate = new Date(price.startDate)
            const endDate = new Date(price.endDate)

            if(date.getDate() <= endDate.getDate() && 
            date.getMonth() <= endDate.getMonth() &&
            date.getDate() >= startDate.getDate() && 
            date.getMonth() >= startDate.getMonth()) {
                returnPrice = price.price
                
            }
        }              
    })
    return returnPrice;
}