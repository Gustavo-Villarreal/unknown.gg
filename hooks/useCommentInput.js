import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import '../configureAmplify'
import { createComment } from "../src/graphql/mutations";

const useCommentInput = (post, parentID) =>{
    const [hidden, setHidden] = useState(true)
    const [content, setContent] = useState('')

    const newComment = async () => {
        if(!content) return
        let response = await API.graphql({
            query:createComment,
            variables: { input: { postID: post?.id, content, parentID } },
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
    }

    return (
        <>
            { 
                hidden &&
                <button className="pb-2 px-4 text-neutral-50 flex flex-row items-center" onClick={()=>setHidden(false)}> 
                    <div className="rounded-full h-3 w-3 mr-1 bg-neutral-50"/>
                    Comment
                </button>
            }
            <div className={`pl-4 relative overflow-hidden mb-4 ${hidden&&'h-0'}` }>
                <div className="absolute top-0 bottom-0 border-l-2"/>
                <div className="px-4 py-3 ">
                    <textarea 
                    placeholder="Comment"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="py-1 px-3 bg-neutral-50 border-b pb-2 text-lg mt-4 focus:outline-none w-full text-neutral-900 placeholder:text-neutral-700 placeholder:font-light"
                    />
                    <div className="w-100 flex justify-end">
                        <button
                            type="button"
                            className="px-3 py-1 rounded bg-violet-500 text-neutral-50 hover:bg-violet-600"
                            onClick={newComment}
                        > Submit </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default useCommentInput