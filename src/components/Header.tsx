import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { getStrapiMediaUrl } from '@/lib/strapi'

interface NavItem {
  id: number
  href: string
  label: string
  isExternal: boolean
  isButtonLink: boolean
}

export interface HeaderProps {
  logo: {
    label: string
    href: string
    image?: { url: string; alternativeText: string | null }
  }
  navItems: NavItem[]
  cta?: NavItem & { type?: string | null }
}

export default function Header({ logo, navItems, cta }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Dev-only test nav items (not from CMS)
  const devNavItems = import.meta.env.DEV
    ? [{ id: 9999, href: '/404', label: '404 Test', isExternal: false, isButtonLink: false }]
    : []

  const allNavItems = [...(navItems ?? []), ...devNavItems]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-black/[0.06] border-b border-gray-200/80'
          : 'bg-white/75 backdrop-blur-2xl border-b border-gray-200/60'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to={logo.href as '/'} className="flex items-center gap-2.5 group">
          {logo.image?.url && (
            <div className="flex items-center justify-center w-8 h-8 rounded-xl brand-gradient shadow-md shadow-primary/30">
              <img
                src={getStrapiMediaUrl(logo.image.url)}
                alt={logo.image.alternativeText ?? logo.label}
                className="h-5 w-auto brightness-200"
              />
            </div>
          )}
          <span className="text-base font-bold tracking-tight text-gray-900">{logo.label}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {allNavItems.map((item) =>
            item.isExternal ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 hover:bg-gray-100/80"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.href as '/'}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 hover:bg-gray-100/80"
                activeProps={{ className: 'rounded-lg px-3.5 py-2 text-sm font-medium text-gray-900 bg-gray-100/80' }}
              >
                {item.isExternal === false && item.id === 9999 ? (
                  <span className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            )
          )}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {cta && (
            <a
              href={cta.href}
              target={cta.isExternal ? '_blank' : undefined}
              rel={cta.isExternal ? 'noopener noreferrer' : undefined}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full brand-gradient px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/30 hover:opacity-90 hover:shadow-lg hover:shadow-primary/40 transition-all"
            >
              {cta.label}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100/80 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-gray-900 rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-gray-900 rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-gray-900 rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-200/80 bg-white/90 backdrop-blur-2xl px-6 py-4 flex flex-col gap-1">
          {allNavItems.map((item) =>
            item.isExternal ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.href as '/'}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.id === 9999 ? (
                  <span className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            )
          )}
          {cta && (
            <a
              href={cta.href}
              target={cta.isExternal ? '_blank' : undefined}
              rel={cta.isExternal ? 'noopener noreferrer' : undefined}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
            >
              {cta.label}
            </a>
          )}
        </div>
      )}
    </header>
  )
}
