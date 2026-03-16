import { createServerFn } from '@tanstack/react-start'
import { fetchStrapi } from '@/lib/strapi'

export const loadLandingPage = createServerFn({ method: 'GET' }).handler(
  async () => {
    const res = await fetchStrapi<{ data: any }>('/api/landing-page?status=published')
    return res.data
  }
)

export const loadGlobal = createServerFn({ method: 'GET' }).handler(
  async () => {
    const res = await fetchStrapi<{ data: any }>('/api/global?status=published')
    return res.data
  }
)

export const loadPageBySlug = createServerFn({ method: 'GET' })
  .inputValidator((input: string) => input)
  .handler(async ({ data: slug }) => {
    const res = await fetchStrapi<{ data: any[] }>(
      `/api/pages?filters[slug][$eq]=${slug}&status=published`
    )
    const page = res.data?.[0]
    if (!page) throw new Error(`Page "${slug}" not found`)
    return page
  })

export const loadAuthors = createServerFn({ method: 'GET' }).handler(
  async () => {
    const res = await fetchStrapi<{ data: any[] }>('/api/authors?status=published')
    return res.data
  }
)

export const loadArticles = createServerFn({ method: 'GET' }).handler(
  async () => {
    const res = await fetchStrapi<{ data: any[] }>('/api/articles?status=published')
    return res.data
  }
)

export interface ArticlesParams {
  page: number
  pageSize: number
  search: string
}

export const loadArticlesPaginated = createServerFn({ method: 'GET' })
  .inputValidator((input: ArticlesParams) => input)
  .handler(async ({ data }) => {
    const { page, pageSize, search } = data
    const searchParam = search
      ? `&filters[$or][0][title][$containsi]=${encodeURIComponent(search)}&filters[$or][1][description][$containsi]=${encodeURIComponent(search)}`
      : ''
    const res = await fetchStrapi<{ data: any[]; meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } } }>(
      `/api/articles?status=published&pagination[page]=${page}&pagination[pageSize]=${pageSize}${searchParam}&sort=publishedAt:desc`
    )
    return {
      articles: res.data,
      pagination: res.meta.pagination,
    }
  })

export const loadArticleBySlug = createServerFn({ method: 'GET' })
  .inputValidator((input: string) => input)
  .handler(async ({ data: slug }) => {
    const res = await fetchStrapi<{ data: any[] }>(
      `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&status=published`
    )
    const article = res.data?.[0]
    if (!article) throw new Error(`Article "${slug}" not found`)
    return article
  })
