export const languages = {
  es: 'Español',
  en: 'English',
}

export const defaultLang = 'es'

export const showDefaultLang = false

export const routes = {
  en: {
    blog: 'blog',
    trabajos: 'trabajos',
    contacto: 'contacto',
  },
}

type Translations = Record<string, string>

export const ui: Record<keyof typeof languages, Translations> = {
  es: {
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.works': 'Trabajos',
    'nav.contact': 'Contacto',
    'nav.repo': 'Repo',
    'nav.menu': 'Menú de navegación',
    'nav.theme': 'Cambiar tema',

    'footer.copyright': '© {year} Adal Michael García',

    'home.title': 'Teapartydev — Inicio',
    'home.description': 'Portafolio personal de Adal Michael García',
    'home.eyebrow': '— Hola, soy un {role} basado en Panamá',
    'home.subtitle': 'Construyo <em>sistemas digitales</em> que respetan al operador. Herramientas de reporte, capas de datos y el tipo de software pequeño que hace a los equipos más rápidos.',
    'home.cta.work': 'Ver mi trabajo',
    'home.cta.contact': 'Contactar',
    'home.meta.role': 'ingeniero / sysadmin',
    'home.meta.since': 'desde',
    'home.meta.based': 'Chiriquí, PA',
    'home.taza.label': 'Taza de café humeante',
    'home.taza.caption': 'preparando café',
    'home.about.label': '— 01 / Sobre mí',
    'home.about.title': 'Una década manteniendo las cosas funcionando.',
    'home.about.text': 'He pasado los últimos 12+ años en las trincheras de la administración de sistemas — construyendo herramientas de reporte, capas de consulta de datos y piezas pequeñas de software que hacen a los equipos más rápidos. Me importa la confiabilidad, la claridad y las herramientas que respetan al operador.',
    'home.about.link': 'Leer mis notas →',
    'home.work.label': '— 02 / Trabajo seleccionado',
    'home.work.title': 'Proyectos recientes',
    'home.work.subtitle': 'Algunas cosas que he construido y lanzado recientemente.',
    'home.work.01.title': 'Intranet y reportes',
    'home.work.01.desc': 'Reportes de ventas, dashboards y herramientas internas para toma de decisiones rápidas.',
    'home.work.02.title': 'Plataformas web',
    'home.work.02.desc': 'Sitios web personalizados y sistemas de contenido adaptados a necesidades de pequeños negocios.',
    'home.work.03.title': 'Este portafolio',
    'home.work.03.desc': 'Un sitio estático construido con Astro + GruvBox, reemplazando un tema de WordPress.',
    'home.hobby.label': '— 03 / Cosas que me gustan',
    'home.hobby.title': 'Más allá de la terminal',
    'home.hobby.text': 'Cuando no estoy lanzando código, me encuentras trasteando con electrónica, proyectos IoT y demasiados videojuegos.',
    'home.contact.title': '¿Tienes algo en mente?',
    'home.contact.text': 'Hablemos de sistemas, herramientas o un nuevo proyecto.',
    'home.contact.cta': 'Saludar',
    'home.contact.github': 'GitHub',
    'home.contact.twitter': 'Twitter',
    'home.contact.linkedin': 'LinkedIn',

    'blog.title': 'Blog — Teapartydev',
    'blog.description': 'Artículos y tutoriales de Adal Michael García sobre desarrollo, sistemas y tecnología',
    'blog.empty': 'No hay artículos publicados todavía.',
    'blog.prev': '← Anterior',
    'blog.next': 'Siguiente →',
    'blog.tags': 'Ver todos los tags #',
    'blog.back': 'Volver al blog',
    'blog.tagged': '{count} artículo{plural} con la etiqueta',
    'blog.noTag': 'No hay artículos con esta etiqueta.',

    'works.title': 'Trabajos — Teapartydev',
    'works.description': 'Portafolio de proyectos de Adal Michael García',
    'works.empty': 'No hay proyectos publicados todavía.',
    'works.back': 'Volver a trabajos',
    'works.visit': 'Visitar proyecto',

    'contact.title': 'Contacto — Teapartydev',
    'contact.description': 'Ponte en contacto con Adal Michael García',
    'contact.text': 'Puedes encontrarme en las siguientes redes sociales o enviarme un correo electrónico.',

    'lang.es': 'Español',
    'lang.en': 'English',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.works': 'Works',
    'nav.contact': 'Contact',
    'nav.repo': 'Repo',
    'nav.menu': 'Navigation menu',
    'nav.theme': 'Toggle theme',

    'footer.copyright': '© {year} Adal Michael García',

    'home.title': 'Teapartydev — Home',
    'home.description': 'Personal portfolio of Adal Michael García',
    'home.eyebrow': '— Hello, I\'m a {role} based in Panama',
    'home.subtitle': 'I build <em>digital systems</em> that respect the operator. Reporting tools, data layers, and the kind of small software that makes teams faster.',
    'home.cta.work': 'View my work',
    'home.cta.contact': 'Get in touch',
    'home.meta.role': 'engineer / sysadmin',
    'home.meta.since': 'since',
    'home.meta.based': 'Chiriquí, PA',
    'home.taza.label': 'Steaming coffee cup',
    'home.taza.caption': 'currently brewing',
    'home.about.label': '— 01 / About',
    'home.about.title': 'A decade of keeping things running.',
    'home.about.text': 'I\'ve spent the last 12+ years in the trenches of system administration — building reporting tools, data query layers, and small pieces of software that make teams faster. I care about reliability, clarity, and tools that respect the operator.',
    'home.about.link': 'Read my notes →',
    'home.work.label': '— 02 / Selected work',
    'home.work.title': 'Recent projects',
    'home.work.subtitle': 'A few things I\'ve built and shipped recently.',
    'home.work.01.title': 'Intranet & reporting',
    'home.work.01.desc': 'Sales reporting, dashboards, and internal tools for fast decision-making.',
    'home.work.02.title': 'Web platforms',
    'home.work.02.desc': 'Custom websites and content systems tailored to small business needs.',
    'home.work.03.title': 'This portfolio',
    'home.work.03.desc': 'A static site built with Astro + GruvBox, replacing a WordPress theme.',
    'home.hobby.label': '— 03 / Things I like',
    'home.hobby.title': 'Beyond the terminal',
    'home.hobby.text': 'When I\'m not shipping code, you\'ll find me tinkering with electronics, IoT projects, and way too many video games.',
    'home.contact.title': 'Have something in mind?',
    'home.contact.text': 'Let\'s talk about systems, tools, or a new project.',
    'home.contact.cta': 'Say hello',
    'home.contact.github': 'GitHub',
    'home.contact.twitter': 'Twitter',
    'home.contact.linkedin': 'LinkedIn',

    'blog.title': 'Blog — Teapartydev',
    'blog.description': 'Articles and tutorials by Adal Michael García about development, systems and technology',
    'blog.empty': 'No articles published yet.',
    'blog.prev': '← Previous',
    'blog.next': 'Next →',
    'blog.tags': 'View all tags #',
    'blog.back': 'Back to blog',
    'blog.tagged': '{count} article{plural} tagged with',
    'blog.noTag': 'No articles with this tag.',

    'works.title': 'Works — Teapartydev',
    'works.description': 'Project portfolio by Adal Michael García',
    'works.empty': 'No projects published yet.',
    'works.back': 'Back to works',
    'works.visit': 'Visit project',

    'contact.title': 'Contact — Teapartydev',
    'contact.description': 'Get in touch with Adal Michael García',
    'contact.text': 'You can find me on the following social networks or send me an email.',

    'lang.es': 'Español',
    'lang.en': 'English',
  },
}

export type TranslationKey = string
