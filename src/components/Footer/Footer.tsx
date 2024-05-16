import React from 'react'
import "./Footer.scss"

const Footer = () => {
  return (
    <>
    <div className='footer-margin'></div>
      <footer>
        <div className='container'>
          <div className='contact-info'>
            <ul>
              <li>Email: dan@gmail.com</li>
              <li>+46 070-123 45 67</li>
              <li>Lilla Barkaryd 574 74 Småland, Sweden</li>
            </ul>
          </div>
          <iframe className='google-maps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10620.01125247808!2d14.93333300000001!3d57.18333250000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465746c039ad3de1%3A0x84b5c43303b8939c!2s574%2074%20Lilla%20Barkaryd!5e1!3m2!1sen!2sse!4v1712733858431!5m2!1sen!2sse" loading="lazy" ></iframe>
        </div>
      </footer>
    </>

  )
}

export default Footer