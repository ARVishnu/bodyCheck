import React from 'react'
import { AdminAuth } from '../types'

export function AdminLoginPage(props: {
  auth: AdminAuth
  loading: boolean
  error: string | null
  onChange: (next: AdminAuth) => void
  onSubmit: () => void
}): JSX.Element {
  const { auth, loading, error, onChange, onSubmit } = props
  return (
    <div className="max-w-md mx-auto my-12 p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
      <h1 className="text-2xl mb-4 font-semibold text-cloud-burst">BodyCheck Admin</h1>
      <p className="text-gray-500 mb-4">Enter admin credentials to continue.</p>
      <label className="block text-xs text-gray-700 mb-1">Email</label>
      <input
        type="email"
        value={auth.email}
        onChange={(e) => onChange({ ...auth, email: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-dodger-blue"
      />
      <label className="block text-xs text-gray-700 mb-1">Password</label>
      <input
        type="password"
        value={auth.password}
        onChange={(e) => onChange({ ...auth, password: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-dodger-blue"
      />
      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full bg-turquoise text-white px-3 py-2 rounded-md cursor-pointer disabled:opacity-60"
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
      {error && <div className="text-red-700 mt-3">{error}</div>}
    </div>
  )
}


