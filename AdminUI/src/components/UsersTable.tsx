import React, { useState } from 'react'
import { UserRow } from '../types'

export function UsersTable(props: { rows: UserRow[], refreshTable: () => void }): JSX.Element {
  const { rows, refreshTable } = props
  const [loading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    props.refreshTable()
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <>
      <div className='flex justify-between items-center mb-2'>
        <h3 className="text-lg font-medium">Users</h3>
        <button onClick={handleRefresh} disabled={loading} className='bg-turquoise text-white cursor-pointer disabled:opacity-60 px-3 py-1 rounded-xl'>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Created</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loader placeholder rows
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  <td className="p-3 border-t border-gray-100">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-10"></div>
                  </td>
                  <td className="p-3 border-t border-gray-100">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="p-3 border-t border-gray-100">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="p-3 border-t border-gray-100">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-28"></div>
                  </td>
                  <td className="p-3 border-t border-gray-100">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-2xl text-gray-400 font-semibold" style={{ height: '65vh' }}>
                  No Record Found
                </td>
              </tr>
            ) : (
              rows.map((u) => (
                <tr key={u.id}>
                  <td className="p-3 border-t border-gray-100">{u.id}</td>
                  <td className="p-3 border-t border-gray-100">{u.full_name}</td>
                  <td className="p-3 border-t border-gray-100">{u.email}</td>
                  <td className="p-3 border-t border-gray-100">{new Date(u.created_at).toLocaleString()}</td>
                  <td className="p-3 border-t border-gray-100">{u.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}


