import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminNavbar } from './AdminNavbar'

export function AdminLayout(props: { onLogout: () => void }): JSX.Element {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <AdminNavbar onLogout={props.onLogout} />
      <div className="px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}


