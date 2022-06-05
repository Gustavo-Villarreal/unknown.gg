import { useEffect, useState } from "react";

import CommentInput from "../components/commentInput";

const useCommentInput = (post, parentID) =>{
    const [hidden, setHidden] = useState(true)

    return (
        <>
            { 
                hidden &&
                <button className="px-4 text-neutral-50 flex flex-row items-center" onClick={()=>setHidden(false)}> 
                    <div className="rounded-full h-3 w-3 mr-1 bg-neutral-50"/>
                    Comment
                </button>
            }
            <div className={`pl-4 relative overflow-hidden mb-4 ${hidden&&'h-0'}` }>
                <div className="absolute top-0 bottom-0 border-l-2"/>
                <div className="px-4 ">
                    <CommentInput  post={post} parentID={parentID}/>
                </div>
            </div>
        </>
    )
}

export default useCommentInput