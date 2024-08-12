import {useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated  } = useAuth0();
    const [open, setOpen] = useState(false)


function LoggedIn() {
    if (user && isAuthenticated){
        return  (<>        
            <a href='/admin' className={`mx-4`}>
                Admin
            </a>
            <a href='/application' className={`mx-4`}>
                Application
            </a>
            <button onClick={() => {logout({ logoutParams: { returnTo: window.location.origin } })}} className={`mx-4`}>
                Log Out
            </button>
            </>)
    }
    return (<>

            <button onClick={() => {loginWithRedirect()}} className={`mx-4`}>
                Log In
            </button>
        </>
    )
}

function MobileNav({open, setOpen}) {
    if (user && isAuthenticated){
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform overflow-hidden ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <a className="text-xl font-semibold" href="/"><img src="https://studio.volt-it.be/studio-volt-it.png" alt="logo" width={100} height={100}/></a>
            </div>
            <div className="flex flex-col ml-4">
                <a href='/admin' className={`mx-4`}>
                Admin
            </a>
            <a href='/application' className={`mx-4`}>
                Application
            </a>
            <a className="text-xl font-medium my-4 text-center" onClick={() => {logout({ logoutParams: { returnTo: window.location.origin } });setTimeout(() => {setOpen(!open)}, 100)}}>
                Log Out
                </a>
            </div>  
        </div>
    )
    } else {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
        <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
            <a className="text-xl font-semibold" href="/"><img src="https://studio.volt-it.be/studio-volt-it.png" alt="logo" width={100} height={100}/></a>
        </div>
        <div className="flex flex-col ml-4">
            <a className="text-xl font-medium my-4 text-center" onClick={() => {setTimeout(() => {setOpen(!open)}, 100); loginWithRedirect()}}>
                Log In
            </a>
        </div>  
    </div>
    )
}
}


    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center top-0 right-0 left-0 w-full fixed">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <a className="text-2xl font-semibold" href="/"><img src="https://studio.volt-it.be/studio-volt-it.png" alt="logo" width={150} height={150}></img></a>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    {/* hamburger button */}
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex text-xl">
                    <LoggedIn/>
                </div>
            </div>
        </nav>
    )
}