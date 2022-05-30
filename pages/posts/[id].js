import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import '../../configureAmplify'
import { getPost } from "../../src/graphql/queries";
import useCommentInput from "../../hooks/useCommentInput";

import Comment from '../../components/comment'

const Post = ({ post }) => {
    const [comments, setComments] = useState(post?.comments || [])
    const commentInput = useCommentInput(post, null)
    //To query data from uri you get it from router.query[id] where [id] is the name of the file you are in
    /*
        const router = useRouter()
        if(router.isFallback){
            return <div>Loading...</div>
        }
        Fallback is only used when page is static
    */
    

    const renderComments = comments => {
        return comments.map( comment => {
            return (
                <div key={comment.id} className='relative mb-10'>
                    <div className="absolute top-0 bottom-0 border-l-2"/>
                    <Comment {...comment} post={post} />
                    {
                        (comment.sons.length > 0) &&
                        <div className="pl-4 relative">
                            <div className="absolute top-0 bottom-0 border-l-2"/>
                            {renderComments(comment.sons)}
                        </div>
                    }
                </div>
            )
        })
    }
    


    return(
        <div>
            <h1 className="text-5xl font-bold text-neutral-50">
                {post?.title || 'test'}
            </h1>
            <p className="text-xl font-semibold text-neutral-300">
                {post?.description}
            </p>
            <p className="text-l text-neutral-500">
                by: {post?.username}
            </p>

            {commentInput}

            {renderComments(comments)}
        </div>
    )
}
export default Post

/* export async function getStaticPaths() {
    const postData = await API.graphql({
        query: listPosts
    })
    const paths = postData.data.listPosts.items.map(post => ({
         params: { id: post.id }
    }))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }){
    const { id } = params 
    const postData = await API.graphql({
        query: getPost,
        variables: { id }
    })
    return {
        props: {
            post: postData.data.getPost
        },
        revalidate:1
    }
}
 */
export async function getServerSideProps({ res, params }){
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=59'
    )

    const { id } = params 
    const postData = await API.graphql({
        query: getPost,
        variables: { id }
    })
    const comments = postData.data.getPost.comments.items
    const getSons = id => {
        let newComments = []
        comments.forEach(item =>{
            if(item.parentID == id){
            newComments.push({
                ...item,
                sons:getSons(item.id)
            })
            }
            
        })
        return newComments
    }
    return {
        props: {
            post: {
                ...postData.data.getPost,
                comments:getSons()
            }
        }
    }
}