export function getStrapiUrl(): string {
  return import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
}

export function getStrapiMediaUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${getStrapiUrl()}${url}`
}

export async function fetchStrapi<T>(path: string): Promise<T> {
  const strapiUrl = getStrapiUrl()
  const url = new URL(path, strapiUrl)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
  const res = await fetch(url.toString(), { headers })
  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}
