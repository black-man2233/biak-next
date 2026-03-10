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
function decode(s: string) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
}

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const xml = await $fetch<string>(RSS_URL, { responseType: 'text' })

  const entryPattern = /<entry>([\s\S]*?)<\/entry>/g
  const entries: { videoId: string; title: string; date: Date; videoUrl: string; imageUrl: string; description: string }[] = []
  let m: RegExpExecArray | null

  while ((m = entryPattern.exec(xml)) !== null) {
    const e = m[1]
    const videoId = extractTag(e, 'yt:videoId')
    if (!videoId) continue
    entries.push({
      videoId,
      title:       decode(extractTag(e, 'title')),
      date:        new Date(extractTag(e, 'published')),
      videoUrl:    `https://www.youtube.com/watch?v=${videoId}`,
      imageUrl:    extractAttr(e, 'media:thumbnail', 'url') || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      description: decode(extractTag(e, 'media:description')).slice(0, 400),
    })
  }

  // Upsert — skip already-imported videos by videoUrl
  let imported = 0
  for (const v of entries) {
    const exists = await prisma.sermon.findFirst({ where: { videoUrl: v.videoUrl } })
    if (exists) continue
    await prisma.sermon.create({
      data: {
        title:       v.title,
        speaker:     '',
        date:        v.date,
        videoUrl:    v.videoUrl,
        imageUrl:    v.imageUrl,
        description: v.description || null,
      },
    })
    imported++
  }

  return { imported, total: entries.length }
})
