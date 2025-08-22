import React from 'react'
import { LoginEventRow } from '../types'
import { EventsTable } from '../components/EventsTable'
export function RecentLoginsPage(props: { events: LoginEventRow[]; loading?: boolean }): JSX.Element {
  const { events, loading } = props;
  return (
    <section className="my-6">
      <h3 className="text-lg mb-2 font-medium">Recent Logins</h3>
      <EventsTable rows={events} loading={loading} />
    </section>
  )
}


