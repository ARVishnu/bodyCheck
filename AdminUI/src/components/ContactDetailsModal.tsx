import React from 'react'
import { ContactFormRow } from '../types'
import { Field } from './Field'

export function ContactDetailsModal(props: { contact: ContactFormRow; onClose: () => void }): JSX.Element {
  const c = props.contact
  const submittedAt = c.submitted_at || c.created_at
  const name = c.full_name || c.name || '-'
  const message = c.message || c.content || '-'
  return (
    <div
      onClick={props.onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl w-full max-w-[720px] shadow-2xl border border-gray-200" style={{maxHeight: '80vh'}}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h4 className="m-0 text-lg font-semibold">Contact Details</h4>
          <button onClick={props.onClose} className="bg-transparent border border-gray-300 px-3 py-1.5 rounded-md cursor-pointer">Close</button>
        </div>
        <div className="overflow-y-auto mb-5" style={{maxHeight: '60vh'}}>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* <Field label="Submitted At" value={submittedAt ? new Date(submittedAt).toLocaleString() : '-'} /> */}
            <Field label="Email" value={c.email} />
            <Field label="Full Name" value={name} />
            <Field label="Role" value={c.role ?? '-'} />
            <Field label="Organization" value={c.organization ?? '-'} />
          </div>
          <div className="p-4">
            <div className="text-gray-500 text-xs mb-1">Message</div>
            <div className="whitespace-pre-wrap leading-relaxed">{message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
