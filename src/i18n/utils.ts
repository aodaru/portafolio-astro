import type { AstroGlobal } from 'astro'

export function getLangFromUrl(Astro: AstroGlobal): 'es' | 'en' {
  const path = Astro.url.pathname
  if (path.startsWith('/en/')) return 'en'
  return 'es'
}

export function useTranslations(lang: 'es' | 'en') {
  return async function t(key: string) {
    const translations: Record<string, Record<string, string>> = {
      es: {
        'nav.home': 'Inicio',
        'nav.blog': 'Blog',
        'nav.work': 'Trabajos',
        'nav.contact': 'Contacto',
        'nav.repo': 'Repo',
        'footer.built': 'Diseñado con',
      },
      en: {
        'nav.home': 'Home',
        'nav.blog': 'Blog',
        'nav.work': 'Work',
        'nav.contact': 'Contact',
        'nav.repo': 'Repo',
        'footer.built': 'Built with',
      },
    }
    return translations[lang]?.[key] ?? key
  }
}
