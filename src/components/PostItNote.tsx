import React from 'react'
import "../styles/components/PostItNote.scss"
import { DeleteOneIdea } from '@/scripts/IdeasFetch'

interface props {
    idea: IIdea
    refetch: () => {}
}

const PostItNote: React.FC<props> = ({ idea, refetch }) => {

    const deletePostit = async () => {
        var response : Response = await DeleteOneIdea(idea.id);
        if (response.ok) {
            refetch();
        }
    }
    return (
        <div className='postit'>
            <p>{idea.message}</p>
            <i className="bi bi-trash3-fill delete-icon" onClick={() => deletePostit()}></i>
        </div>
    )
}

export default PostItNote