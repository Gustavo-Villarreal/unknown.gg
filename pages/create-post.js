import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { withAuthenticator } from "@aws-amplify/ui-react"
import { API } from "aws-amplify"
import { createPost } from '../src/graphql/mutations'

const NewPost = () =>{
    const [post, setPost] = useState({ title: "", description: ""});
    const router = useRouter();

    const onChange = (e) => {
        setPost(()=>({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    const newPost = async () => {
        const { title, description } = post
        if( !title || !description ) return;
        let response = await API.graphql({
            query:createPost,
            variables: { input: post },
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        let { id } = response.data.createPost
        router.push(`/posts/${id}`)
    }

    return(
        <div>
            <h1 className="text-lg text-neutral-50 font-bold">Create Post</h1>
            <input
                name="title"
                placeholder="Title"
                value={post.title}
                onChange={onChange}
                className="bg-transparent border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-neutral-50 placeholder:text-neutral-400"
            />
            <input
                name="description"
                placeholder="Description"
                value={post.description}
                onChange={onChange}
                className="bg-transparent border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-neutral-50 placeholder:text-neutral-400"
            />
            <button
                type="button"
                className="rounded bg-violet-500 text-neutral-50 px-3 py-1 hover:bg-violet-600"
                onClick={newPost}
            > Create Post </button>

        </div>
    )
}
export default withAuthenticator(NewPost)