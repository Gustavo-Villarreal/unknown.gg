import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { API } from "aws-amplify"
import { updatePost } from '../src/graphql/mutations'

const EditPost = ({post}) =>{
    const [newPost, setNewPost] = useState({id: post.id, title:post.title, description:post.description });
    const router = useRouter();

    const onChange = (e) => {
        setNewPost(()=>({
            ...newPost,
            [e.target.name]: e.target.value
        }))
        console.log(e.target.name);
    }

    const sendUpdate = async () => {
        const { title, description } = post
        if( !title || !description ) return;
        let response = await API.graphql({
            query: updatePost,
            variables: { input: newPost  },
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        let { id } = response.data.updatePost
        router.push(`/posts/${id}`)
    }

    return(
        <div>
            <h1 className="text-lg text-neutral-50 font-bold">Create Post</h1>
            <input
                name="title"
                placeholder="Title"
                value={newPost.title}
                onChange={onChange}
                className="bg-transparent border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-neutral-50 placeholder:text-neutral-400"
            />
            <input
                name="description"
                placeholder="Description"
                value={newPost.description}
                onChange={onChange}
                className="bg-transparent border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-neutral-50 placeholder:text-neutral-400"
            />
            <button
                type="button"
                className="rounded bg-violet-500 text-neutral-50 px-3 py-1 hover:bg-violet-600"
                onClick={sendUpdate}
            > Update </button>

        </div>
    )
}
export default EditPost