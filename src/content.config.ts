import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    author: z.string().default('Adal Michael García'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    /** Enlace al proyecto desplegado. Vacío u omitido si no es público. */
    url: z.string().default(''),
    /** Enlace al repositorio público. Vacío u omitido si es privado. */
    repo: z.string().default(''),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog, projects }
