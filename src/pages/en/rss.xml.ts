import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

export const GET = async (context: APIContext) => {
  const posts = await getCollection('blog')
  const published = posts
    .filter((post) => !post.data.draft && post.data.lang === 'en')
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  return rss({
    title: 'Blog — Teapartydev (EN)',
    description: 'Articles and tutorials by Adal Michael García on development, systems and technology',
    site: context.site?.href ?? '',
    items: published.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/en/blog/${post.id.split('/').slice(1).join('/')}/`,
    })),
  })
}
