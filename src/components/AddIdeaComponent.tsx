'use client'
import "../styles/components/AddIdeaComponent.scss"

import React, { useState } from 'react'

const AddIdeaComponent = () => {
  const [toggle, setToggle] = useState<boolean>();

  const handleSubmit = () => {

  }
  return (
    <>
      <button className="green-small-button" onClick={() => setToggle(true)}><strong>+</strong> Lägg till Idé</button>
        
      <div className={"modal" + (toggle ? " d-block " : "")}>
        <div className="modal-content">
          <h2 className="heading">Lägg till idé så fixar vi det! &#128513;</h2>
          <span className="close" onClick={() => setToggle(false)}>&times;</span>
          <form action="">
            <textarea placeholder="Skriv din idé här..."></textarea>
            <button type="button" className="green-small-button">Spara</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddIdeaComponent