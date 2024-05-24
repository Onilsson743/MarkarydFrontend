'use client'

import { DeleteButton } from '@/components/DeleteButton/DeleteButton'
import { FormatDate } from '@/functions/DateFunctions'
import { IBooking } from '@/models/IBooking'
import React from 'react'

const BookingOverSight = ({booking} : {booking : IBooking}) => {
  return (
    <div className='booking'>
        <div className='text'>
            <p>Från: {FormatDate(booking.beginDate)}</p>
            <p>Till: {FormatDate(booking.endDate)}</p>
            {
                (booking.fullName && booking.fullName.length > 0) ? (<p>Bokare: {booking.fullName}</p>) : (<p>Namn: Airbnb</p>)
            }
            {
                (booking.email && booking.email.length > 0) ? (<p>Email: {booking.email}</p>) : (<></>)
            }
        </div>
        <div className='buttons'>
            {
                (booking.email && booking.email.length > 0) ? (<DeleteButton remove={() => console.log("Hello")} />) : (<></>)
            }
            
        </div>

    </div>
  )
}

export default BookingOverSight