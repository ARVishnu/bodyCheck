import React from 'react'
import { ContactFormRow } from '../types'
import { ContactTable } from '../components/ContactTable'
import { ContactDetailsModal } from '../components/ContactDetailsModal'

export function ContactPage(props: {
  contacts: ContactFormRow[] | null
  loading: boolean
  error: string | null
  onRowClick: (row: ContactFormRow) => void
}): JSX.Element {
  const { contacts, loading, error } = props
  return (
    <section className="mt-6">
      <h3 className="text-lg mb-2 font-medium">Contact Info</h3>
      {error && <div className="text-red-700">{error}</div>}
    <ContactTable rows={contacts || []} onRowClick={props.onRowClick} loading={loading} />
    </section>
  )
}


