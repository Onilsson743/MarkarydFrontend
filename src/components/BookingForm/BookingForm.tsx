'use client'

import React, { useState } from 'react'
import "./BookingForm.scss"
import BasicDateCalendar from '../BasicDateCalendar/BasicDateCalendar'
import { GetMonthName } from '@/functions/DateFunctions'

const BookingForm = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>();
    return (
        <div className='booking-form container'>
            <div>
                <BasicDateCalendar setStartDate={setStartDate} setEndDate={setEndDate}/>
                <h6>Från: <strong>{startDate && startDate.getDate().toString() + "e " + GetMonthName(startDate.getMonth()) + " " + startDate.getFullYear()}</strong></h6>
                <h6>Till: <strong>{endDate && endDate.getDate().toString() + "e " + GetMonthName(startDate.getMonth()) + " " + startDate.getFullYear()}</strong></h6>
            </div>
            <form action="">
                <label htmlFor="name">Namn</label>
                <input type="text" name="name" id="name" />

                <label htmlFor="email">Email</label>
                <input type='email' name="email" id="email" />

                <label htmlFor="message">Meddelande</label>
                <textarea name="message" id="message"></textarea>

                <button>Skicka Bokningsförfrågan</button>
            </form>
        </div>
    )
}

export default BookingForm