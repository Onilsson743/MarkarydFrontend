import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React, { ReactNode } from 'react'

export default function Layout({children} : {children : ReactNode}) {
  return (
    <>
        <Navbar />
        {children}
        <Footer />
    </>
  )
}
