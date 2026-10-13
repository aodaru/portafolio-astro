import type { CollectionEntry } from 'astro:content'
import { formatDate, type Lang } from './utils'

export type { Lang }
export { formatDate }

export const LANGS: Lang[] = ['es', 'en']

/**
 * Detección de idioma y cadenas de UI viven en `./utils`; este módulo solo
 * sabe de colecciones de contenido (posts, proyectos).
 */
export { getLangFromUrl } from './utils'

/**
 * Los posts viven en `src/content/blog/<lang>/<slug>.md`, así que el id de la
 * colección trae el idioma como primer segmento (`es/omarchy`).
 */
export function getLangFromId(id: string): Lang {
  const [maybeLang] = id.split('/')
  return maybeLang === 'en' ? 'en' : 'es'
}

export function getSlugFromId(id: string): string {
  const segments = id.split('/')
  return segments.length > 1 ? segments.slice(1).join('/') : id
}

/** `/blog/omarchy` en español, `/en/blog/omarchy` en inglés. */
export function blogPath(lang: Lang, slug: string): string {
  return lang === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`
}

export function blogIndexPath(lang: Lang): string {
  return lang === 'en' ? '/en/blog' : '/blog'
}

export function tagPath(lang: Lang, tag: string): string {
  return lang === 'en' ? `/en/blog/tags/${tag}` : `/blog/tags/${tag}`
}

export function tagsIndexPath(lang: Lang): string {
  return lang === 'en' ? '/en/blog/tags' : '/blog/tags'
}

/** `~ 8 min` / `~ 8 min` — la unidad se mantiene igual en ambos idiomas. */
export function formatReadingTime(words: number): number {
  return Math.max(1, Math.round(words / 200))
}

export function countWords(body: string | undefined): number {
  if (!body) return 0
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

/**
 * Clave de emparejamiento de un post. `translationKey` es la fuente de verdad
 * (el slug cambia entre idiomas: `primer-post` ↔ `first-post`); si el post no
 * la declara se usa el slug como respaldo.
 */
function pairKey(post: CollectionEntry<'blog'>): string {
  return post.data.translationKey ?? getSlugFromId(post.id)
}

/** ¿Existe la traducción de este post en otro idioma? */
export function findTranslation(
  posts: CollectionEntry<'blog'>[],
  id: string
): CollectionEntry<'blog'> | undefined {
  const post = posts.find((p) => p.id === id)
  if (!post) return undefined
  const key = pairKey(post)
  return posts.find((p) => p.id !== id && pairKey(p) === key)
}

/**
 * hreflang para un post: solo incluye idiomas que realmente tienen versión, con
 * la ruta de cada versión (los slugs pueden diferir por idioma). Con un solo
 * idioma disponible queda únicamente `x-default`.
 *
 * Recibe **todos** los posts publicados, no solo los del idioma actual: si se le
 * pasa una lista ya filtrada por idioma nunca encuentra la otra versión y el
 * `<link rel="alternate">` apunta a una ruta inexistente.
 */
export function postAlternates(
  posts: CollectionEntry<'blog'>[],
  id: string,
  site: URL
): { lang: string; href: string }[] {
  const post = posts.find((p) => p.id === id)
  if (!post) return []

  const key = pairKey(post)
  const versions = posts.filter((p) => pairKey(p) === key)
  const alternates: { lang: string; href: string }[] = []

  for (const lang of LANGS) {
    const version = versions.find((p) => getLangFromId(p.id) === lang)
    if (!version) continue
    alternates.push({
      lang,
      href: new URL(blogPath(lang, getSlugFromId(version.id)), site).href,
    })
  }

  const fallback = versions.find((p) => getLangFromId(p.id) === 'es') ?? post
  alternates.push({
    lang: 'x-default',
    href: new URL(
      blogPath(getLangFromId(fallback.id), getSlugFromId(fallback.id)),
      site
    ).href,
  })
  return alternates
}
