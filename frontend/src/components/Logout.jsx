import React from 'react'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast'

const Logout = () => {
    // TO LOGOUT 
    const [authUser, setAuthUser] = useAuth()
    const handleLogout = () => {
        try {
            setAuthUser({
                ...authUser,
                user: null
            })
            localStorage.removeItem("Users")
            toast.success("Logout Successfull")

            setTimeout(() => {
                window.location.reload();
            }, 1000);
            // TO AUTO RELOAD
            // window.location.reload();
        }
        catch (error) {
            toast.error("Error:" + error)
            setTimeout(() => { }, 2000)
        }
    }

    return (
        <div>
            <button className='px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer'
                onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout