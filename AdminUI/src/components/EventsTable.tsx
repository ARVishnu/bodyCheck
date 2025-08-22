import React, { useState } from 'react'
import { LoginEventRow } from '../types'
import LoadingSpinner from './LoadingSpinner'

export function EventsTable(props: { rows: LoginEventRow[], loading?: boolean }): JSX.Element {
  const { rows, loading = false } = props;
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white" style={{height: '70vh'}}>
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-3">Time</th>
            <th className="p-3">User</th>
            <th className="p-3">Email</th>
            <th className="p-3">IP</th>
            <th className="p-3">Agent</th>
            <th className="p-3">Success</th>
          </tr>
        </thead>
      </table>
      <div style={{ maxHeight: '58vh', overflowY: 'auto' }}>
        <table className="w-full border-separate border-spacing-0">
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  <td className="p-3 border-t border-gray-100" colSpan={6}>
                    <LoadingSpinner size={32} className="mx-auto my-4" />
                  </td>
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-2xl text-gray-400 font-semibold"
                  style={{ height: '50vh' }}
                >
                  No Record Found
                </td>
              </tr>
            ) : (
              rows.map((e) => (
                <tr key={e.id}>
                  <td className="p-3 border-t border-gray-100">{new Date(e.login_at).toLocaleString()}</td>
                  <td className="p-3 border-t border-gray-100">{e.user_id ?? '-'}</td>
                  <td className="p-3 border-t border-gray-100">{e.user_email}</td>
                  <td className="p-3 border-t border-gray-100">{e.ip_address ?? '-'}</td>
                  <td className="p-3 border-t border-gray-100 max-w-[380px] whitespace-nowrap overflow-hidden text-ellipsis">{e.user_agent ?? '-'}</td>
                  <td className="p-3 border-t border-gray-100">{e.success ? 'Yes' : 'No'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


