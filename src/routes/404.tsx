import { createFileRoute, Link } from '@tanstack/react-router'
import { loadGlobal } from '@/data/loaders'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'

export const Route = createFileRoute('/404')({
  loader: async () => {
    const global = await loadGlobal()
    return { global }
  },
  component: NotFoundPage,
})

// Standalone version used by __root.tsx notFoundComponent
// Renders without loader data — fetches global on the server via the route loader
export function NotFoundPage({ global: globalProp }: { global?: any } = {}) {
  let global: any = globalProp ?? null

  // When rendered as a proper route, use loader data
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = Route.useLoaderData()
    if (data?.global) global = data.global
  } catch {
    // rendered outside route context (notFoundComponent) — global stays null
  }

  const header = global?.header
  const footer = global?.footer
  const banner = global?.banner

  return (
    <div className="flex flex-col min-h-screen">
      {banner && <Banner banner={banner} />}
      {header && (
        <Header
          logo={header.logo}
          navItems={header.navItems}
          cta={header.cta}
        />
      )}

      <main className="flex-1 relative overflow-hidden bg-[#07070f] flex items-center justify-center px-6 py-24">
        {/* Background orbs */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent 70%)' }}
        />
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative text-center max-w-2xl mx-auto">
          {/* Giant glowing 404 */}
          <div className="relative inline-block mb-6">
            <span
              className="text-[9rem] md:text-[13rem] font-black leading-none tracking-tighter select-none"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #60a5fa 50%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 80px rgba(124,58,237,0.5))',
              }}
            >
              404
            </span>
            {/* Blur glow behind number */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-25 scale-75"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
            />
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-medium text-white/50 tracking-widest uppercase">
              Error
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            You've wandered{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              off the map.
            </span>
          </h1>

          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back on track.
          </p>

          {/* Primary action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 font-semibold text-white text-sm transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {header?.navItems?.find((n: any) => n.href === '/')?.label ?? 'Home'}
            </Link>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-3.5 font-semibold text-white/80 text-sm hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6" />
              </svg>
              {header?.navItems?.find((n: any) => n.href === '/blog')?.label ?? 'Blog'}
            </Link>
          </div>

          {/* Divider + footer links */}
          <div className="pt-8 border-t border-white/5">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(header?.navItems ?? [
                { id: 1, href: '/', label: 'Home', isExternal: false },
                { id: 2, href: '/about', label: 'About', isExternal: false },
                { id: 3, href: '/blog', label: 'Blog', isExternal: false },
              ]).map((item: any) =>
                item.isExternal ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/40 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    to={item.href as '/'}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/40 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {footer && (
        <Footer
          logo={footer.logo}
          navItems={footer.navItems}
          socialLinks={footer.socialLinks}
          text={footer.text}
        />
      )}
    </div>
  )
}