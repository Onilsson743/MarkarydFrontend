"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import "./styles/Navbar.scss"

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <header className="navigationbar">
        <nav className="container">
          <Link href="/" className='logo'>Markaryd</Link>
          <div className='links'> 
            <button onClick={() => setToggle(!toggle)} className={"hamburger " + (toggle ? " toggle " : "")} type="button">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </button>

          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar