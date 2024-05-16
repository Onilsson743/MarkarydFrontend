// import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { ApproveBooking } from '@/scripts/BookingsFetch'
import React from 'react'

const page = async ({params}: {params: { id: string }}) => {
    var response : Response = await ApproveBooking(params.id);
    if (response.ok) {
        return (
            <div>
               <h1>Approved!</h1>
            </div>
          )
    } else {
        return (
            <div>
               <h1>Not Approved!</h1>
            </div>
          )
    }
  
}

export default page