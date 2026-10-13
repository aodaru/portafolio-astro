import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import { blogPath, getLangFromId, getSlugFromId } from '../../i18n/content'

export const GET = async (context: APIContext) => {
  const posts = await getCollection('blog')
  // El feed es por idioma: sin este filtro publicaba los posts en español aquí.
  const published = posts
    .filter((post) => !post.data.draft && getLangFromId(post.id) === 'en')
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  return rss({
    title: 'Blog — Teapartydev (EN)',
    description: 'Articles and tutorials by Adal Michael García about development, systems and technology',
    site: context.site?.href ?? '',
    items: published.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: blogPath('en', getSlugFromId(post.id)),
    })),
  })
}
