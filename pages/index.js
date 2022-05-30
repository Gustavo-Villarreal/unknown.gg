import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { API } from "aws-amplify"
import { listPosts } from "../src/graphql/queries"
export default function Home() {
  const [posts, setPosts] = useState([])
  const router = useRouter()
  
  useEffect(()=>{
    fetchPosts()
  },[])

  const fetchPosts = async () =>{
    const postsResponse = await API.graphql({
      query: listPosts,
    })
    setPosts(postsResponse.data.listPosts.items)
  }

  const renderPosts = () => {
    return posts.map(post => (
      <div key={post.id} onClick={()=> router.push(`/posts/${post.id}`) } className="first:mt-10 mt-5 text-neutral-50 rounded bg-purple-700 px-5 py-2">
        <p>{post.title}</p>
        <p>{post.description}</p>
        <p>by: {post.username}</p>
      </div>
    ));
  }

  return (
    <>
      <h1 className="text-8xl font-bold underline text-neutral-50">
        Hello world!
      </h1>
      <div className="">
        {renderPosts()}
      </div>
    </>
  )
}
