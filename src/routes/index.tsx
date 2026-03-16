import { createFileRoute } from '@tanstack/react-router'
import { loadLandingPage, loadGlobal } from '@/data/loaders'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlockRenderer from '@/components/BlockRenderer'

export const Route = createFileRoute('/')(
  {
    loader: async () => {
      const [landingPage, global] = await Promise.all([
        loadLandingPage(),
        loadGlobal(),
      ])
      return { landingPage, global }
    },
    component: HomePage,
    errorComponent: HomeError,
  }
)

function HomePage() {
  const { landingPage, global } = Route.useLoaderData()
  const { banner, header, footer } = global
  const blocks = landingPage.blocks

  return (
    <div className="flex flex-col min-h-screen">
      <Banner banner={banner} />
      <Header
        logo={header.logo}
        navItems={header.navItems}
        cta={header.cta}
      />
      <main className="flex-1">
        <BlockRenderer blocks={blocks} />
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

function HomeError({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred.'

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center space-y-2">
        <p className="text-red-600 font-semibold text-lg">{message}</p>
      </div>
    </div>
  )
}
