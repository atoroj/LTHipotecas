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

export const collections = {
  'about': aboutCollection,
};