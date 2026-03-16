import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/')({  
  component: BlogPage,
})

function BlogPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Blog coming soon.</p>
    </div>
  )
}
