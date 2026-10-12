import type { CollectionEntry } from 'astro:content'
import type { AstroGlobal } from 'astro'

export type Lang = 'es' | 'en'

export const LANGS: Lang[] = ['es', 'en']

const LOCALES: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-US',
}

/** El español vive en la raíz y el inglés bajo `/en/`. */
export function getLangFromUrl(Astro: AstroGlobal): Lang {
  return Astro.url.pathname.startsWith('/en/') ? 'en' : 'es'
}

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

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(LOCALES[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
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

/** ¿Existe la traducción de este post en otro idioma? */
export function findTranslation(
  posts: CollectionEntry<'blog'>[],
  id: string
): CollectionEntry<'blog'> | undefined {
  const slug = getSlugFromId(id)
  return posts.find((post) => getSlugFromId(post.id) === slug && post.id !== id)
}

/**
 * hreflang para un post: solo incluye idiomas que realmente tienen versión.
 * Con un solo idioma disponible queda únicamente `x-default`.
 */
export function postAlternates(
  posts: CollectionEntry<'blog'>[],
  id: string,
  site: URL
): { lang: string; href: string }[] {
  const slug = getSlugFromId(id)
  const langs = LANGS.filter((lang) =>
    posts.some((post) => getSlugFromId(post.id) === slug && getLangFromId(post.id) === lang)
  )
  const alternates: { lang: string; href: string }[] = langs.map((lang) => ({
    lang,
    href: new URL(blogPath(lang, slug), site).href,
  }))
  alternates.push({
    lang: 'x-default',
    href: new URL(blogPath('es', slug), site).href,
  })
  return alternates
}
