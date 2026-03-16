import { getStrapiMediaUrl } from '@/lib/strapi'
import { cn } from '@/lib/cn'
import type { ContentWithImageBlock as ContentWithImageBlockType } from '@/types/strapi'

interface Props {
  block: ContentWithImageBlockType
}

export default function ContentWithImageBlock({ block }: Props) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            'flex flex-col gap-14 items-center',
            block.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
          )}
        >
          {/* Image */}
          <div className="flex-1 w-full">
            <div className="relative">
              <div className={cn(
                'absolute -inset-5 rounded-3xl opacity-40 blur-3xl',
                block.reversed
                  ? 'bg-gradient-to-br from-pink-500 to-orange-400'
                  : 'bg-gradient-to-br from-violet-500 to-blue-500'
              )} />
              {/* Decorative dots */}
              <div className={cn(
                'absolute w-24 h-24 rounded-full opacity-60',
                block.reversed ? '-top-5 -right-5' : '-top-5 -left-5',
                'bg-primary/10 blur-xl'
              )} />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src={getStrapiMediaUrl(block.image.url)}
                  alt={block.image.alternativeText ?? block.heading}
                  className="w-full object-cover aspect-[4/3] transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Accent line */}
            <div className="flex items-center gap-3">
              <div className={cn(
                'h-1 w-10 rounded-full',
                block.reversed ? 'bg-gradient-to-r from-pink-500 to-orange-400' : 'bg-gradient-to-r from-violet-500 to-blue-500'
              )} />
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-snug">
              {block.heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              {block.content}
            </p>

            {block.link && (
              <a
                href={block.link.href}
                target={block.link.isExternal ? '_blank' : undefined}
                rel={block.link.isExternal ? 'noopener noreferrer' : undefined}
                className={cn(
                  'self-start mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200',
                  block.link.type === 'PRIMARY'
                    ? 'brand-gradient text-white shadow-xl shadow-primary/30 hover:opacity-90 hover:scale-[1.04]'
                    : 'border border-border text-foreground hover:bg-muted',
                )}
              >
                {block.link.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
