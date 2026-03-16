import { Link } from '@tanstack/react-router'
import { getStrapiMediaUrl } from '@/lib/strapi'

interface FooterProps {
  text?: string
  logo: {
    label: string
    href: string
    image?: { url: string; alternativeText: string | null }
  }
  navItems: Array<{ id: number; href: string; label: string; isExternal: boolean }>
  socialLinks?: Array<{
    id: number
    label: string
    href: string
    isExternal: boolean
    image?: { url: string; alternativeText: string | null }
  }>
}

export default function Footer({ text, logo, navItems, socialLinks }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-foreground text-background">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full brand-gradient opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 items-start">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to={logo.href as '/'} className="flex items-center gap-2.5">
              {logo.image?.url && (
                <div className="flex items-center justify-center w-8 h-8 rounded-lg brand-gradient shadow-md">
                  <img
                    src={getStrapiMediaUrl(logo.image.url)}
                    alt={logo.image.alternativeText ?? logo.label}
                    className="h-5 w-auto brightness-200"
                  />
                </div>
              )}
              <span className="font-bold text-background">{logo.label}</span>
            </Link>
          </div>

          {/* Nav */}
          {navItems && navItems.length > 0 && (
            <nav className="flex flex-col gap-3">
              {navItems.map((item) =>
                item.isExternal ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-background/60 hover:text-background transition-colors w-fit"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    to={item.href as '/'}
                    className="text-sm text-background/60 hover:text-background transition-colors w-fit"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          )}

          {/* Social */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all hover:scale-105"
                  >
                    {s.image?.url ? (
                      <img
                        src={getStrapiMediaUrl(s.image.url)}
                        alt={s.label}
                        className="h-4 w-4 object-contain brightness-200"
                      />
                    ) : (
                      <span className="text-xs font-bold text-background">{s.label[0]}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} {logo.label}{text ? `. ${text}` : ''}
          </p>
        </div>
      </div>
    </footer>
  )
}
