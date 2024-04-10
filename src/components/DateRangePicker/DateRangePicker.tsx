'use client'

import React, { useState } from 'react';
import "./DateRangePicker.scss"
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

const DateRangePicker = () => {
    const [date, setDate] = useState(dayjs());


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangeCalendar calendars={1} disablePast  />  
      </LocalizationProvider>
    </div>
  )
}

export default DateRangePicker