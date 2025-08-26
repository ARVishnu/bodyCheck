import React from 'react'
import { NavLink } from 'react-router-dom'
import { refreshIcon } from '../assets'

export function AdminNavbar(props: { onLogout: () => void, refreshTable: () => void, loading?: boolean, }): JSX.Element {
  const linkClass = (isActive: boolean): string => `px-4 py-2 text-base font-semibold rounded-lg transition-all duration-200 no-underline ${isActive ? 'bg-turquoise/20 text-turquoise shadow-md' : 'text-gray-800 hover:bg-dodger-blue/10 hover:text-dodger-blue'}`

  return (
    <nav
      className="backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl border border-gray-200"
      style={{ position: 'fixed', width: '56%', minWidth: 340, maxWidth: 700, bottom: 20, transform: 'translateX(-50%)', left: '50%', zIndex: 50 }}
    >
      <div className="px-6 py-3">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/home" className={({ isActive }) => linkClass(isActive)}>Home</NavLink>
            <NavLink to="/logins" className={({ isActive }) => linkClass(isActive)}>Recent Logins</NavLink>
            <NavLink to="/contact_forms" className={({ isActive }) => linkClass(isActive)}>Contact Info</NavLink>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <button
                onClick={props.refreshTable}
                disabled={props.loading}
                className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-white transition-colors disabled:opacity-60"
                title="Refresh"
              >
                <img src={refreshIcon} alt="Refresh" className={`w-6 h-6 ${props.loading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={props.onLogout}
                className="bg-gradient-to-r from-turquoise to-dodger-blue text-white px-5 py-2 rounded-lg shadow-md font-semibold transition-all duration-200 hover:from-dodger-blue hover:to-turquoise hover:scale-105 focus:outline-none focus:ring-2 focus:ring-turquoise"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}


