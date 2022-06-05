import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { API, Auth } from "aws-amplify"
import { listPosts } from "../src/graphql/queries"
import Post from "../components/post"


export default function Home() {
  const [posts, setPosts] = useState([])
  const [username, setUsername] = useState('')
  const router = useRouter()
  
  useEffect(()=>{
    fetchPosts()
    checkUser()
  },[])

  const checkUser = async () => {
      const { username } = await Auth.currentAuthenticatedUser()
      setUsername( username )
  }

  const fetchPosts = async () =>{
    const postsResponse = await API.graphql({
      query: listPosts,
    })
    setPosts(postsResponse.data.listPosts.items)
  }

  return (
    <>
      <div className="landng-header w-full bg-cover">
        <h1 className="text-8xl font-bold underline text-neutral-50">
          Hello world!
        </h1>
      </div>
      <div className="max-w-xl mx-auto">
        { posts.map(post => <Post key={post.id} post={post} username={username}/>) }
      </div>
    </>
  )
}
