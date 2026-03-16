import type { CardGridBlock as CardGridBlockType } from '@/types/strapi'

const ICONS = [
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="zap">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="shield">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="cube">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>,
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" key="chart">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
]

const GRADIENTS = [
  'from-violet-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
]

const GLOW_COLORS = [
  'group-hover:shadow-violet-500/20',
  'group-hover:shadow-pink-500/20',
  'group-hover:shadow-blue-500/20',
  'group-hover:shadow-emerald-500/20',
]

interface Props {
  block: CardGridBlockType
}

export default function CardGridBlock({ block }: Props) {
  return (
    <section className="py-8 px-6 pb-28 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {block.cards.map((card, i) => (
            <div
              key={card.id}
              className={`group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/20 overflow-hidden ${GLOW_COLORS[i % GLOW_COLORS.length]}`}
            >
              {/* Top-right corner glow */}
              <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`} />

              {/* Number badge */}
              <div className="absolute top-5 right-5 text-[11px] font-bold text-muted-foreground/30 font-mono">
                0{i + 1}
              </div>

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center text-white shadow-lg`}>
                {ICONS[i % ICONS.length]}
              </div>

              <h3 className="text-base font-semibold text-foreground leading-snug pr-6">
                {card.heading}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.text}
              </p>

              {/* Arrow indicator — decorative, no hardcoded label */}
              <div className="mt-auto pt-3 border-t border-border/60 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
