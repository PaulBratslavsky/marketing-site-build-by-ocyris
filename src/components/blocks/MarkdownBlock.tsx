import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { MarkdownBlock as MarkdownBlockType } from '@/types/strapi'

interface Props {
  block: MarkdownBlockType
}

export default function MarkdownBlock({ block }: Props) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert prose-headings:font-extrabold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {block.content}
        </ReactMarkdown>
      </div>
    </section>
  )
}
