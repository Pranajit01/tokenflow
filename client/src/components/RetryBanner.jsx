/**
 * RetryBanner.jsx — Backend unreachable banner
 */

import { WifiOff, RefreshCw } from 'lucide-react';

export default function RetryBanner({ message = "Can't reach server", onRetry }) {
  return (
    <div
      className="w-full px-4 py-3 flex items-center justify-center gap-3 text-sm font-medium"
      style={{
        backgroundColor: 'var(--color-coral)',
        color: 'white',
        borderBottom: '3px solid var(--color-ink)',
      }}
    >
      <WifiOff size={16} />
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 underline hover:opacity-80 transition-opacity"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  );
}
