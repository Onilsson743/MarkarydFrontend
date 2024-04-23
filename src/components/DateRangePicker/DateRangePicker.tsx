'use client'

import React, { useEffect, useState } from 'react';
import "./DateRangePicker.scss"
import dayjs, { Dayjs } from 'dayjs';
import {  DateRange, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import book from '@/app/book/page';


interface IBooking {
  startDate: Date
  endDate: Date
}

const DateRangePicker = () => {
    const [value, setValue] = useState<DateRange<Dayjs>>([null,null]);
    const bookings : IBooking[] = [
      {
        startDate: new Date(2024, 3, 12),
        endDate: new Date(2024, 3, 14)
      }
    ]
    const isBooked =  (date: Dayjs) => {
      const day = date.toDate();
      var booked = false;

      if(bookings.length > 0) {
        bookings.forEach(x => {
          if (day >= x.startDate && day <= x.endDate) {
            booked = true;
          }
        });
      }   
      return booked; 
    };
  return (
    <div>
      {/* <button onClick={() => isWeekend()}>CLICK ME</button> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangeCalendar value={value} onChange={(x) => setValue(x)} calendars={1} disablePast shouldDisableDate={isBooked} />  
      </LocalizationProvider>
    </div>
  )
}

export default DateRangePicker