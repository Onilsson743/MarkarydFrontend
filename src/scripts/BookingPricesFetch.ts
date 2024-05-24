import { IDateRangePrice, IDateRangePriceFetch } from "@/models/IDateRangePrices";

const api : string = process.env.NEXT_PUBLIC_WEB_API_CONNECTION_STRING!



export const GetAllPrices = async () => {
    return await fetch(`${api}/BookingPrice/GetPrices`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache'
    }).then(response => {
        return response;
    }).catch(error => {
        return error;
    });
}

export const AddNewDateRangePrice = async (dateRange : IDateRangePrice | IDateRangePriceFetch) => {
    return await fetch(`${api}/BookingPrice/AddNewBookingPrice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        body: JSON.stringify(dateRange)
    }).then(response => {
        return response;
    }).catch(error => {
        return error;
    });
}

export const RemoveDateRangePrice = async (dateRangeId : number) => {
    return await fetch(`${api}/BookingPrice/RemoveDateRangePrice?dateRangeId=${dateRangeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        return response;
    }).catch(error => {
        return error;
    });
}