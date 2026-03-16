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
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
          {/* Gradient background */}
          <div className="absolute inset-0 hero-mesh" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          {/* Glow orbs */}
          <div className="pointer-events-none absolute top-0 left-1/4 w-40 h-40 rounded-full bg-violet-400/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-pink-400/30 blur-3xl" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{block.heading}</h2>
            <p className="text-white/60 mb-8 text-sm leading-relaxed max-w-sm mx-auto">{block.text}</p>

            {submitted ? (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-2xl px-8 py-4 font-semibold">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {block.label ? `${block.label}ted!` : 'Submitted!'}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={block.placeholder}
                  required
                  className="flex-1 rounded-full px-5 py-3 text-sm bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white text-primary font-bold px-7 py-3 text-sm hover:bg-white/90 transition-all hover:scale-[1.03] shadow-xl shadow-black/20 whitespace-nowrap"
                >
                  {block.label}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
