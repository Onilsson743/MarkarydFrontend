'use client'
import { AddNewIdea } from "@/scripts/IdeasFetch";
import "../styles/components/AddIdeaComponent.scss"

import React, { useState } from 'react'

interface props {
  refetch : () => {}
}

const AddIdeaComponent : React.FC<props> = ({refetch}) => {
  const [toggle, setToggle] = useState<boolean>();
  const [value, setValue] = useState<string>();

  const handleSubmit = async () => {
    if (value != undefined) {
      var result : Response = await AddNewIdea(value);
      if (result.ok) {
        refetch()
        setToggle(false)
      }
    }
    
  }
  return (
    <>
      <button className="green-small-button" onClick={() => setToggle(true)}><strong>+</strong> Lägg till Idé</button>
        
      <div className={"modal" + (toggle ? " d-block " : "")}>
        <div className="modal-content">
          <h2 className="heading">Skriv ner tankar/idéer över hur sidan ska se ut/fungera.</h2>
          <span className="close" onClick={() => setToggle(false)}>&times;</span>
          <form action="">
            <textarea placeholder="Skriv här..." value={value} onChange={(e) => setValue(e.target.value)}></textarea>
            <button type="button" className="green-small-button" onClick={() => handleSubmit()}>Spara</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddIdeaComponent