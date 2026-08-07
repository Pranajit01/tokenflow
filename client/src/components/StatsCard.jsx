/**
 * StatsCard.jsx — Stat number + label card
 */

export default function StatsCard({ icon: Icon, label, value, color = 'var(--color-teal)' }) {
  return (
    <div className="space-card p-5 flex items-center gap-4 w-full min-w-0">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10"
        style={{ backgroundColor: `${color}25`, color: color }}
      >
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold font-manrope text-white tracking-tight break-words">
          {value}
        </p>
        <p className="text-xs text-white/60 font-medium break-words">{label}</p>
      </div>
    </div>
  );
}
