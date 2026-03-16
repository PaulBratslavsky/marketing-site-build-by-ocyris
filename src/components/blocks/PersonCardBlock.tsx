import { getStrapiMediaUrl } from '@/lib/strapi'
import type { PersonCardBlock as PersonCardBlockType } from '@/types/strapi'

interface Props {
  block: PersonCardBlockType
}

export default function PersonCardBlock({ block }: Props) {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-muted/20">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Card */}
        <div className="relative rounded-3xl border border-border bg-card p-8 md:p-12 shadow-xl">
          {/* Decorative gradient corner */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full brand-gradient opacity-10 blur-2xl" />
          </div>

          {/* Large quote mark */}
          <div className="absolute top-8 left-8 text-8xl font-serif leading-none text-primary/10 select-none pointer-events-none">&ldquo;</div>

          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium mb-8 relative z-10">
            &ldquo;{block.text}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full brand-gradient" />
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={getStrapiMediaUrl(block.image.url)}
                  alt={block.image.alternativeText ?? block.personName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="font-bold text-foreground">{block.personName}</p>
              <p className="text-sm text-muted-foreground">{block.personJob}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
