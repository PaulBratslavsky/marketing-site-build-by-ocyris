import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { loadArticleBySlug, loadGlobal } from '@/data/loaders'
import { getStrapiUrl } from '@/lib/strapi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Banner from '@/components/Banner'
import type { GlobalData, StrapiLink } from '@/types/strapi'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const [article, global] = await Promise.all([
      loadArticleBySlug({ data: params.slug }),
      loadGlobal(),
    ])
    if (!article) throw notFound()
    return { article, global }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { article, global } = Route.useLoaderData()
  const globalData = global as GlobalData
  const strapiUrl = getStrapiUrl()

  const imageUrl = article.featuredImage?.url
    ? `${strapiUrl}${article.featuredImage.url}`
    : null

  const authorImageUrl = article.author?.image?.url
    ? `${strapiUrl}${article.author.image.url}`
    : null

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const readingTime = article.content
    ? Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200))
    : null

  // Derive nav labels from global data — never hardcode
  const blogNavItem: StrapiLink | undefined = (
    globalData?.header?.navItems ?? []
  ).find((n: StrapiLink) => n.href === '/blog')

  const blogNavLabel = blogNavItem?.label ?? 'Blog'

  return (
    <div className="min-h-screen bg-[#07070f] text-white">
      {globalData?.banner?.isVisible && <Banner banner={globalData.banner} />}
      <Header
        logo={globalData?.header?.logo}
        navItems={globalData?.header?.navItems}
        cta={globalData?.header?.cta}
      />

      {/* Article Hero */}
      <section className="relative pt-16 pb-0 overflow-hidden">
        {/* bg orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/15 rounded-full blur-[140px]" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link to="/" className="hover:text-white/70 transition-colors">
              {(globalData?.header?.navItems ?? []).find((n: StrapiLink) => n.href === '/')?.label ?? 'Home'}
            </Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/blog" className="hover:text-white/70 transition-colors">{blogNavLabel}</Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/60 truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Tags + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {article.contentTags?.map((tag: any) => (
              <span
                key={tag.id}
                className="bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag.title}
              </span>
            ))}
            {publishedDate && (
              <span className="text-white/35 text-sm">{publishedDate}</span>
            )}
            {readingTime && (
              <span className="flex items-center gap-1.5 text-white/35 text-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white max-w-4xl mb-6">
            {article.title}
          </h1>

          {/* Author row */}
          {article.author && (
            <div className="flex items-center gap-3 mb-10">
              {authorImageUrl ? (
                <img
                  src={authorImageUrl}
                  alt={article.author.fullName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/40"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white ring-2 ring-violet-500/40">
                  {article.author.fullName?.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-white/80">{article.author.fullName}</p>
                {article.author.bio && (
                  <p className="text-xs text-white/40">{article.author.bio}</p>
                )}
              </div>
            </div>
          )}

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/8 mb-0">
              <img
                src={imageUrl}
                alt={article.featuredImage?.alternativeText || article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070f]/60 via-transparent to-transparent" />
            </div>
          )}
        </div>
      </section>

      {/* Two-column layout */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* ── LEFT: Article Content ── */}
          <article className="flex-1 min-w-0">
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-extrabold prose-headings:text-white
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/65 prose-p:leading-relaxed prose-p:text-base
              prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white/90
              prose-code:text-violet-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              prose-blockquote:border-l-violet-500 prose-blockquote:text-white/50
              prose-ul:text-white/65 prose-ol:text-white/65
              prose-li:marker:text-violet-400
              prose-hr:border-white/10
              prose-img:rounded-xl prose-img:border prose-img:border-white/10
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Tags at bottom */}
            {article.contentTags?.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/8">
                <div className="flex flex-wrap gap-2">
                  {article.contentTags.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="bg-white/5 border border-white/10 text-white/50 text-xs font-medium px-3 py-1.5 rounded-full hover:border-violet-500/40 hover:text-violet-300 transition-colors"
                    >
                      #{tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-6 lg:sticky lg:top-24">

            {/* About the Author */}
            {article.author && (
              <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
                {/* Header bar — label derived from author fullName, no hardcoded string */}
                <div className="px-5 py-3.5 border-b border-white/8 bg-white/2">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                    {article.author.fullName}
                  </p>
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    {authorImageUrl ? (
                      <img
                        src={authorImageUrl}
                        alt={article.author.fullName}
                        className="w-14 h-14 rounded-xl object-cover ring-2 ring-violet-500/30 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xl font-black text-white flex-shrink-0">
                        {article.author.fullName?.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-white text-base leading-tight">{article.author.fullName}</p>
                      {article.author.bio && (
                        <p className="text-white/45 text-sm mt-1 leading-snug">{article.author.bio}</p>
                      )}
                    </div>
                  </div>
                  <Link
                    to="/blog"
                    search={{ q: article.author.fullName }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {`More by ${article.author.fullName?.split(' ')[0]}`}
                  </Link>
                </div>
              </div>
            )}

            {/* CTA Card */}
            <div className="relative rounded-2xl overflow-hidden border border-violet-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-indigo-900/40 to-[#07070f]" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
              <div className="relative p-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/30">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-white font-bold text-base mb-1.5 leading-snug">
                  {globalData?.header?.cta?.label
                    ? `Ready to get started?`
                    : 'Build something great'}
                </p>
                <p className="text-white/45 text-sm mb-4 leading-relaxed">
                  {globalData?.description}
                </p>
                {globalData?.header?.cta && (
                  <a
                    href={globalData.header.cta.href}
                    target={globalData.header.cta.isExternal ? '_blank' : undefined}
                    rel={globalData.header.cta.isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 w-full justify-center py-2.5 rounded-xl brand-gradient text-white text-sm font-semibold shadow-lg shadow-violet-500/20 hover:opacity-90 hover:shadow-violet-500/30 transition-all"
                  >
                    {globalData.header.cta.label}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Related Articles */}
            {article.relatedArticles?.length > 0 && (
              <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-white/8 bg-white/2">
                  {/* Label uses blog nav label from global data */}
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                    {blogNavLabel}
                  </p>
                </div>
                <div className="divide-y divide-white/6">
                  {article.relatedArticles.map((related: any) => {
                    const relatedImg = related.featuredImage?.url
                      ? `${strapiUrl}${related.featuredImage.url}`
                      : null
                    return (
                      <Link
                        key={related.documentId}
                        to="/blog/$slug"
                        params={{ slug: related.slug }}
                        className="flex items-start gap-3 p-4 hover:bg-white/3 transition-colors group"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                          {relatedImg ? (
                            <img
                              src={relatedImg}
                              alt={related.featuredImage?.alternativeText || related.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-violet-900/50 to-indigo-900/50" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white/80 leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">
                            {related.title}
                          </p>
                          {related.publishedAt && (
                            <p className="text-xs text-white/30 mt-1">
                              {new Date(related.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          )}
                        </div>
                        <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  })}
                </div>
                <div className="p-4 pt-0">
                  <Link
                    to="/blog"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all mt-3"
                  >
                    {/* Label from global header nav Blog item */}
                    {blogNavLabel}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

          </aside>
        </div>
      </section>

      {/* Back to blog bottom CTA */}
      <section className="border-t border-white/6 bg-white/2">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {blogNavLabel}
          </Link>
          {/* Share icon only — no hardcoded label */}
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
        </div>
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
