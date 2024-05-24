import AdminBookingOversight from '@/components/AdminBookingOversight/AdminBookingOversight'
import { IBooking } from '@/models/IBooking';
import { ValidateKey } from '@/scripts/AuthFetch';
import { GetAllBookings } from '@/scripts/BookingsFetch';
import { cookies } from 'next/headers'
import Link from 'next/link';
import React from 'react'

const page = async () => {
    const cookieStore = cookies()
    const cookie = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)
    
    if (cookie) {
        const [auth, bookings] : Response[] = await Promise.all([
            await ValidateKey(cookie.value),
            await GetAllBookings()
        ]);

        if (auth.ok) {
            console.log("auth OK")
            if (bookings.ok) {
                var data : IBooking[] = await bookings.json();
                return (
                    <div className='admin-page'>
                        <AdminBookingOversight bookingsData={data} />
                    </div>                
                )                              
            }   
            return (
                <div className='admin-page'>
                    <h1>Inga bokningar hittade</h1>
                </div>
            )            
        }
    } 
    return (
        <div className='admin-page'>
            <h1>Unauthorized</h1>
            <Link className='admin-btn' href="/admin" >Logga in</Link>
        </div>
    )
    
}

export default page