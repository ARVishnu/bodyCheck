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
  const [showForgot, setShowForgot] = React.useState(false)
  const [emailForOtp, setEmailForOtp] = React.useState('')
  const [otp, setOtp] = React.useState('')
  const [newPwd, setNewPwd] = React.useState('')
  const [msg, setMsg] = React.useState('')

  async function requestOtp() {
    try {
      setMsg('')
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailForOtp.trim().toLowerCase() }),
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || `Request failed: ${res.status}`)
      }
      setMsg('If that admin exists, an OTP has been sent')
    } catch (e: any) {
      setMsg(e?.message || 'Failed to request OTP')
    }
  }

  async function resetWithOtp() {
    try {
      setMsg('')
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailForOtp.trim().toLowerCase(), otp, new_password: newPwd }),
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || `Request failed: ${res.status}`)
      }
      setMsg('Password reset successful. You can now sign in.')
      setShowForgot(false)
    } catch (e: any) {
      setMsg(e?.message || 'Failed to reset password')
    }
  }
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
      <div className="text-sm mt-3">
        <button onClick={() => { setShowForgot(true); setEmailForOtp(auth.email) }} className="text-dodger-blue underline bg-transparent border-0 cursor-pointer">Forgot password?</button>
      </div>

      {showForgot && (
        <div onClick={() => setShowForgot(false)} className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl w-full max-w-[420px] shadow-2xl border border-gray-200 p-4">
            <h4 className="m-0 text-lg font-semibold mb-2">Admin Password Reset</h4>
            <label className="block text-xs text-gray-700 mb-1">Admin Email</label>
            <input type="email" value={emailForOtp} onChange={(e) => setEmailForOtp(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3" />
            <div className="flex gap-2 mb-3">
              <button onClick={requestOtp} className="bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-300">Send OTP</button>
            </div>
            <label className="block text-xs text-gray-700 mb-1">OTP</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3" />
            <label className="block text-xs text-gray-700 mb-1">New Password</label>
            <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3" />
            {msg && <div className="text-sm text-gray-700 mb-2">{msg}</div>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowForgot(false)} className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300">Close</button>
              <button onClick={resetWithOtp} className="bg-gradient-to-r from-turquoise to-dodger-blue text-white px-4 py-2 rounded-lg">Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


