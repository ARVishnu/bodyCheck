import React from 'react'

export function Field(props: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <div className="text-gray-500 text-xs mb-1">{props.label}</div>
      <div className="text-sm">{props.value}</div>
    </div>
  )
}


