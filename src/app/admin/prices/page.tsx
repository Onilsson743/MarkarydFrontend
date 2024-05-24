

import React from 'react';
import "./PricesPage.scss";
import { cookies } from 'next/headers';
import { ValidateKey } from '@/scripts/AuthFetch';
import Link from 'next/link';
import BookingDatePrices from '@/components/BookingDatePrices/BookingDatePrices';

const page = async () => {

    const cookieStore = cookies()

    const cookie = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)
    if (cookie) {
        const authResponse: Response = await ValidateKey(cookie.value);
        if (authResponse.ok) {
            return (
                <div className='admin-page'>
                    <h1>Hantera Priser</h1>
                    <BookingDatePrices />
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