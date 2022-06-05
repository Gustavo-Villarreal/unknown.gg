import { API } from "aws-amplify";
import { useEffect, useSttae } from "react"
import { postsByUsername } from "../../src/graphql/queries"

const UserProfile = () => {

    return(
        <div>

        </div>
    )
}

export default UserProfile;

export async function getServerSideProps({ res, params }){
    res.setHeader(
        'Cache-Control',
        'public, maxage=60, stale-while-revalidate=59'
    )

    const { username } = params 
    const postData = await API.graphql({
        query: postsByUsername,
        variables: { username }
    })
    return {
        props: {
            posts: postData.data.postsByUsername
        }
    }
}