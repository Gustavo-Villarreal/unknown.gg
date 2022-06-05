import { API, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { postsByUsername } from "../src/graphql/queries";
import Post from "../components/post";

const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState('')

    useEffect(()=>{
        getUserPosts()
    },[])

    const getUserPosts = async () => {
        try{
            let { username } = await Auth.currentAuthenticatedUser()
            setUsername(username)
            let { data } = await API.graphql({
                query: postsByUsername,
                variables: { username } 
            })
            setPosts(data.postsByUsername.items)
        }catch(e){
            console.log(e);
        }
    }
    return(
        <div className="mt-10 mx-5 ">
            <div className="px-3 py-4 mx-auto max-w-4xl flex items-center rounded-md bg-stone-700">
                <div>
                    <div className="w-20 h-20 rounded-full bg-white"/>
                </div>
                <div>
                    <p className="text-xl text-white ml-4">{username}</p>
                    <p className="text-md text-neutral-400 ml-4">Gamer boy that developed this shitty as page</p>
                </div>
            </div>

            <div className="mt-3 px-3 py-4 mx-auto max-w-4xl rounded-md bg-stone-700">
                <p className="text-xl text-white">Posts</p>
                { posts.map(post => <Post key={post.id} post={post} username={username}/>) }
            </div>

        </div>
    )
    
}
export default MyPosts
