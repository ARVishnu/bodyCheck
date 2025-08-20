import React from 'react'
import { ContactFormRow } from '../types'

export function ContactTable(props: { rows: ContactFormRow[]; onRowClick?: (row: ContactFormRow) => void }): JSX.Element {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-50 text-left">
            {/* <th className="p-3">Time</th> */}
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Organization</th>
            <th className="p-3">Message</th>
          </tr>
        </thead>
        <tbody>
        {props.rows.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              className="p-10 text-center text-2xl text-gray-400 font-semibold"
              style={{ height: '65vh' }}
            >
              No Record Found
            </td>
          </tr>
        ) : (
          props.rows.map((r) => {
            const name = r.full_name || r.name || '-'
            const message = r.message || r.content || '-'
            return (
              <tr
                key={r.id}
                onClick={() => props.onRowClick && props.onRowClick(r)}
                className={props.onRowClick ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}
                title="Click to view details"
              >
                <td className="p-3 border-t border-gray-100">{name}</td>
                <td className="p-3 border-t border-gray-100">{r.email}</td>
                <td className="p-3 border-t border-gray-100">{r.role ?? '-'}</td>
                <td className="p-3 border-t border-gray-100">{r.organization ?? '-'}</td>
                <td
                  className="p-3 border-t border-gray-100 max-w-[480px] whitespace-nowrap overflow-hidden text-ellipsis"
                  title="Click to show all user detail"
                >
                  {message.split(/\s+/).slice(0, 30).join(' ')}
                  {message.split(/\s+/).length > 30 ? '…' : ''}
                </td>
              </tr>
            )
          })
        )}
        </tbody>
      </table>
    </div>
  )
}


