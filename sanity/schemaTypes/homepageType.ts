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
            defineField({
              name: 'style',
              title: 'Tipo visual',
              type: 'string',
              initialValue: 'row',
              options: {
                list: [
                  { title: 'Fila normal', value: 'row' },
                  { title: 'Banner', value: 'banner' },
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'thumbnail',
              title: 'Miniatura (solo banner)',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.style !== 'banner',
            }),
            defineField({
              name: 'ctaLabel',
              title: 'Texto boton (solo banner)',
              type: 'string',
              hidden: ({ parent }) => parent?.style !== 'banner',
            }),
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
      name: 'sections',
      title: 'Textos de secciones',
      type: 'object',
      fields: [
        defineField({ name: 'highlightedTitle', title: 'Título Destacado', type: 'string', initialValue: 'Destacado' }),
        defineField({ name: 'servicesTitle', title: 'Título Servicios', type: 'string', initialValue: 'Servicios' }),
        defineField({ name: 'moreLinksTitle', title: 'Título Más enlaces', type: 'string', initialValue: 'Más enlaces' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta title', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3 }),
        defineField({
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          options: { hotspot: false },
          description: 'Sube un PNG cuadrado (ideal 512x512) para usarlo como icono del navegador.',
        }),
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
