import { IBooking } from "@/models/IBooking";

export const IsDateBooked = (bookings : IBooking[], date : Date) => {
    for(let i = 0; i < bookings.length; i++){
        const beginDate = new Date(bookings[i].beginDate)
        const endDate = new Date(bookings[i].endDate)
        if (date.getDate() <= endDate.getDate() && 
            date.getMonth() <= endDate.getMonth() &&
            date.getDate() >= beginDate.getDate() && 
            date.getMonth() >= beginDate.getMonth()
        ){
            return true;
        }
    }
    return false;
}