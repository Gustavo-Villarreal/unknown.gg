import { useEffect, useState } from "react"
import useCommentInput from '../hooks/useCommentInput'

export default ({post, id, content, username}) =>{
    const [newContent, setNewContent] = useState('')
    const commentInput = useCommentInput(post, id)


    return(
        <>
            <div className="px-4 py-2">
                <div>
                    <p className="text-neutral-50">
                        {content}
                    </p>
                    <p className="text-neutral-400">by: {username}</p>
                </div>
            </div>
            {commentInput}
        </>
        
    )
}