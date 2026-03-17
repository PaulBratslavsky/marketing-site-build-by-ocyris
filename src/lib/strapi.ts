export function getStrapiUrl(): string {
  const url = import.meta.env.VITE_STRAPI_URL
  return url || 'http://localhost:1337'
}

export function getStrapiMediaUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const strapiUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  return `${strapiUrl}${path}`
}

export async function fetchStrapi<T>(path: string): Promise<T> {
  const strapiUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'
  const apiUrl = new URL(path, strapiUrl)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
  const res = await fetch(apiUrl.toString(), { headers })
  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}