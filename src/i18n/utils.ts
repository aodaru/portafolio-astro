import { ui, defaultLang, routes } from './ui'

export type Lang = keyof typeof ui

export function getLangFromUrl(url: URL): Lang {
  // Verificar pathname para rutas con prefijo /es/ y /en/
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as Lang
  
  return defaultLang
}

export function useTranslations(lang: Lang) {
  return function t(key: string, params?: Record<string, string | number>): string {
    const dict: Record<string, string> = ui[lang]
    const fallback: Record<string, string> = ui[defaultLang]
    const value: string = dict[key] ?? fallback[key] ?? key
    if (!params) return value
    return Object.entries(params).reduce<string>((str, [k, v]) => str.replaceAll(`{${k}}`, String(v)), value)
  }
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: Lang = lang) {
    const pathName = path.replace(/^\//, '').replace(/\/$/, '')
    const routeMap: Record<string, string> | undefined =
      l !== defaultLang && l in routes ? routes[l as keyof typeof routes] : undefined
    const translatedPath = routeMap && pathName in routeMap ? `/${routeMap[pathName]}` : path

    // Agregar prefijo de idioma si no es el default
    if (l !== defaultLang) {
      return `/${l}${translatedPath}`
    }
    return translatedPath || '/'
  }
}

export function formatDate(date: Date, lang: Lang): string {
  const locale = lang === 'es' ? 'es-ES' : 'en-US'
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getPathWithoutLang(pathname: string): string {
  const stripped = pathname.replace(/^\/(es|en)(?=\/|$)/, '')
  return stripped === '' ? '/' : stripped
}

export function getAlternateUrls(url: URL): { es: string; en: string } {
  const path = getPathWithoutLang(url.pathname)
  return {
    es: useTranslatedPath('es')(path, 'es'),
    en: useTranslatedPath('en')(path, 'en'),
  }
}
