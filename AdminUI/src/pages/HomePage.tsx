import React from 'react'
import { AdminData } from '../types'
import { StatCard } from '../components/StatCard'
import { UsersTable } from '../components/UsersTable'
export function HomePage(props: { data: AdminData; refreshGrid?: () => void; loading?: boolean }): JSX.Element {
  const { data, loading } = props;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 mt-6">
        <StatCard label="Total Users" value={data.stats.total_users} />
        <StatCard label="Active" value={data.stats.active_users} />
        <StatCard label="Pending" value={data.stats.pending_users} />
        <StatCard label="Login Events" value={data.stats.total_events} />
      </div>

      <section className="my-6">
        <UsersTable rows={data.users} loading={loading} />
      </section>
    </>
  )
}


