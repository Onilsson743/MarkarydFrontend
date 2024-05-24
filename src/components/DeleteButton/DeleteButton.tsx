'use client'
import React, { useState } from 'react'

export const DeleteButton = ({remove} : {remove : () => void}) => {
    const [toggleDelete, setToggleDelete] = useState<boolean>(false);


    return (
        <div className="delete-button">
            <button onClick={() => setToggleDelete(true)} className={"overlay-button" + (toggleDelete ? " remove-button " : "")}>Ta bort</button>
            <span className="option-buttons">
                <button className="confirm-button delete-button" onClick={() => remove()}>Radera</button>
                <button onClick={() => setToggleDelete(!toggleDelete)} className="cancel-button ">Avbryt</button>
            </span>
        </div>
    )
}
