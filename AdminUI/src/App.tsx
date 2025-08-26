import React, { useMemo, useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AdminAuth, AdminData, ContactFormRow } from './types'
import { AdminLayout } from './components/AdminLayout'
import { AdminNavbar } from './components/AdminNavbar'
import { HomePage } from './pages/HomePage'
import { RecentLoginsPage } from './pages/RecentLoginsPage'
import { ContactPage } from './pages/ContactPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { ContactDetailsModal } from './components/ContactDetailsModal'

export function App(): JSX.Element {
  const [auth, setAuth] = useState<AdminAuth>({ email: '', password: '' })
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AdminData | null>(null)
  const [contactForms, setContactForms] = useState<ContactFormRow[] | null>(null)
  const [contactLoading, setContactLoading] = useState<boolean>(false)
  const [contactError, setContactError] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<ContactFormRow | null>(null)

  const apiBase = useMemo(() => '/api', [])
  const location = useLocation()

  useEffect(() => {
    if (isLoggedIn) {
      const path = location.pathname || ''
      if (path.includes('/contact_forms') && !contactForms && !contactLoading) {
        void fetchContactForms()
      }
    }
  }, [isLoggedIn, location.pathname])

  async function fetchAdminData(): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const url = `${apiBase}/admin/data?users_limit=100&events_limit=100`
      const res = await fetch(url, {
        headers: {
          'X-Admin-Email': (auth.email || '').trim().toLowerCase(),
          'X-Admin-Password': auth.password,
        },
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed: ${res.status}`)
      }
      const json = (await res.json()) as AdminData
      setData(json)
      setIsLoggedIn(true)
    } catch (e: any) {
      setError(e?.message || 'Failed to load')
      setIsLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  async function fetchContactForms(): Promise<void> {
    setContactLoading(true)
    setContactError(null)
    try {
      const url = `${apiBase}/admin/contact_forms?limit=100`
      const res = await fetch(url, {
        headers: {
          'X-Admin-Email': auth.email,
          'X-Admin-Password': auth.password,
        },
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed: ${res.status}`)
      }
      const json = (await res.json()) as any
      const rows = Array.isArray(json) ? json : (json?.contact_forms ?? [])
      setContactForms(rows as ContactFormRow[])
    } catch (e: any) {
      setContactError(e?.message || 'Failed to load')
    } finally {
      setContactLoading(false)
    }
  }
  async function handleRefresh() {
    setLoading(true)
    const fetchPromise = fetchAdminData()
    const timer = new Promise((resolve) => setTimeout(resolve, 2000))
    await Promise.all([fetchPromise, timer])
    setLoading(false)
  }

  const [showChangePwd, setShowChangePwd] = useState<boolean>(false)
  const [oldPwd, setOldPwd] = useState<string>('')
  const [newPwd, setNewPwd] = useState<string>('')
  const [pwdMsg, setPwdMsg] = useState<string>('')
  async function submitChangePassword() {
    try {
      setPwdMsg('')
      const res = await fetch(`${apiBase}/admin/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Email': auth.email,
          'X-Admin-Password': auth.password,
        },
        body: JSON.stringify({ old_password: oldPwd, new_password: newPwd }),
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || `Request failed: ${res.status}`)
      }
      setPwdMsg('Password changed. Please use new password next time.')
      // Update in-memory auth password so future requests succeed in-session
      setAuth({ ...auth, password: newPwd })
      setOldPwd('')
      setNewPwd('')
      setShowChangePwd(false)
    } catch (e: any) {
      setPwdMsg(e?.message || 'Failed to change password')
    }
  }
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<AdminLoginPage auth={auth} loading={loading} error={error} onChange={setAuth} onSubmit={fetchAdminData} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <>
      <AdminNavbar onLogout={() => { setIsLoggedIn(false); setData(null); setContactForms(null) }} refreshTable={handleRefresh}  />
      <Routes>
        <Route
          path="/"
          element={<AdminLayout adminEmail={auth.email} onLogout={() => { setIsLoggedIn(false); setData(null); setContactForms(null) }} onChangePassword={() => setShowChangePwd(true)} />}
        >
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={data ? <HomePage data={data} loading={loading} /> : <div>Loading…</div>} />
          <Route path="logins" element={data ? <RecentLoginsPage events={data.login_events} loading={loading} /> : <div>Loading…</div>} />
          <Route
            path="contact_forms"
            element={
              <>
                <ContactPage
                  contacts={contactForms}
                  loading={contactLoading || loading}
                  error={contactError}
                  onRowClick={(row) => setSelectedContact(row)}
                />
                {selectedContact && (
                  <ContactDetailsModal contact={selectedContact} onClose={() => setSelectedContact(null)} />
                )}
              </>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {showChangePwd && (
        <div onClick={() => setShowChangePwd(false)} className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl w-full max-w-[420px] shadow-2xl border border-gray-200 p-4">
            <h4 className="m-0 text-lg font-semibold mb-2">Change Password</h4>
            <label className="block text-xs text-gray-700 mb-1">Current Password</label>
            <input type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-dodger-blue" />
            <label className="block text-xs text-gray-700 mb-1">New Password</label>
            <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-dodger-blue" />
            {pwdMsg && <div className="text-sm text-red-700 mb-2">{pwdMsg}</div>}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowChangePwd(false)} className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300">Cancel</button>
              <button onClick={submitChangePassword} className="bg-gradient-to-r from-turquoise to-dodger-blue text-white px-4 py-2 rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}