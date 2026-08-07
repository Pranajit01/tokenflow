/**
 * FeatureCard.jsx — Landing page feature cards
 */

export default function FeatureCard({ icon: Icon, title, description, color }) {
  return (
    <div className="memphis-card p-6 animate-float scroll-reveal" style={{ animationDelay: `${Math.random() * 1.5}s` }}>
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: color, border: '3px solid var(--color-ink)' }}
      >
        <Icon size={26} color="white" />
      </div>
      <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="text-sm opacity-70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
