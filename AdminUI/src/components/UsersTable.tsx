import React from 'react'
import { UserRow } from '../types'
import LoadingSpinner from './LoadingSpinner'

export function UsersTable(props: { rows: UserRow[], loading?: boolean }): JSX.Element {
  const { rows, loading = false } = props;
  return (
    <>
      <div className='flex justify-between items-center mb-2'>
        <h3 className="text-lg font-medium">Users</h3>
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white" style={{ maxHeight: '60vh' }}>
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
        </table>
        <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          <table className="w-full border-separate border-spacing-0">
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx}>
                    <td className="p-3 border-t border-gray-100" colSpan={5}>
                      <LoadingSpinner size={32} className="mx-auto my-4" />
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

      </div>
    </>
  )
}


