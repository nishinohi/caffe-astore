import { useEffect, useRef, useState } from 'react'
import type { RSSFeed, RSSItem } from '../pages/api/rss-feed.json'
import BlogCard from './BlogCard'

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false)
  const [rssFeed, setRssFeed] = useState<RSSFeed | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px',
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch('/caffe-astore/api/rss-feed.json')
        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed')
        }
        const data = await response.json()
        setRssFeed(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchRSS()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* セクションタイトル */}
        <div
          className={`transform text-center transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <h2 className="font-josefin mb-10 text-3xl md:mb-16 md:text-4xl">Blog</h2>
        </div>

        {/* コンテンツ */}
        <div
          className={`transform transition-all delay-300 duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-stone-600">読み込み中...</div>
            </div>
          )}

          {error && (
            <div className="py-20 text-center">
              <p className="mb-4 text-stone-600">ブログの読み込みに失敗しました</p>
              <a
                href="https://note.com/caffeastore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-emerald-700 px-6 py-3 text-white transition-colors hover:bg-emerald-800"
              >
                noteで直接読む
              </a>
            </div>
          )}

          {rssFeed && rssFeed.items.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rssFeed.items.map((item: RSSItem, index: number) => (
                <BlogCard key={item.guid} item={item} index={index} isVisible={isVisible} />
              ))}
            </div>
          )}

          {rssFeed && rssFeed.items.length === 0 && !loading && !error && (
            <div className="py-20 text-center">
              <p className="mb-4 text-stone-600">現在、新しい記事はありません</p>
              <a
                href="https://note.com/caffeastore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-emerald-700 px-6 py-3 text-white transition-colors hover:bg-emerald-800"
              >
                noteをチェックする
              </a>
            </div>
          )}

          {/* More Blogs リンク */}
          {rssFeed && rssFeed.items.length > 0 && (
            <div
              className={`mt-16 transform text-center transition-all delay-1000 duration-1000 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <a
                href="https://note.com/caffeastore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-b border-neutral-400 pb-1 text-lg transition-colors hover:border-neutral-800"
              >
                Read more
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
