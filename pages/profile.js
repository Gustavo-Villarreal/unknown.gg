import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { useRouter } from 'next/router';
import { API, Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { deleteUserData } from '../src/graphql/mutations'

const Profile = ({signOut}) => {
    const [user, setUser] = useState({})
    const router = useRouter()
    useEffect(()=>{
        checkUser()
    },[])

    const checkUser = async () => {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
    }
    const deleteUserClick = async () => {
        let response = await API.graphql({
            query:deleteUserData,
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        console.log(response);
    }

    if(!user) return null

    return(
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6">
                Profile
            </h1>
            <h1 className="font-mediu text-gray-500 tracking-wide my-2">
                {user.username}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
                {user.attributes?.email}
            </p>
            <div className="w-1">
                <AmplifySignOut/>
            </div>
            <button className="w-100 p-3 bg-red-700" onClick={deleteUserClick}>
                deleteUserData
            </button>
        </div>
    )
}
export default withAuthenticator(Profile);