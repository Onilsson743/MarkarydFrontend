'use client'

import AddIdeaComponent from '@/components/AddIdeaComponent'
import React, { useEffect, useState } from 'react'
import "./ideas.scss"
import { GetAllIdeas } from '@/scripts/IdeasFetch'
import PostItNote from '@/components/PostItNote'

const ideas = () => {
  const [ideas, setIdeas] = useState<IIdea[]>();


  const fetchIdeas = async () => {
    var result : Response = await GetAllIdeas();
    if (result.ok) {
      setIdeas(await result.json())
    } else {
      setIdeas(undefined)
    }
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  return (
    <div className='ideas-page container'>
      {ideas &&
        <div className='post-it-notes'>
          {ideas.map(idea => <PostItNote idea={idea} refetch={fetchIdeas} key={idea.id}/>)}
        </div>        
      }
      
      <AddIdeaComponent refetch={fetchIdeas}/>   
    </div>
  )
}

export default ideas