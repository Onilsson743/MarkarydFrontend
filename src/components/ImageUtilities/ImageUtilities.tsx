import React from 'react'
import "./ImageUtilities.scss"
import CardRound, { ICardRound } from '../CardRound/CardRound'

const ImageUtilities = () => {

  const cards : ICardRound[] = ([
    {
        imageUrl : "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/846419e6-86d9-4bca-a4a8-f0456aaab531.jpeg?im_w=1920",
        text : "Bastu",
      },
      {
        imageUrl : "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/bc5908fd-92ad-4619-be4c-9e79f11bf085.jpeg?im_w=1920",
        text : "Grill",
      },
      {
        imageUrl : "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/7850f593-ac13-44ea-a286-c1b9349c5430.jpeg?im_w=1920",
        text : "Båt"
      },
      {
        imageUrl : "https://a0.muscache.com/im/pictures/d2b36db6-ff6e-4740-9ced-f4bdb12a228d.jpg?im_w=1920",
        text : "Ved"
      },
      {
        imageUrl : "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/972b73d2-af24-4530-bfbd-e9590d505585.jpeg?im_w=1920",
        text : "Plocka svamp"
      }
])

  return (
    <div className='image-utilities'>
      <div className='background-image'>
        <img src="/barkaryd.jpg" alt="" />
      </div>
      <div className='container cards'>
        {
          cards.map((x, index) => <CardRound key={index} imageUrl={x.imageUrl} text={x.text}/>)
        }
      </div>
      
    </div>
  )
}

export default ImageUtilities