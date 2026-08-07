/**
 * LoadingSpinner.jsx — Animated loading indicator
 */

export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="flex gap-2">
        <span className="spinner-dot" style={{ backgroundColor: 'var(--color-teal)' }} />
        <span className="spinner-dot" style={{ backgroundColor: 'var(--color-coral)' }} />
        <span className="spinner-dot" style={{ backgroundColor: 'var(--color-mustard)' }} />
      </div>
      <p className="text-sm font-medium opacity-60">{text}</p>
    </div>
  );
}
