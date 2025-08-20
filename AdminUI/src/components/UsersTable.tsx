import React from 'react'
import { UserRow } from '../types'

export function UsersTable(props: { rows: UserRow[] }): JSX.Element {
  return (
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
          {props.rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-10 text-center text-2xl text-gray-400 font-semibold" style={{ height: '65vh' }}>
                No Record Found
              </td>
            </tr>
          ) : (
            props.rows.map((u) => (
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
  )
}


