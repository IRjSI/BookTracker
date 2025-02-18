import React from 'react'
import { useForm } from 'react-hook-form'
import authService from './appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { login as authLogin } from './store/authSlice.js'
import { useNavigate } from 'react-router-dom'
import Header from './Header.jsx'
import { Link } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const session = await authService.login(data);
            if (session) {
                dispatch(authLogin(session));
                navigate('/');
            }
        } catch (error) {
            console.log("Error in login",error);
        }
    }

  return (
    <div className='bg-[#011627] min-h-screen text-center p-4'>
        <Header />
        <div className='bg-[#011627] text-white flex items-center justify-center p-4'>
            <div className='bg-[#012b4d] p-8 rounded-lg border-l-4 border-[#0c54a7] max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6'>Login</h2>
                <p>Don't have an account? <Link to="/signup" className='text-[#0c54a7] hover:text-[#0c54a7]/80 transition-colors'>Sign up</Link>    </p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <input
                        className='p-3 rounded-md bg-[#011627] border border-[#0c54a7]/30 focus:outline-none focus:border-[#0c54a7] transition-colors'
                        type="email" {...register('email')} placeholder='Email' />
                    <input
                        className='p-3 rounded-md bg-[#011627] border border-[#0c54a7]/30 focus:outline-none focus:border-[#0c54a7] transition-colors'
                        type="password" {...register('password')} placeholder='Password' />
                    <button 
                        className='p-3 rounded-md bg-[#0c54a7] cursor-pointer hover:bg-[#0c54a7]/80 transition-colors font-medium text-lg'
                        type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login