import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$slug')({  
  component: ArticlePage,
})

function ArticlePage() {
  const { slug } = Route.useParams()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Article: {slug}</p>
    </div>
  )
}
