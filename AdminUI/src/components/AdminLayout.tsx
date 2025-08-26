import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { darkLogo } from '../assets'

export function AdminLayout(props: { adminEmail?: string; onLogout?: () => void; onChangePassword?: () => void }): JSX.Element {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const email = (props.adminEmail || '').trim()
  const avatarLetter = email ? email[0]?.toUpperCase() : 'A'
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <div className='px-4 sm:px-6 lg:px-8 bg-white shadow sticky top-0 z-50 flex justify-between items-center'>
        <NavLink to="/">
          <img src={darkLogo} alt="" style={{ width: "250px" }} />
        </NavLink>
        <div className="relative" ref={menuRef}>
          <div
            className="w-10 h-10 rounded-full bg-dodger-blue text-white flex items-center justify-center font-semibold cursor-pointer select-none"
            onClick={() => setMenuOpen((s) => !s)}
            title={email || 'Admin'}
          >
            {avatarLetter}
          </div>
          {menuOpen && (
            <div
              className="absolute right-0 w-56 shadow-xl z-50 rounded-lg"
            >
              <div className='bg-white border border-gray-200 rounded-lg mt-2'>

              <div className="px-4 py-3 border-b border-gray-100">
                <div className="text-xs text-gray-500">Signed in as</div>
                <div className="text-sm font-medium text-gray-800 truncate" title={email}>{email || 'Admin'}</div>
              </div>
              <button
                onClick={props.onChangePassword}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              >
                Change password
              </button>
              <button
                onClick={props.onLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}


