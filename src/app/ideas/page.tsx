import React from 'react'
import "./ideas.scss"
import IdeasListComonent from '@/components/IdeasListComonent'
import SmallHeader from '@/components/Header/SmallHeader/SmallHeader'



const ideas = () => {


  return (
    <>
      <SmallHeader />
      <div className='ideas-page container'>
        <IdeasListComonent />
      </div>
    </>    
  )
}

export default ideas