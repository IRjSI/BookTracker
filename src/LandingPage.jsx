import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      <div className="bg-[#011627] text-white flex flex-col items-center justify-center p-12">
        <div className="max-w-4xl text-center space-y-4">
          <h1 className="text-5xl font-bold mb-4">
            Track Your Reading Journey
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Keep track of your reading progress, chapter by chapter. Never lose your place in any book again.
          </p>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 cursor-pointer">
              <div className="bg-[#012b4d] hover:bg-[#012b4d]/80 p-6 rounded-lg border-l-4 border-[#0c54a7]">
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-400">Monitor your reading progress chapter by chapter</p>
              </div>
              <div className="bg-[#012b4d] hover:bg-[#012b4d]/80 p-6 rounded-lg border-l-4 border-[#0c54a7]">
                <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
                <p className="text-gray-400">Keep all your books organized in one place</p>
              </div>
            </div>
            <Link to="/signup" className='bg-[#0c54a7] text-white p-4 rounded-md hover:bg-[#0c54a7]/80 transition-colors'>Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage