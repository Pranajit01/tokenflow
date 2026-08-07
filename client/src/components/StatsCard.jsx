/**
 * StatsCard.jsx — Stat number + label card
 */

export default function StatsCard({ icon: Icon, label, value, color = 'var(--color-teal)' }) {
  return (
    <div className="memphis-card p-5 flex items-center gap-4 animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center border-3"
        style={{ backgroundColor: color, borderColor: 'var(--color-ink)', borderWidth: '3px' }}
      >
        <Icon size={22} color="white" />
      </div>
      <div>
        <p className="text-2xl font-bold font-heading" style={{ fontFamily: 'var(--font-heading)' }}>
          {value}
        </p>
        <p className="text-sm opacity-70">{label}</p>
      </div>
    </div>
  );
}
