const CHANNEL_ID = 'UCzv8Or2KV7hSzXEk6FmkqUg'
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
  return m ? m[1].trim() : ''
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"[^>]*>`))
  return m ? m[1] : ''
}

export default defineEventHandler(async () => {
  const xml = await $fetch<string>(RSS_URL, { responseType: 'text' })

  // Split into <entry> blocks
  const entryPattern = /<entry>([\s\S]*?)<\/entry>/g
  const entries: ReturnType<typeof parseEntry>[] = []
  let m: RegExpExecArray | null

  while ((m = entryPattern.exec(xml)) !== null) {
    entries.push(parseEntry(m[1]))
  }

  return entries
})

function parseEntry(entry: string) {
  const videoId = extractTag(entry, 'yt:videoId')
  const title   = extractTag(entry, 'title').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  const date    = extractTag(entry, 'published')
  const desc    = extractTag(entry, 'media:description').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').slice(0, 200)
  const thumb   = extractAttr(entry, 'media:thumbnail', 'url')
    || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  return {
    id:          videoId,
    title,
    speaker:     '',
    date,
    videoUrl:    `https://www.youtube.com/watch?v=${videoId}`,
    imageUrl:    thumb,
    description: desc || null,
  }
}
