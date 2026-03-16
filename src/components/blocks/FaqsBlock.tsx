import { useState } from 'react'
import type { FaqsBlock as FaqsBlockType } from '@/types/strapi'
import { cn } from '@/lib/cn'

interface Props {
  block: FaqsBlockType
}

export default function FaqsBlock({ block }: Props) {
  const [openId, setOpenId] = useState<number | null>(null)

  if (!block.faq || block.faq.length === 0) return null

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full brand-gradient px-4 py-1.5 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-white">FAQ</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {block.faq.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                'rounded-2xl border bg-card overflow-hidden shadow-sm transition-all duration-200',
                openId === item.id ? 'border-primary/40 shadow-md shadow-primary/10' : 'border-border'
              )}
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-foreground hover:bg-muted/50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className={cn(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all',
                    openId === item.id ? 'brand-gradient text-white' : 'bg-muted text-muted-foreground'
                  )}>
                    {i + 1}
                  </span>
                  {item.heading}
                </span>
                <svg
                  className={cn('w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300', openId === item.id && 'rotate-180 text-primary')}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openId === item.id && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4 pl-[4.25rem]">
                  {item.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
