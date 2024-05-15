import { IBookingRequest } from "@/models/IBookingRequest";

const api : string = process.env.NEXT_PUBLIC_WEB_API_CONNECTION_STRING!



export const GetAllBookings = async () => {
    return await fetch(`${api}/Booking/GetAllBookings`, {
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

export const SendBookingRequest = async (bookingRequest : IBookingRequest) => {
    return await fetch(`${api}/Booking/SendBookingRequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingRequest)
    }).then(response => {
        return response;
    }).catch(error => {
        return error;
    });
}

