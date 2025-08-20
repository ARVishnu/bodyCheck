import React, { useMemo, useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AdminAuth, AdminData, ContactFormRow } from './types'
import { AdminLayout } from './components/AdminLayout'
import { HomePage } from './pages/HomePage'
import { RecentLoginsPage } from './pages/RecentLoginsPage'
import { ContactPage } from './pages/ContactPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { ContactDetailsModal } from './components/ContactDetailsModal'

const HARDCODED_ADMIN = { email: 'vishnu@example.com', password: '123' } as const

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
      // Frontend hardcoded credential check
      if (auth.email !== HARDCODED_ADMIN.email || auth.password !== HARDCODED_ADMIN.password) {
        throw new Error('Invalid admin credentials')
      }
      const url = `${apiBase}/admin/data?users_limit=100&events_limit=100`
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
    <Routes>
      <Route
        path="/"
        element={<AdminLayout onLogout={() => { setIsLoggedIn(false); setData(null); setContactForms(null) }} />}
      >
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={data ? <HomePage data={data} /> : <div>Loading…</div>} />
        <Route path="logins" element={data ? <RecentLoginsPage events={data.login_events} /> : <div>Loading…</div>} />
        <Route
          path="contact_forms"
          element={
            <>
              <ContactPage
                contacts={contactForms}
                loading={contactLoading}
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
  )
}