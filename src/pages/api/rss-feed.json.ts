import type { APIRoute } from 'astro'

export interface RSSItem {
  title: string
  description: string
  link: string
  pubDate: string
  thumbnail?: string
  guid: string
}

export interface RSSFeed {
  title: string
  description: string
  link: string
  items: RSSItem[]
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
}

function extractFirstImage(html: string): string | undefined {
  const imgMatch = html.match(/<img[^>]*src="([^"]*)"[^>]*>/i)
  return imgMatch ? imgMatch[1] : undefined
}

function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

async function fetchRSSFeed(): Promise<RSSFeed> {
  const RSS_URL = 'https://note.com/caffeastore/rss/'
  
  try {
    const response = await fetch(RSS_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.status}`)
    }
    
    const xmlText = await response.text()
    
    // Extract channel info
    const titleMatch = xmlText.match(/<title>(.*?)<\/title>/)
    const descMatch = xmlText.match(/<description>(.*?)<\/description>/)
    const linkMatch = xmlText.match(/<link>(.*?)<\/link>/)
    
    const channelTitle = titleMatch ? titleMatch[1] : 'Caffè Astore Blog'
    const channelDesc = descMatch ? descMatch[1] : ''
    const channelLink = linkMatch ? linkMatch[1] : 'https://note.com/caffeastore'
    
    // Extract items
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    const items: RSSItem[] = []
    let itemMatch
    
    while ((itemMatch = itemRegex.exec(xmlText)) !== null) {
      const itemXml = itemMatch[1]
      
      const itemTitleMatch = itemXml.match(/<title>(.*?)<\/title>/)
      const itemDescMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)
      const itemLinkMatch = itemXml.match(/<link>(.*?)<\/link>/)
      const itemPubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)
      const itemGuidMatch = itemXml.match(/<guid>(.*?)<\/guid>/)
      const itemThumbnailMatch = itemXml.match(/<media:thumbnail>(.*?)<\/media:thumbnail>/)
      
      if (itemTitleMatch && itemDescMatch && itemLinkMatch && itemPubDateMatch && itemGuidMatch) {
        const rawDescription = itemDescMatch[1]
        const thumbnail = itemThumbnailMatch ? itemThumbnailMatch[1] : extractFirstImage(rawDescription)
        const cleanDescription = stripHtml(rawDescription)
        
        items.push({
          title: itemTitleMatch[1],
          description: truncateText(cleanDescription),
          link: itemLinkMatch[1],
          pubDate: itemPubDateMatch[1],
          thumbnail,
          guid: itemGuidMatch[1]
        })
      }
    }
    
    return {
      title: channelTitle,
      description: channelDesc,
      link: channelLink,
      items: items.slice(0, 3) // Show only latest 3 items
    }
    
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    
    // Return fallback data
    return {
      title: 'Caffè Astore Blog',
      description: 'Caffè Astoreからの最新情報',
      link: 'https://note.com/caffeastore',
      items: []
    }
  }
}

export const GET: APIRoute = async () => {
  try {
    const rssFeed = await fetchRSSFeed()
    
    return new Response(JSON.stringify(rssFeed), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })
  } catch (error) {
    console.error('Error in RSS feed API:', error)
    return new Response(JSON.stringify({ 
      title: 'Caffè Astore Blog',
      description: 'Caffè Astoreからの最新情報',
      link: 'https://note.com/caffeastore',
      items: [],
      error: 'Failed to load RSS feed' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}