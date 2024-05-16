import React from 'react'
import "./LoadingSpinner.scss"

export const LoadingSpinner = () => {
  return (
    <div className='spinner-body'>
      <div className="spinner">
        <div className="spinner-text">Laddar</div>
        <div className="spinner-sector spinner-sector-red"></div>
        <div className="spinner-sector spinner-sector-blue"></div>
        <div className="spinner-sector spinner-sector-green"></div>
      </div>
      {/* <div className="spinner"></div> */}
    </div>
   
  )
}
