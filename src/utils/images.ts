/**
 * Mapa de imágenes de contenido servidas desde `src/assets/`.
 *
 * Convención: el frontmatter `image` de posts/proyectos sigue usando la ruta
 * pública histórica (`/img/posts/...`, `/img/Works/...`). Los estáticos
 * (jpg/png) viven en `src/assets/` y se importan aquí: Vite los emite con
 * hash para cache-busting y expone sus dimensiones (útiles para `width` /
 * `height` y evitar CLS). Los GIF animados se quedan en `public/img/` y se
 * sirven tal cual para no perder la animación.
 *
 * Optimización (Fase 7, enmienda F1): `sharp` como devDependency permite
 * transformar vía `astro:assets` — `<Image format="webp" widths>` en
 * `ContentImage.astro` y `getImage()` aquí para `og:image`.
 */
import type { ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'
import dockerImg from '../assets/posts/docker.jpg'
import omarchyImg from '../assets/posts/omarchy.png'
import primerPostImg from '../assets/posts/primer-post.jpg'
import intranetImg from '../assets/works/Intranet1_1.png'
import webPageImg from '../assets/works/WebPage_8.png'

/** Ruta pública histórica → asset importado desde `src/assets/`. */
const assetsMap: Record<string, ImageMetadata> = {
  '/img/posts/docker.jpg': dockerImg,
  '/img/posts/omarchy.png': omarchyImg,
  '/img/posts/primer-post.jpg': primerPostImg,
  '/img/Works/Intranet1_1.png': intranetImg,
  '/img/Works/WebPage_8.png': webPageImg,
}

/** Imagen por defecto para OG/Twitter cuando la página no trae `image`. */
export const DEFAULT_OG_IMAGE = '/img/Avatar.webp'

/** Devuelve el asset importado si la ruta vive en `src/assets/`, si no `null`. */
export function resolveContentImage(image?: string): ImageMetadata | null {
  if (!image) return null
  return assetsMap[image] ?? null
}

/**
 * URL relativa lista para `og:image`:
 * - Imagen en `src/assets/` → variante WebP optimizada vía `getImage()`
 *   (`/_astro/...` + hash, 1200 px de ancho para OG).
 * - GIF u otra ruta pública → la ruta tal cual.
 * - Sin imagen → `DEFAULT_OG_IMAGE`.
 */
export async function resolveOgImagePath(image?: string): Promise<string> {
  const asset = resolveContentImage(image)
  if (asset) {
    const optimized = await getImage({ src: asset, format: 'webp', width: 1200 })
    return optimized.src
  }
  return image ?? DEFAULT_OG_IMAGE
}
