import { getStrapiMediaUrl } from '@/lib/strapi'
import type { PersonCardBlock as PersonCardBlockType } from '@/types/strapi'

interface Props {
  block: PersonCardBlockType
}

const STARS = 5

export default function PersonCardBlock({ block }: Props) {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-mesh opacity-95" />
      <div className="absolute inset-0 bg-background/5" />

      <div className="relative max-w-3xl mx-auto">
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-12 shadow-2xl">
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: STARS }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium italic mb-8">
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
              <p className="font-bold text-white">{block.personName}</p>
              <p className="text-sm text-white/50">{block.personJob}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
