import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import { ContactFormRow } from '../types'

export function ContactTable(props: { rows: ContactFormRow[]; onRowClick?: (row: ContactFormRow) => void; loading?: boolean }): JSX.Element {
  const { rows, onRowClick, loading = false } = props;
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white" style={{ height: '70vh' }}>
      <table className="w-full border-separate border-spacing-0 bg-gray-50" style={{paddingRight:"15px"}}>
        <thead>
          <tr className=" text-left">
            {/* <th className="p-3">Time</th> */}
            <th className="p-3" style={{width:'10%'}}>Name</th>
            <th className="p-3" style={{width:'20%'}}>Email</th>
            <th className="p-3" style={{width:'10%'}}>Role</th>
            <th className="p-3" style={{width:'20%'}}>Organization</th>
            <th className="p-3" style={{width:'40%'}}>Message</th>
          </tr>
        </thead>
      </table>
      <div style={{ maxHeight: '58vh', overflowY: 'auto' }}>
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
                <td
                  colSpan={5}
                  className="p-10 text-center text-2xl text-gray-400 font-semibold"
                  style={{ height: '65vh' }}
                >
                  No Record Found
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const name = r.full_name || r.name || '-'
                const message = r.message || r.content || '-'
                return (
                  <tr
                    key={r.id}
                    onClick={() => onRowClick && onRowClick(r)}
                    className={onRowClick ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}
                    title="Click to view details"
                  >
                    <td className="p-3 border-t border-gray-100" style={{width:'10%'}}>{name}</td>
                    <td className="p-3 border-t border-gray-100" style={{width:'20%'}}>{r.email}</td>
                    <td className="p-3 border-t border-gray-100" style={{width:'10%'}}>{r.role ?? '-'}</td>
                    <td className="p-3 border-t border-gray-100" style={{width:'20%'}}>{r.organization ?? '-'}</td>
                    <td style={{width:'40%'}}
                      className="p-3 border-t border-gray-100 max-w-[480px] whitespace-nowrap overflow-hidden text-ellipsis"
                      title="Click to show all user detail"
                    >
                      {message.split(/\s+/).slice(0, 30).join(' ')}
                      {message.split(/\s+/).length > 30 ? '\u2026' : ''}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


