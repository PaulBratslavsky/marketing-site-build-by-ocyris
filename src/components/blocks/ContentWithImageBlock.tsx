import { getStrapiMediaUrl } from '@/lib/strapi'
import { cn } from '@/lib/cn'
import type { ContentWithImageBlock as ContentWithImageBlockType } from '@/types/strapi'

interface Props {
  block: ContentWithImageBlockType
}

export default function ContentWithImageBlock({ block }: Props) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            'flex flex-col gap-12 items-center',
            block.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
          )}
        >
          {/* Image */}
          <div className="flex-1 w-full">
            <div className="relative">
              {/* Decorative background shape */}
              <div className={cn(
                'absolute -inset-4 rounded-3xl opacity-30 blur-2xl',
                block.reversed
                  ? 'bg-gradient-to-br from-pink-400 to-violet-500'
                  : 'bg-gradient-to-br from-violet-400 to-blue-500'
              )} />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img
                  src={getStrapiMediaUrl(block.image.url)}
                  alt={block.image.alternativeText ?? block.heading}
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col gap-6">
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
                  'self-start inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all',
                  block.link.type === 'PRIMARY'
                    ? 'brand-gradient text-white shadow-lg shadow-primary/30 hover:opacity-90 hover:scale-[1.03]'
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
