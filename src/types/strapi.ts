// Strapi shared types — derived from real API field names

export interface StrapiImage {
  id: number
  documentId?: string
  url: string
  alternativeText: string | null
}

export interface StrapiLink {
  id: number
  href: string
  label: string
  isExternal: boolean
  isButtonLink: boolean
  type: 'PRIMARY' | 'SECONDARY' | null
}

export interface StrapiLogoLink {
  id: number
  label: string
  href: string
  isExternal: boolean
  image: StrapiImage
}

// ─── Landing Page blocks ───────────────────────────────────────────────────────

export interface HeroBlock {
  __component: 'blocks.hero'
  id: number
  heading: string
  text: string
  links: StrapiLink[]
  image: StrapiImage
}

export interface SectionHeadingBlock {
  __component: 'blocks.section-heading'
  id: number
  subHeading?: string
  heading: string
  anchorLink?: string | null
}

export interface CardItem {
  id: number
  heading: string
  text: string
}

export interface CardGridBlock {
  __component: 'blocks.card-grid'
  id: number
  cards: CardItem[]
}

export interface ContentWithImageBlock {
  __component: 'blocks.content-with-image'
  id: number
  reversed: boolean
  heading: string
  content: string
  link?: StrapiLink | null
  image: StrapiImage
}

export interface MarkdownBlock {
  __component: 'blocks.markdown'
  id: number
  content: string
}

export interface PersonCardBlock {
  __component: 'blocks.person-card'
  id: number
  text: string
  personName: string
  personJob: string
  image: StrapiImage
}

export interface FaqItem {
  id: number
  heading: string
  text: string
}

export interface FaqsBlock {
  __component: 'blocks.faqs'
  id: number
  faq: FaqItem[]
}

export interface ArticlePreview {
  id: number
  documentId: string
  title: string
  description: string
  slug: string
  featuredImage?: StrapiImage
  author?: { fullName: string }
  publishedAt?: string
}

export interface FeaturedArticlesBlock {
  __component: 'blocks.featured-articles'
  id: number
  articles: ArticlePreview[]
}

export interface NewsletterBlock {
  __component: 'blocks.newsletter'
  id: number
  heading: string
  text: string
  placeholder: string
  label: string
}

export type LandingPageBlock =
  | HeroBlock
  | SectionHeadingBlock
  | CardGridBlock
  | ContentWithImageBlock
  | MarkdownBlock
  | PersonCardBlock
  | FaqsBlock
  | FeaturedArticlesBlock
  | NewsletterBlock
  | { __component: string; id: number }

export interface LandingPageData {
  id: number
  documentId: string
  title: string
  description: string
  blocks: LandingPageBlock[]
}

export interface LandingPageResponse {
  data: LandingPageData
  meta: Record<string, unknown>
}

// ─── Global types ─────────────────────────────────────────────────────────────

export interface GlobalBanner {
  id: number
  isVisible: boolean
  description: string
  link: StrapiLink
}

export interface GlobalHeader {
  id: number
  logo: StrapiLogoLink
  navItems: StrapiLink[]
  cta: StrapiLink
}

export interface SocialLink {
  id: number
  label: string
  href: string
  isExternal: boolean
  image: StrapiImage
}

export interface GlobalFooter {
  id: number
  text: string
  logo: StrapiLogoLink
  navItems: StrapiLink[]
  socialLinks: SocialLink[]
}

export interface GlobalData {
  id: number
  documentId: string
  title: string
  description: string
  banner: GlobalBanner
  header: GlobalHeader
  footer: GlobalFooter
}

export interface GlobalResponse {
  data: GlobalData
  meta: Record<string, unknown>
}
