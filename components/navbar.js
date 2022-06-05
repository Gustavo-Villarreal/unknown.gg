import react from "react";
import Link from "next/link";
import { Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import '../configureAmplify';

const routes = [
    { name:'Home', link:'/' },
    { name:'Create Post', link:'/create-post' },
    { name:'Profile', link:'/profile' }
]
const NavBar = () => {
    const [signedUser, setSignedUser] = useState(false)
    const router = useRouter()

    const unselectedClass = 'px-5 py-3 text-neutral-400 font-medium border-b-4 border-transparent hover:text-neutral-200 hover:border-neutral-400'
    const selectedClass = 'px-5 py-3 text-white font-medium border-b-4 border-violet-500'

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
        
        <nav className="flex justify-center bg-stone-700">
        {
            routes.map(item=>(
                <Link href={item.link}  key={item.name}>
                    <a className={(router.pathname == item.link)?selectedClass:unselectedClass}>
                        {item.name}
                    </a>
                </Link>
            ))
        }
        {
            signedUser &&
            <Link href='/my-posts'>
                <a className={(router.pathname == '/my-posts')?selectedClass:unselectedClass}>
                    My Posts
                </a>
            </Link>
        }
        </nav>
    )
}
export default NavBar;

/* 
<div class="navbar bg-base-100">
            <div class="navbar-start">
                <div class="dropdown ">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li tabindex="0">
                        <a class="justify-between">
                            Parent
                            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                        </a>
                        <ul class="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal p-0">
                {
                    routes.map(item=>(
                        <Link href={item.link}  key={item.name}>
                            <a className={(router.pathname == item.link)?selectedClass:unselectedClass}>
                                {item.name}
                            </a>
                        </Link>
                    ))
                }
                {
                    signedUser &&
                    <Link href='/my-posts'>
                        <a className={(router.pathname == '/my-posts')?selectedClass:unselectedClass}>
                            My Posts
                        </a>
                    </Link>
                }
                </ul>
            </div>
            <div class="navbar-end">
                {
                    !signedUser &&
                    <a class="btn">Get started</a>
                }
                
            </div>
            </div> */