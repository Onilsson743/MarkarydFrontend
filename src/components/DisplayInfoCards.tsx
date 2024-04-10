
import React from 'react'
import InfoCard, { IInfoCard } from './InfoCard/InfoCard'

const DisplayInfoCards = () => {
    const cards : IInfoCard[] = ([
        {
            imageUrl : "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/846419e6-86d9-4bca-a4a8-f0456aaab531.jpeg?im_w=1920",
            header : "Bastu",
            infoText : "Basta i en mysig bastu"
          },
          {
            imageUrl : "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/bc5908fd-92ad-4619-be4c-9e79f11bf085.jpeg?im_w=1920",
            header : "Grill",
            infoText : "Grilla mitt ute i skogen"
          },
          {
            imageUrl : "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/7850f593-ac13-44ea-a286-c1b9349c5430.jpeg?im_w=1920",
            header : "Båt",
            infoText : "Ta en tur med båten"
          },
          {
            imageUrl : "https://a0.muscache.com/im/pictures/d2b36db6-ff6e-4740-9ced-f4bdb12a228d.jpg?im_w=1920",
            header : "Ved",
            infoText : "Veden är tyvärr redan upphuggen"
          },
          {
            imageUrl : "https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/972b73d2-af24-4530-bfbd-e9590d505585.jpeg?im_w=1920",
            header : "Plocka svamp",
            infoText : "Finns säkert svamp i skogen"
          }
    ])
  return (
    <>
        {
            cards.map((x, index) => {
                <>
                    <InfoCard key={index}
                        imageUrl={x.imageUrl}
                        header={x.header}
                        infoText={x.infoText} 
                    />
                </>
           
            })
        }
      <InfoCard imageUrl={cards[0].imageUrl}
        header={cards[0].header}
        infoText={cards[0].infoText}
      />
      <InfoCard imageUrl={cards[1].imageUrl}
        header={cards[1].header}
        infoText={cards[1].infoText}
        position ={true}
      />
      <InfoCard imageUrl={cards[2].imageUrl}
        header={cards[2].header}
        infoText={cards[2].infoText}
      />
      <InfoCard imageUrl={cards[3].imageUrl}
        header={cards[3].header}
        infoText={cards[3].infoText}
        position ={true}
      />
      <InfoCard imageUrl={cards[4].imageUrl}
        header={cards[4].header}
        infoText={cards[4].infoText}
      />
    </>
  )
}

export default DisplayInfoCards