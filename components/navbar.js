import react from "react";
import Link from "next/link";
import { Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";

import '../configureAmplify';

const routes = [
    { name:'Home', link:'/' },
    { name:'Create Post', link:'/create-post' },
    { name:'Profile', link:'/profile' }
]
const NavBar = () => {
    const [signedUser, setSignedUser] = useState(false)
    
    useEffect(()=>{
        authListener()
    },[])

    const authListener = async () => {
        Hub.listen('auth', data => {
            switch(data.payload.event){
                case"signIn":
                    return setSignedUser(true)
                case"signOut":
                    return setSignedUser(false)
            }
        })
        try{
            await Auth.currentAuthenticatedUser()
            setSignedUser(true)
        }catch{

        }
    }

    return(
        <nav className="flex justify-center pt-3 pb-3 space-x-4 bg-stone-700">
            {
                routes.map(item=>(
                    <Link href={item.link}  key={item.name}>
                        <a className=" rounded-lg px-3 py-2 text-slate-50 font-medium hover:bg-violet-500 hover:text-slate-50">
                            {item.name}
                        </a>
                    </Link>
                ))
            }
            {
                signedUser &&
                <Link href='/my-post'>
                    <a className=" rounded-lg px-3 py-2 text-slate-50 font-medium hover:bg-violet-500 hover:text-slate-50">
                        My Posts
                    </a>
                </Link>
            }
        </nav>
    )
}
export default NavBar;