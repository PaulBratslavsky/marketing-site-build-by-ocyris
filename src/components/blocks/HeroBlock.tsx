import { Link } from '@tanstack/react-router'
import { getStrapiMediaUrl } from '@/lib/strapi'
import { cn } from '@/lib/cn'
import type { HeroBlock as HeroBlockType } from '@/types/strapi'

interface HeroBlockProps {
  block: HeroBlockType
}

export default function HeroBlock({ block }: HeroBlockProps) {
  const words = block.heading.split(' ')
  const split = Math.max(1, words.length - 2)
  const headingStart = words.slice(0, split).join(' ')
  const headingEnd = words.slice(split).join(' ')

  return (
    <section className="relative overflow-hidden hero-mesh">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 right-[-10%] w-[400px] h-[400px] rounded-full bg-pink-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-1/3 w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-10 md:pt-28 md:pb-14">
        {/* Announcement pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white/80 shadow-inner">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]" />
            Powered by Strapi CMS &mdash; headless &amp; blazing fast
            <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-7">
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.04] tracking-tight text-white">
              {headingStart}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #c4b5fd 10%, #f472b6 55%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {headingEnd}
              </span>
            </h1>

            {block.text && (
              <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-md">
                {block.text}
              </p>
            )}

            {block.links && block.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-1">
                {block.links.map((link) => {
                  const isPrimary = link.type === 'PRIMARY'
                  const cls = cn(
                    'inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200 focus:outline-none',
                    isPrimary
                      ? 'brand-gradient text-white shadow-2xl shadow-primary/50 hover:opacity-90 hover:scale-[1.04] hover:shadow-primary/70'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-[1.04]',
                  )
                  const inner = (
                    <>
                      {link.label}
                      <svg className={cn('w-4 h-4 transition-transform group-hover:translate-x-0.5', isPrimary ? '' : 'opacity-60')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isPrimary ? 2.5 : 2} d={isPrimary ? 'M17 8l4 4m0 0l-4 4m4-4H3' : 'M9 5l7 7-7 7'} />
                      </svg>
                    </>
                  )
                  if (link.isExternal || !link.href.startsWith('/')) {
                    return (
                      <a key={link.id} href={link.href} target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined} className={cn(cls, 'group')}>
                        {inner}
                      </a>
                    )
                  }
                  return (
                    <Link key={link.id} to={link.href as '/'} className={cn(cls, 'group')}>
                      {inner}
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Trust row */}
            <div className="flex items-center gap-5 mt-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['bg-violet-400','bg-pink-400','bg-indigo-400','bg-emerald-400'].map((c, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white/20`} />
                  ))}
                </div>
                <p className="text-xs text-white/50"><span className="text-white font-bold">10k+</span> users</p>
              </div>
              <div className="h-4 w-px bg-white/15" />
              <div className="flex items-center gap-1.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="text-xs text-white/50 ml-0.5">5.0 rating</span>
              </div>
              <div className="h-4 w-px bg-white/15" />
              <p className="text-xs text-white/50"><span className="text-white font-bold">99.9%</span> uptime</p>
            </div>
          </div>

          {/* ── Right: Image ── */}
          {block.image?.url && (
            <div className="relative flex items-center justify-center">
              {/* Outer glow */}
              <div className="absolute -inset-6 rounded-[2rem] opacity-50 blur-3xl brand-gradient" />

              {/* Card frame */}
              <div className="relative w-full rounded-[1.75rem] p-[2px] brand-gradient shadow-2xl">
                <div className="rounded-[1.625rem] overflow-hidden bg-[#0a0a14]">
                  <img
                    src={getStrapiMediaUrl(block.image.url)}
                    alt={block.image.alternativeText ?? block.heading}
                    className="w-full object-cover animate-float"
                    style={{ aspectRatio: '4/3' }}
                  />
                  {/* Overlay gloss */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />
                </div>
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-5 -left-4 md:-left-8 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl px-4 py-3 flex items-center gap-3 border border-white/60">
                <div className="flex -space-x-2">
                  {['bg-violet-400','bg-pink-400','bg-sky-400'].map((c, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white`} />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">10,000+ users</p>
                  <p className="text-[10px] text-gray-400">joined this month</p>
                </div>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-5 -right-4 md:-right-8 rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl px-4 py-3 flex items-center gap-2.5 border border-white/60">
                <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Lightning Fast</p>
                  <p className="text-[10px] text-gray-400">&lt; 100ms response</p>
                </div>
              </div>

              {/* Floating badge — mid right */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xl px-3 py-2.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_2px_rgba(52,211,153,0.5)]" />
                <p className="text-xs font-bold text-emerald-700">99.9% Uptime</p>
              </div>
            </div>
          )}
        </div>

        {/* Logos / social proof strip */}
        <div className="mt-16 flex flex-col items-center gap-5">
          <p className="text-xs font-medium tracking-widest text-white/25 uppercase">Trusted by teams at</p>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma'].map((name) => (
              <span key={name} className="text-sm font-bold text-white/20 tracking-tight hover:text-white/40 transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative w-full overflow-hidden leading-[0] mt-6">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-12 md:h-16 fill-background">
          <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z" />
        </svg>
      </div>
    </section>
  )
}
