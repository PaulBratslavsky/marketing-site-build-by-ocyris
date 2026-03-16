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
