import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { v4 as uuid } from 'uuid';
import { withAuthenticator } from "@aws-amplify/ui-react"
import { API, Storage } from "aws-amplify"
import '../configureAmplify'

import { createPost } from '../src/graphql/mutations'

const NewPost = () =>{
    const [post, setPost] = useState({ title: "", description: ""});
    const [image, setImage] = useState(null);
    const router = useRouter();
    const imageFileInput = useRef(null)

    const onChange = (e) => {
        setPost(()=>({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    const newPost = async () => {
        const { title, description } = post;
        if( !title || !description ) return;
        const id = uuid();
        post.id = id;
        if(image){
            const filename = `${id}_${image.name}`
            post.coverImage = image
            console.log(image,filename);
            let storageResponse = await Storage.put(filename,image)
            console.log(storageResponse);
        }
        let response = await API.graphql({
            query:createPost,
            variables: { input: post },
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        router.push(`/posts/${id}`)
    }

    const handleClick = () => {
        imageFileInput.current.click()
    }

    const handleFileChage = (e) => {
        const fileUploaded = e.target.files[0]
        if(!fileUploaded) return
        setImage(fileUploaded)
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
            <textarea
                name="description"
                placeholder="Description"
                value={post.description}
                onChange={onChange}
                className="bg-transparent border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-neutral-50 placeholder:text-neutral-400"
            />

            <input
                type="file"
                ref={imageFileInput}
                className="hidden"
                onChange={handleFileChage}
            />
            { 
                image && 
                <div className="block mx-auto w-fit">
                    <img src={URL.createObjectURL(image)} className='block' height='300' width='300'/> 
                </div>
                
            }
           
            
            <button
                type="button"
                className="rounded bg-violet-500 text-neutral-50 px-3 py-1 hover:bg-violet-600"
                onClick={newPost}
            > Create Post </button>
            <button
                type="button"
                className="ml-3 rounded bg-violet-500 text-neutral-50 px-3 py-1 hover:bg-violet-600"
                onClick={handleClick}
            > Upload Image </button>

        </div>
    )
}
export default withAuthenticator(NewPost)