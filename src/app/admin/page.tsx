import React from 'react'
import { cookies } from 'next/headers'
import AdminKey from '@/components/AdminKey/AdminKey'
import './AdminPage.scss'
import Link from 'next/link'
import { ValidateKey } from '@/scripts/AuthFetch'

const page = async () => {

  const cookieStore = cookies()
  
  const cookie = cookieStore.get(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!)
  if (cookie) {
    const authResponse : Response = await ValidateKey(cookie.value);
    if (authResponse.ok) {
      return (
        <div className='admin-page'>
          <h1>Admin panelen</h1>
          <div className='options'>
            <Link href="/admin/" className='admin-btn'>Hantera Priser</Link>
            <Link href="/admin/" className='admin-btn'>Hantera Bokningar</Link>
          </div>
        </div>
      )
    }
  }
  return (
    <AdminKey />
  )
}

export default page