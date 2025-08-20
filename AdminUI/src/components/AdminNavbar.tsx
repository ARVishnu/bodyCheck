import React from 'react'
import { NavLink } from 'react-router-dom'

export function AdminNavbar(props: { onLogout: () => void }): JSX.Element {
  const linkClass = (isActive: boolean): string => `px-1 py-2 text-sm font-medium no-underline ${isActive ? 'text-turquoise border-b-2 border-turquoise' : 'text-gray-800 border-b-2 border-transparent hover:text-dodger-blue'}`

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm mb-4">
      <div className="px-4">
        <div className="h-14 flex items-center justify-between">
        <NavLink to="/">
          <div className="flex items-center gap-2 text-dodger-blue font-bold text-lg">
            <span>BodyCheck Admin</span>
          </div>
        </NavLink>
          <div className="flex items-center gap-5">
            <NavLink to="/home" className={({ isActive }) => linkClass(isActive)}>Home</NavLink>
            <NavLink to="/logins" className={({ isActive }) => linkClass(isActive)}>Recent Logins</NavLink>
            <NavLink to="/contact_forms" className={({ isActive }) => linkClass(isActive)}>Contact Info</NavLink>
          </div>
          <div>
            <button onClick={props.onLogout} className="bg-transparent border border-gray-300 px-3 py-1.5 rounded-md cursor-pointer">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}


