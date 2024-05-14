"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import "./Navbar.scss"
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  

  return (
    <>
      {/* <div className='navbar-background'></div> */}
      <header className=" navigationbar-main">
        <nav className="navigationbar container">
          <Link href="/" className='logo'>Barkaryd</Link>
          <div className='menu'> 
            <button onClick={() => setToggle(!toggle)} className={"hamburger " + (toggle ? " toggle " : "")} type="button">
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </button>
            <ul className={'links ' + (toggle ? " show " : "")}>
              <li>
                <Link href="/" onClick={() => setToggle(!toggle)} className={'link ' + (pathname == '/' ? "active" : "")} locale="fr">Hem</Link>
              </li>
              <li>
                <Link href="/ideas" onClick={() => setToggle(!toggle)} className={'link ' + (pathname == '/ideas' ? "active" : "")}>Idéer</Link>
              </li>
              <li>
                <Link href="/info" onClick={() => setToggle(!toggle)} className={'link ' + (pathname == '/info' ? "active" : "")}>Info</Link>
              </li>
              <li>
                <Link href="/book" onClick={() => setToggle(!toggle)} className={'link ' + (pathname == '/book' ? "active" : "")}>Boka</Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setToggle(!toggle)} className={'link ' + (pathname == '/contact' ? "active" : "")}>Kontakt</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar