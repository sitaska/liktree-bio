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
      name: 'sections',
      title: 'Secciones de enlaces',
      type: 'array',
      description:
        'Pulsa "Add item" para crear una nueva sección. En cada sección puedes cambiar el título y añadir sus propios enlaces.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Nombre de la sección', type: 'string', validation: (rule) => rule.required() }),
            defineField({
              name: 'links',
              title: 'Enlaces de la sección',
              type: 'array',
              description: 'Añade aquí los enlaces que pertenecen a esta sección.',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Texto', type: 'string', validation: (rule) => rule.required() }),
                    defineField({ name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required() }),
                    defineField({ name: 'note', title: 'Nota', type: 'string' }),
                    defineField({ name: 'emoji', title: 'Emoji (solo fila normal)', type: 'string' }),
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
                      media: 'thumbnail',
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'links.0.label',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: subtitle ? `Primer enlace: ${subtitle}` : 'Sin enlaces',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featuredLinks',
      title: 'Links principales (legacy)',
      type: 'array',
      hidden: true,
      readOnly: true,
      description: 'Campo legado conservado para compatibilidad con datos antiguos.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Texto', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'note', title: 'Nota', type: 'string' }),
            defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
            defineField({ name: 'featured', title: 'Destacado', type: 'boolean' }),
            defineField({ name: 'style', title: 'Tipo visual', type: 'string' }),
            defineField({ name: 'thumbnail', title: 'Miniatura', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'ctaLabel', title: 'Texto boton', type: 'string' }),
          ],
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
