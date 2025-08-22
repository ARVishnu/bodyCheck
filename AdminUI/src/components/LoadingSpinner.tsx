import React from 'react';

export default function LoadingSpinner({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ height: size, width: size }}>
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#38bdf8"
          strokeWidth="5"
          strokeDasharray="31.4 31.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
