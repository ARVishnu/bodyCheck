import React from 'react'
import { LoginEventRow } from '../types'
import { EventsTable } from '../components/EventsTable'

export function RecentLoginsPage(props: { events: LoginEventRow[] }): JSX.Element {
  return (
    <section className="mt-6">
      <h3 className="text-lg mb-2 font-medium">Recent Logins</h3>
      <EventsTable rows={props.events} />
    </section>
  )
}


