import React, { ReactNode } from 'react'
import "./AdminPage.scss";
import "../../styles/core/buttons.scss"

export default function Layout({children} : {children : ReactNode}) {
  return (
    <>
       
        {children}
    </>
  )
}
