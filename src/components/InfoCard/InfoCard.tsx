import React from 'react'
import "./InfoCard.scss"

export interface IInfoCard {
    imageUrl: string
    header: string
    infoText: string
    position?: boolean
}

const InfoCard : React.FC<IInfoCard> = ({imageUrl, header, infoText, position}) => {
  return (
    <div className={'utilities-card container ' + (position ? " reverse " : "")}>
        <div className='image'>
            <img src={imageUrl} alt="" />
        </div>
        <div>
            <h2>{header}</h2>
            <p>{infoText}</p>
        </div>

    </div>
  )
}

export default InfoCard