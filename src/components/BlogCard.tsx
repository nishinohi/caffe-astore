import type { RSSItem } from '../pages/api/rss-feed.json'

interface BlogCardProps {
  item: RSSItem
  index: number
  isVisible: boolean
}

export default function BlogCard({ item, index, isVisible }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  }

  return (
    <article
      className={`group transform overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } relative`}
      style={{
        transitionDelay: `${600 + index * 100}ms`,
      }}
    >
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`記事「${item.title}」を読む`}
      >
        <span className="sr-only">記事を読む</span>
      </a>
      {/* サムネイル画像 */}
      {item.thumbnail && (
        <div className="aspect-video overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* コンテンツ */}
      <div className="space-y-1 px-4 py-3 pb-4 md:space-y-2 md:px-6 md:py-4 md:pb-5">
        <h3
          className="overflow-hidden text-sm font-medium transition-colors md:text-base"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {item.title}
        </h3>
        <time className="text-muted-foreground block text-xs md:text-sm">{formatDate(item.pubDate)}</time>
      </div>
    </article>
  )
}
