import React, { useMemo, useState } from 'react'

type AdminAuth = {
  email: string
  password: string
}

type UserRow = {
  id: number
  full_name: string
  email: string
  created_at: string
  status: string
}

type LoginEventRow = {
  id: number
  user_id: number | null
  user_email: string
  login_at: string
  success: boolean
  ip_address: string | null
  user_agent: string | null
}

type AdminData = {
  users: UserRow[]
  login_events: LoginEventRow[]
  stats: {
    total_users: number
    total_events: number
    active_users: number
    pending_users: number
  }
}

const HARDCODED_ADMIN = { email: 'vishnu@example.com', password: '123' } as const

export function App(): JSX.Element {
  const [auth, setAuth] = useState<AdminAuth>({ email: '', password: '' })
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AdminData | null>(null)

  const apiBase = useMemo(() => '/api', [])

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

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 420, margin: '48px auto', padding: 24, border: '1px solid #e5e7eb', borderRadius: 12 }}>
        <h1 style={{ fontSize: 24, marginBottom: 16 }}>BodyCheck Admin</h1>
        <p style={{ color: '#6b7280', marginBottom: 16 }}>Enter admin credentials to continue.</p>
        <label style={{ display: 'block', fontSize: 12, color: '#374151', marginBottom: 6 }}>Email</label>
        <input
          type="email"
          value={auth.email}
          onChange={(e) => setAuth((a) => ({ ...a, email: e.target.value }))}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, marginBottom: 12 }}
        />
        <label style={{ display: 'block', fontSize: 12, color: '#374151', marginBottom: 6 }}>Password</label>
        <input
          type="password"
          value={auth.password}
          onChange={(e) => setAuth((a) => ({ ...a, password: e.target.value }))}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, marginBottom: 12 }}
        />
        <button
          onClick={fetchAdminData}
          disabled={loading}
          style={{ width: '100%', background: '#00B3C4', color: 'white', padding: '10px 12px', borderRadius: 8, cursor: 'pointer' }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        {error && <div style={{ color: '#b91c1c', marginTop: 12 }}>{error}</div>}
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22 }}>Admin Dashboard</h2>
        <button
          onClick={() => {
            setIsLoggedIn(false)
            setData(null)
          }}
          style={{ background: 'transparent', border: '1px solid #d1d5db', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      {data ? (
        <>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <StatCard label="Total Users" value={data.stats.total_users} />
            <StatCard label="Active" value={data.stats.active_users} />
            <StatCard label="Pending" value={data.stats.pending_users} />
            <StatCard label="Login Events" value={data.stats.total_events} />
          </div>

          <section style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>Users</h3>
            <UsersTable rows={data.users} />
          </section>

          <section style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>Recent Logins</h3>
            <EventsTable rows={data.login_events} />
          </section>
        </>
      ) : (
        <div>Loading…</div>
      )}
    </div>
  )
}

function StatCard(props: { label: string; value: number }): JSX.Element {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, minWidth: 140 }}>
      <div style={{ color: '#6b7280', fontSize: 12 }}>{props.label}</div>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{props.value}</div>
    </div>
  )
}

function UsersTable(props: { rows: UserRow[] }): JSX.Element {
  return (
    <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
            <th style={{ padding: 12 }}>ID</th>
            <th style={{ padding: 12 }}>Name</th>
            <th style={{ padding: 12 }}>Email</th>
            <th style={{ padding: 12 }}>Created</th>
            <th style={{ padding: 12 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.rows.map((u) => (
            <tr key={u.id}>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{u.id}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{u.full_name}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{u.email}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{new Date(u.created_at).toLocaleString()}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EventsTable(props: { rows: LoginEventRow[] }): JSX.Element {
  return (
    <div style={{ overflowX: 'auto', border: '1px solid #e5e7eb', borderRadius: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
            <th style={{ padding: 12 }}>Time</th>
            <th style={{ padding: 12 }}>User</th>
            <th style={{ padding: 12 }}>Email</th>
            <th style={{ padding: 12 }}>IP</th>
            <th style={{ padding: 12 }}>Agent</th>
            <th style={{ padding: 12 }}>Success</th>
          </tr>
        </thead>
        <tbody>
          {props.rows.map((e) => (
            <tr key={e.id}>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{new Date(e.login_at).toLocaleString()}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{e.user_id ?? '-'}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{e.user_email}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{e.ip_address ?? '-'}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6', maxWidth: 380, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.user_agent ?? '-'}</td>
              <td style={{ padding: 12, borderTop: '1px solid #f3f4f6' }}>{e.success ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


