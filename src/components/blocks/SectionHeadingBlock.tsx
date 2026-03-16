import type { SectionHeadingBlock as SectionHeadingBlockType } from '@/types/strapi'

interface Props {
  block: SectionHeadingBlockType
}

export default function SectionHeadingBlock({ block }: Props) {
  return (
    <div
      id={block.anchorLink ?? undefined}
      className="text-center max-w-2xl mx-auto px-6 pt-20 pb-4"
    >
      {block.subHeading && (
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {block.subHeading}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
        {block.heading}
      </h2>
    </div>
  )
}
