import React from 'react'

export function StatCard(props: { label: string; value: number }): JSX.Element {
  return (
    <div className="border border-gray-200 rounded-xl p-4 min-w-[140px] bg-white shadow-sm">
      <div className="text-gray-500 text-xs">{props.label}</div>
      <div className="text-[22px] font-semibold">{props.value}</div>
    </div>
  )
}


