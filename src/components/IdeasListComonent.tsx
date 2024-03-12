'use client'

import { GetAllIdeas } from '@/scripts/IdeasFetch';
import React, { useEffect, useState } from 'react'
import PostItNote from './PostItNote';
import AddIdeaComponent from './AddIdeaComponent';

const IdeasListComonent = () => {
    const [ideas, setIdeas] = useState<IIdea[]>();


    const fetchIdeas = async () => {
        var result: Response = await GetAllIdeas();
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
        <>
            {ideas &&
                <div className='post-it-notes'>
                    {ideas.map(idea => <PostItNote idea={idea} refetch={fetchIdeas} key={idea.id} />)}
                </div>
            }

            <AddIdeaComponent refetch={fetchIdeas} />
        </>
    )
}

export default IdeasListComonent