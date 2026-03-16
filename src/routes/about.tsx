import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { loadPageBySlug, loadGlobal, loadLandingPage, loadAuthors } from '@/data/loaders'
import { getStrapiMediaUrl } from '@/lib/strapi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'

export const Route = createFileRoute('/about')({
  loader: async () => {
    const [page, global, landing, authors] = await Promise.all([
      loadPageBySlug({ data: 'about' }),
      loadGlobal(),
      loadLandingPage(),
      loadAuthors(),
    ])
    if (!page) throw notFound()
    return { page, global, landing, authors }
  },
  component: AboutPage,
})

function AboutPage() {
  const { page, global, landing, authors } = Route.useLoaderData()
  const { banner, header, footer } = global

  // Extract person-card block from about page
  const personCard = page.blocks?.find(
    (b: any) => b.__component === 'blocks.person-card'
  )

  // Match author by name to get their image
  const matchedAuthor = authors?.find(
    (a: any) =>
      a.fullName?.toLowerCase().replace(/\s/g, '') ===
      personCard?.personName?.toLowerCase().replace(/\s/g, '')
  ) ?? authors?.[0]

  const authorImageUrl = matchedAuthor?.image?.url
    ? getStrapiMediaUrl(matchedAuthor.image.url)
    : null

  // Hero block from landing page for headings and CTA links
  const heroBlock = landing?.blocks?.find(
    (b: any) => b.__component === 'blocks.hero'
  )
  const primaryLink = heroBlock?.links?.find((l: any) => l.type === 'PRIMARY')

  // Blog nav item from global footer
  const blogNavItem = footer?.navItems?.find((n: any) => n.href === '/blog')

  const values = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Speed',
      desc: 'We move fast and ship products that matter.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Trust',
      desc: 'Security and reliability are non-negotiable.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Community',
      desc: 'Built with and for the people who use it.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation',
      desc: 'Always exploring better ways to solve problems.',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Banner banner={banner} />
      <Header logo={header.logo} navItems={header.navItems} cta={header.cta} />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#0a0a14] pt-32 pb-24 px-6">
          <div
            className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #2563eb, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-white/60 tracking-wide uppercase">
                {page.title}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              {heroBlock?.heading ?? page.title}
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {page.description}
            </p>
          </div>
        </section>

        {/* ── Two-column: Mission + Team ── */}
        <section className="bg-[#0d0d1a] py-24 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

            {/* Left column — Mission */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
                  {landing?.description}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {heroBlock?.heading ?? page.title}
                </h2>
              </div>
              <p className="text-white/60 leading-relaxed text-lg">
                {heroBlock?.text ?? page.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="group rounded-2xl border border-white/5 bg-white/[0.03] p-5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
                  >
                    <div className="mb-3 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                      {v.icon}
                    </div>
                    <p className="font-semibold text-white text-sm mb-1">{v.title}</p>
                    <p className="text-white/40 text-xs leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — Team member card */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">Team</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {personCard
                    ? `${personCard.personName}`
                    : page.title}
                </h2>
                {personCard && (
                  <p className="text-violet-400 mt-1">{personCard.personJob}</p>
                )}
              </div>

              {personCard ? (
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  {/* Glow */}
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20"
                    style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
                  />

                  {/* Author image — full width at top */}
                  {authorImageUrl && (
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={authorImageUrl}
                        alt={personCard.personName}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Gradient fade into card body */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111128] via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-8">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    <div className="text-4xl font-serif text-violet-400/20 leading-none mb-2">&ldquo;</div>
                    <p className="text-white/70 text-lg leading-relaxed mb-8 italic">
                      &ldquo;{personCard.text}&rdquo;
                    </p>

                    {/* Author row */}
                    <div className="flex items-center gap-4">
                      {/* Small avatar */}
                      <div className="relative shrink-0">
                        {authorImageUrl ? (
                          <>
                            <div
                              className="absolute -inset-0.5 rounded-full"
                              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
                            />
                            <img
                              src={authorImageUrl}
                              alt={personCard.personName}
                              className="relative w-12 h-12 rounded-full object-cover object-top"
                            />
                          </>
                        ) : (
                          <>
                            <div
                              className="absolute -inset-0.5 rounded-full"
                              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
                            />
                            <div className="relative w-12 h-12 rounded-full bg-[#1a1a2e] flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {personCard.personName
                                  .split(' ')
                                  .map((n: string) => n[0])
                                  .join('')}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white">{personCard.personName}</p>
                        <p className="text-sm text-violet-400">{personCard.personJob}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* CTA */}
              {blogNavItem && (
                <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white mb-1">{global.title}</p>
                    <p className="text-sm text-white/50">{global.description}</p>
                  </div>
                  <Link
                    to={blogNavItem.href}
                    className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
                  >
                    {blogNavItem.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="relative overflow-hidden bg-[#0a0a14] py-24 px-6 border-t border-white/5">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div
              className="w-[600px] h-[300px] rounded-full blur-3xl opacity-10"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
            />
          </div>
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {heroBlock?.heading ?? page.title}
            </h2>
            <p className="text-white/50 mb-8 text-lg">
              {heroBlock?.text ?? page.description}
            </p>
            {primaryLink && (
              <a
                href={primaryLink.href}
                target={primaryLink.isExternal ? '_blank' : undefined}
                rel={primaryLink.isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-semibold text-white text-base transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
              >
                {primaryLink.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </section>
      </main>

      <Footer
        logo={footer.logo}
        navItems={footer.navItems}
        socialLinks={footer.socialLinks}
        text={footer.text}
      />
    </div>
  )
}
