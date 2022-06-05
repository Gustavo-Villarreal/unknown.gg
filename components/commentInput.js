import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import '../configureAmplify'
import { createComment } from "../src/graphql/mutations";

const CommentInput = ({post, parentID}) =>{
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
            <textarea 
            placeholder="Comment"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="py-1 px-3 bg-neutral-50 border-b pb-2 text-lg focus:outline-none w-full text-neutral-900 placeholder:text-neutral-700 placeholder:font-light"
            />
            <div className="w-100 flex justify-end">
                <button
                    type="button"
                    className="px-3 py-1 rounded bg-violet-500 text-neutral-50 hover:bg-violet-600"
                    onClick={newComment}
                > Submit </button>
            </div>
        </>
    )
}

export default CommentInput