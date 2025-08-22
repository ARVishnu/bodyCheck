import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { darkLogo } from '../assets'

export function AdminLayout(): JSX.Element {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <NavLink to="/" className='px-4 sm:px-6 lg:px-8 bg-white shadow sticky top-0 z-50'>
      <img src={darkLogo} alt="" style={{width:"250px"}} />
      </NavLink>
      <div className="px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}


