import type { LandingPageBlock, HeroBlock, SectionHeadingBlock, CardGridBlock, ContentWithImageBlock, MarkdownBlock, PersonCardBlock, FaqsBlock, FeaturedArticlesBlock, NewsletterBlock } from '@/types/strapi'
import HeroBlockComponent from '@/components/blocks/HeroBlock'
import SectionHeadingBlockComponent from '@/components/blocks/SectionHeadingBlock'
import CardGridBlockComponent from '@/components/blocks/CardGridBlock'
import ContentWithImageBlockComponent from '@/components/blocks/ContentWithImageBlock'
import MarkdownBlockComponent from '@/components/blocks/MarkdownBlock'
import PersonCardBlockComponent from '@/components/blocks/PersonCardBlock'
import FaqsBlockComponent from '@/components/blocks/FaqsBlock'
import FeaturedArticlesBlockComponent from '@/components/blocks/FeaturedArticlesBlock'
import NewsletterBlockComponent from '@/components/blocks/NewsletterBlock'

interface BlockRendererProps {
  blocks: LandingPageBlock[]
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case 'blocks.hero':
            return <HeroBlockComponent key={block.id} block={block as HeroBlock} />
          case 'blocks.section-heading':
            return <SectionHeadingBlockComponent key={block.id} block={block as SectionHeadingBlock} />
          case 'blocks.card-grid':
            return <CardGridBlockComponent key={block.id} block={block as CardGridBlock} />
          case 'blocks.content-with-image':
            return <ContentWithImageBlockComponent key={block.id} block={block as ContentWithImageBlock} />
          case 'blocks.markdown':
            return <MarkdownBlockComponent key={block.id} block={block as MarkdownBlock} />
          case 'blocks.person-card':
            return <PersonCardBlockComponent key={block.id} block={block as PersonCardBlock} />
          case 'blocks.faqs':
            return <FaqsBlockComponent key={block.id} block={block as FaqsBlock} />
          case 'blocks.featured-articles':
            return <FeaturedArticlesBlockComponent key={block.id} block={block as FeaturedArticlesBlock} />
          case 'blocks.newsletter':
            return <NewsletterBlockComponent key={block.id} block={block as NewsletterBlock} />
          default:
            return null
        }
      })}
    </>
  )
}
