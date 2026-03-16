import { useState } from 'react'
import type { NewsletterBlock as NewsletterBlockType } from '@/types/strapi'

interface Props {
  block: NewsletterBlockType
}

export default function NewsletterBlock({ block }: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
          {/* Dark gradient background */}
          <div className="absolute inset-0 hero-mesh" />
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* Glow orbs */}
          <div className="pointer-events-none absolute top-0 left-1/4 w-48 h-48 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-pink-500/25 blur-3xl" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-xl">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{block.heading}</h2>
            <p className="text-white/55 mb-8 text-sm leading-relaxed max-w-sm mx-auto">{block.text}</p>

            {submitted ? (
              <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white rounded-2xl px-8 py-4 font-semibold">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 border border-emerald-400/40">
                  <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {block.label}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={block.placeholder}
                  required
                  className="flex-1 rounded-full px-5 py-3 text-sm bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white/25 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white text-primary font-bold px-7 py-3 text-sm hover:bg-white/90 transition-all hover:scale-[1.03] shadow-2xl shadow-black/30 whitespace-nowrap"
                >
                  {block.label}
                </button>
              </form>
            )}

            {/* Social proof */}
            <div className="mt-6 flex items-center justify-center gap-5">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  {['bg-violet-400','bg-pink-400','bg-sky-400'].map((c, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full ${c} border border-white/30`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
