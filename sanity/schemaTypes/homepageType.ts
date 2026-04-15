import { defineField, defineType } from 'sanity';

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'profile',
      title: 'Perfil',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({ name: 'description', title: 'Descripcion', type: 'text', rows: 3 }),
        defineField({ name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'location', title: 'Ubicacion', type: 'string' }),
      ],
    }),
    defineField({
      name: 'banners',
      title: 'Banners',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titulo', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'subtitle', title: 'Subtitulo', type: 'string' }),
            defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'buttonLabel', title: 'Texto boton', type: 'string' }),
            defineField({ name: 'buttonUrl', title: 'URL boton', type: 'url' }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'buttonLabel',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featuredLinks',
      title: 'Links principales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Texto', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required() }),
            defineField({ name: 'note', title: 'Nota', type: 'string' }),
            defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
            defineField({ name: 'featured', title: 'Destacado', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Redes sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Nombre', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required() }),
            defineField({ name: 'short', title: 'Iniciales', type: 'string', validation: (rule) => rule.required().max(3) }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'short',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta title', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3 }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Las Cositas de Sita - Homepage',
      };
    },
  },
});
