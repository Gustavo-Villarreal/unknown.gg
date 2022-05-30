import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState({})

    useEffect(()=>{
        checkUser()
    },[])

    const checkUser = async () => {
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
    }
    console.log(user);
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
        </div>
    )
}
export default withAuthenticator(Profile);