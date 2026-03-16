import type { GlobalBanner } from '@/types/strapi'

interface BannerProps {
  banner: GlobalBanner
}

export default function Banner({ banner }: BannerProps) {
  if (!banner.isVisible) return null

  return (
    <div className="brand-gradient text-white w-full py-2.5 px-4 text-center text-sm font-medium">
      <span className="mr-2 opacity-90">{banner.description}</span>
      {banner.link && (
        <a
          href={banner.link.href}
          target={banner.link.isExternal ? '_blank' : undefined}
          rel={banner.link.isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline transition-all"
        >
          {banner.link.label}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </div>
  )
}
