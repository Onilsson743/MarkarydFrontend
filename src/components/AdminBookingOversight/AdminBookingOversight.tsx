'use client'

import React, { useState } from 'react'
import './AdminBookingOversight.scss';
import { IBooking } from '@/models/IBooking';
import BookingOverSight from './BookingOverSight/BookingOverSight';

const AdminBookingOversight = ({ bookingsData }: { bookingsData: IBooking[] }) => {

    const [bookings, setBookings] = useState<IBooking[]>(bookingsData.filter(x => x.email != null));
    const airBnbBookings : IBooking[] = bookingsData.filter(x => x.email == null)

    const RemoveBooking = async () => {

    }

    return (
        <div className='admin-booking-oversight'>
            <h1>Bokningar</h1>
            <h2>Via hemsidan</h2>
            {
                bookings && bookings.map((x, index) =>
                    <>
                        {
                            (x.email && x.email.length > 0) && (
                                <>
                                    <BookingOverSight booking={x} key={index}/>
                                </>
                            )
                        }
                    </>                  
                )
            }
            <h2>Via Airbnb</h2>
            {
            airBnbBookings && airBnbBookings.map((x, index) => 
                <>
                    <BookingOverSight booking={x} />
                </>                
            )}
                
                                    
        </div>
    )
}

export default AdminBookingOversight