import { getStrapiMediaUrl } from '@/lib/strapi'

interface Link {
  id: number
  href: string
  label: string
  isExternal: boolean
  isButtonLink: boolean
  type?: string | null
}

interface HeroProps {
  heading: string
  text?: string
  links?: Link[]
  image?: { url: string; alternativeText: string | null }
}

export default function HeroSection({ heading, text, links, image }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            {text && (
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                {text}
              </p>
            )}
            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className={
                      link.type === 'PRIMARY'
                        ? 'rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg'
                        : 'rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted'
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Hero image */}
          {image?.url && (
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl" />
              <img
                src={getStrapiMediaUrl(image.url)}
                alt={image.alternativeText ?? heading}
                className="relative w-full rounded-2xl object-cover shadow-2xl"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
