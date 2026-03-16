import { Link } from '@tanstack/react-router'
import { getStrapiMediaUrl } from '@/lib/strapi'
import type { FeaturedArticlesBlock as FeaturedArticlesBlockType } from '@/types/strapi'

interface Props {
  block: FeaturedArticlesBlockType
}

export default function FeaturedArticlesBlock({ block }: Props) {
  if (!block.articles || block.articles.length === 0) return null

  const [featured, ...rest] = block.articles

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full brand-gradient px-4 py-1.5 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-white">Blog</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Latest insights</h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid — featured large left + small right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured article */}
          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="lg:col-span-3 group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {featured.featuredImage?.url && (
                <div className="overflow-hidden aspect-[16/9]">
                  <img
                    src={getStrapiMediaUrl(featured.featuredImage.url)}
                    alt={featured.featuredImage.alternativeText ?? featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col gap-3 p-7 flex-1">
                <h3 className="font-bold text-foreground text-xl leading-snug group-hover:text-primary transition-colors">
                  {featured.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {featured.description}
                </p>
                {featured.author && (
                  <div className="mt-auto pt-4 flex items-center gap-2.5 text-xs text-muted-foreground border-t border-border">
                    <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center font-bold text-white text-[10px]">
                      {featured.author.fullName[0]}
                    </div>
                    {featured.author.fullName}
                  </div>
                )}
              </div>
            </Link>
          )}

          {/* Side articles */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((article) => (
              <Link
                key={article.id}
                to="/blog/$slug"
                params={{ slug: article.slug }}
                className="group flex gap-4 rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4"
              >
                {article.featuredImage?.url && (
                  <div className="shrink-0 w-24 h-20 rounded-xl overflow-hidden">
                    <img
                      src={getStrapiMediaUrl(article.featuredImage.url)}
                      alt={article.featuredImage.alternativeText ?? article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1.5 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{article.description}</p>
                  {article.author && (
                    <p className="text-[10px] text-muted-foreground mt-auto">{article.author.fullName}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
