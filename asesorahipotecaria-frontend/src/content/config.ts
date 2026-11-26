// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    name: z.string(),
    title_experiencia: z.string(),
    experiencia: z.array(z.string()),
  }),
});

const serviciosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // H1 de la página
    title: z.string(),
    // <title> (sin el sufijo " | LT Hipotecas", lo añade el Layout)
    seoTitle: z.string(),
    // meta description (~150-160 caracteres)
    description: z.string(),
    // Nombre corto para menú, pie y tarjetas
    shortName: z.string(),
    // Texto breve de la tarjeta en la home
    cardText: z.string(),
    // Entradilla bajo el H1
    intro: z.string(),
    order: z.number(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // slugs de otros servicios relacionados
    related: z.array(z.string()).default([]),
  }),
});

export const collections = {
  'about': aboutCollection,
  'servicios': serviciosCollection,
};
