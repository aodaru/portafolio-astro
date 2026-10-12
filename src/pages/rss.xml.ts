import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import { blogPath, getLangFromId, getSlugFromId } from '../i18n/content'

export const GET = async (context: APIContext) => {
  const posts = await getCollection('blog')
  const published = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  return rss({
    title: 'Blog — Teapartydev',
    description: 'Artículos y tutoriales de Adal Michael García sobre desarrollo, sistemas y tecnología',
    site: context.site?.href ?? '',
    items: published.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: blogPath(getLangFromId(post.id), getSlugFromId(post.id)),
    })),
  })
}
