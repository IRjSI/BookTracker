import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useSelector } from 'react-redux'

function Header() {
  const { status } = useSelector((state) => (state.auth));

  return (
    <div className='sticky top-0 z-50'>
        <header className='border-b-[1.5px] border-[#012b4d] bg-transparent backdrop-blur-md'>
          <nav className="p-4 rounded-md flex justify-between items-center backdrop-blur-md text-[#fafafa]">
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
            {status && <Link to="/" className='text-blue-500'>Book Tracker</Link>}
            </div>
            <div>
              {!status ? (
                <>
                  <Link to="/login" className='mx-4'>Login</Link>
                  <Link to="/signup" className='mx-4'>Signup</Link>
                </>
              ) : (
                <Logout />
              )}
          </div>
        </nav>
        </header>
    </div>
  )
}

export default Header
