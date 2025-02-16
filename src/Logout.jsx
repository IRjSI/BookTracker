import React from 'react'
import authService from './appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { logout } from './store/authSlice.js'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.log("Error in logout",error);
        }
    }
  return (
    <div>
        <button onClick={handleLogout} className='text-red-500 cursor-pointer hover:text-red-500/80 transition-colors'>Logout</button>
    </div>
  )
}

export default Logout