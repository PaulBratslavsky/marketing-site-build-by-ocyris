import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { loadArticlesPaginated, loadGlobal } from '@/data/loaders'
import { getStrapiUrl } from '@/lib/strapi'
import { Link } from '@tanstack/react-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import type { GlobalData } from '@/types/strapi'

const PAGE_SIZE = 4

export const Route = createFileRoute('/blog/')({ 
  loaderDeps: ({ search }: { search: Record<string, string> }) => ({
    page: Number(search.page) || 1,
    q: search.q || '',
  }),
  loader: async ({ deps }) => {
    const [articlesData, global] = await Promise.all([
      loadArticlesPaginated({ data: { page: deps.page, pageSize: PAGE_SIZE, search: deps.q } }),
      loadGlobal(),
    ])
    return { articlesData, global, page: deps.page, q: deps.q }
  },
  component: BlogPage,
})

function BlogPage() {
  const { articlesData, global, page, q } = Route.useLoaderData()
  const navigate = useNavigate({ from: '/blog/' })
  const [searchInput, setSearchInput] = useState(q)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const globalData = global as GlobalData
  const { articles, pagination } = articlesData

  useEffect(() => {
    setSearchInput(q)
  }, [q])

  function handleSearch(value: string) {
    setSearchInput(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      navigate({ search: (prev: Record<string, string>) => ({ ...prev, q: value || undefined, page: undefined }) })
    }, 400)
  }

  function goToPage(p: number) {
    navigate({ search: (prev: Record<string, string>) => ({ ...prev, page: p === 1 ? undefined : String(p) }) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const strapiUrl = getStrapiUrl()

  return (
    <div className="min-h-screen bg-[#07070f] text-white">
      {globalData?.banner?.isVisible && <Banner banner={globalData.banner} />}
      <Header
        logo={globalData?.header?.logo}
        navItems={globalData?.header?.navItems}
        cta={globalData?.header?.cta}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* bg orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-violet-300 font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            {pagination.total} articles published
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
            The{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
            {globalData?.description ?? ''}
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search articles…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all"
            />
            {searchInput && (
              <button
                onClick={() => handleSearch('')}
                className="absolute inset-y-0 right-4 flex items-center text-white/30 hover:text-white/70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {/* Search result label */}
        {q && (
          <div className="mb-8 flex items-center gap-3">
            <span className="text-sm text-white/40">
              {pagination.total === 0
                ? `No results for`
                : `${pagination.total} result${pagination.total !== 1 ? 's' : ''} for`}
            </span>
            <span className="bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium px-3 py-0.5 rounded-full">
              &ldquo;{q}&rdquo;
            </span>
          </div>
        )}

        {articles.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/40 text-lg">
              {q
                ? `No articles matched \u201c${q}\u201d.`
                : 'No articles are available yet.'}
            </p>
            {q && (
              <button
                onClick={() => handleSearch('')}
                className="mt-4 text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2"
              >
                &#x2715; Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Featured first article (only on page 1 without search) */}
            {page === 1 && !q && articles.length > 0 && (
              <FeaturedCard article={articles[0]} strapiUrl={strapiUrl} />
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
              {(page === 1 && !q ? articles.slice(1) : articles).map((article: any) => (
                <ArticleCard key={article.documentId} article={article} strapiUrl={strapiUrl} />
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {pagination.pageCount > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    p === page
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                      : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= pagination.pageCount}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Page indicator */}
        {pagination.pageCount > 1 && (
          <p className="text-center text-white/25 text-xs mt-4">
            Page {page} of {pagination.pageCount} &mdash; {pagination.total} articles total
          </p>
        )}
      </section>

      <Footer
        text={globalData?.footer?.text}
        logo={globalData?.footer?.logo}
        navItems={globalData?.footer?.navItems}
        socialLinks={globalData?.footer?.socialLinks}
      />
    </div>
  )
}

// ─── Featured large card ──────────────────────────────────────────────
function FeaturedCard({ article, strapiUrl }: { article: any; strapiUrl: string }) {
  const imageUrl = article.featuredImage?.url
    ? `${strapiUrl}${article.featuredImage.url}`
    : null
  const tag = article.contentTags?.[0]?.title
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="group relative flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-white/8 bg-white/3 hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative md:w-1/2 aspect-[16/9] md:aspect-auto overflow-hidden bg-white/5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.featuredImage?.alternativeText || article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-900/40 to-indigo-900/40 flex items-center justify-center">
            <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07070f]/60 hidden md:block" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          {tag && (
            <span className="bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          )}
          {date && <span className="text-white/30 text-xs">{date}</span>}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-violet-300 transition-colors">
          {article.title}
        </h2>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-6">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          {article.author && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold">
                {article.author.fullName?.charAt(0)}
              </div>
              <span className="text-white/40 text-xs">{article.author.fullName}</span>
            </div>
          )}
          <span className="text-violet-400 text-sm font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            Read more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Regular article card ───────────────────────────────────────────────
function ArticleCard({ article, strapiUrl }: { article: any; strapiUrl: string }) {
  const imageUrl = article.featuredImage?.url
    ? `${strapiUrl}${article.featuredImage.url}`
    : null
  const tag = article.contentTags?.[0]?.title
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-white/3 hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.featuredImage?.alternativeText || article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-900/40 to-indigo-900/40 flex items-center justify-center">
            <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          {tag && (
            <span className="bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          )}
          {date && <span className="text-white/30 text-xs">{date}</span>}
        </div>
        <h2 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
          {article.title}
        </h2>
        <p className="text-white/40 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {article.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-white/6">
          {article.author ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-[9px] font-bold">
                {article.author.fullName?.charAt(0)}
              </div>
              <span className="text-white/35 text-xs">{article.author.fullName}</span>
            </div>
          ) : <span />}
          <svg className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
