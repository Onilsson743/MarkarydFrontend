import React from 'react'
import "./CardRound.scss"

export interface ICardRound {
    imageUrl: string
    text: string
}

const CardRound : React.FC<ICardRound> = ({imageUrl, text}) => {
  return (
    <div className='card-round'>
        <img src={imageUrl} alt="" />
        <div className='text'>
            <h3>{text}</h3>
        </div>
        
    </div>
  )
}

export default CardRound