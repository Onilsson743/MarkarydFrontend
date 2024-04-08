"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import "../styles/components/Navbar.scss"

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <header className="container">
        <nav className="navigationbar">
          <Link href="/" className='logo'>Barkaryd</Link>
          <div className='menu'> 
            <button onClick={() => setToggle(!toggle)} className={"hamburger " + (toggle ? " toggle " : "")} type="button">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </button>
            <ul className={'links ' + (toggle ? " show " : "")}>
              <li>
                <Link href="/ideas" onClick={() => setToggle(!toggle)} className='link'>Idéer</Link>
              </li>
              <li>
                <Link href="/book" onClick={() => setToggle(!toggle)} className='link'>Boka</Link>
              </li>
              <li>
                <Link href="/info" onClick={() => setToggle(!toggle)} className='link'>Info</Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setToggle(!toggle)} className='link'>Kontakt</Link>
              </li>
              <li>
                <Link href="/guest-book" onClick={() => setToggle(!toggle)} className='link'>Gästbok</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar