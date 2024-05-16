'use client'

import React, { useState } from 'react'
import "./BookingForm.scss"
import BasicDateCalendar from '../BasicDateCalendar/BasicDateCalendar'
import { GetMonthName } from '@/functions/DateFunctions'
import { IBookingRequest } from '@/models/IBookingRequest'
import { SendBookingRequest } from '@/scripts/BookingsFetch'

const BookingForm = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>();
    const [formData, setFormData] = useState({name: "",email: "",message: ""});

    const handleChange = (event : any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(startDate && endDate) {
            const bookingRequest : IBookingRequest = {
                name : formData.name,
                email: formData.email,
                message: formData.message,
                beginDate: startDate.toLocaleDateString(),
                endDate: endDate.toLocaleDateString(),                
            }
            console.log(bookingRequest)
            var response : Response = await SendBookingRequest(bookingRequest);
            if (response.ok) {
                var data = await response.json()
                console.log(data)
            }
        }
        
      }
    return (
        <div className='booking-form container'>
            <div className='calendar-section'>
                <BasicDateCalendar setStartDate={setStartDate} setEndDate={setEndDate}/>
                <h6>Från: <strong>{startDate && startDate.getDate().toString() + "e " + GetMonthName(startDate.getMonth()) + " " + startDate.getFullYear()}</strong></h6>
                <h6>Till: <strong>{endDate && endDate.getDate().toString() + "e " + GetMonthName(startDate.getMonth()) + " " + startDate.getFullYear()}</strong></h6>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Namn</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={(e) => handleChange(e)}/>

                <label htmlFor="email">Email</label>
                <input type='email' name="email" id="email" value={formData.email} onChange={(e) => handleChange(e)}/>

                <label htmlFor="message">Meddelande</label>
                <textarea name="message" id="message" value={formData.message} onChange={(e) => handleChange(e)}></textarea>

                <button className='button-theme'>Skicka Bokningsförfrågan</button>
            </form>
        </div>
    )
}

export default BookingForm