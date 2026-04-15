import type { SiteConfig } from '../lib/cms-types';

export const siteConfig: SiteConfig = {
  profile: {
    name: 'Las Cositas de Sita',
    tagline: 'Diseño digital y automatizaciones',
    description:
      'Un espacio para compartir recursos bonitos y utiles sobre diseño digital, automatizaciones y productividad.',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=420&q=80',
    location: 'Spain',
  },
  banners: [
    {
      title: 'Guia Gratuita de Yoga Prenatal',
      subtitle: 'Descarga gratis una rutina suave para casa.',
      image:
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      buttonLabel: 'Quiero la guia',
      buttonUrl: 'https://example.com/guia-prenatal',
    },
    {
      title: 'Tienda de Las Cositas de Sita',
      subtitle: 'Descubre productos seleccionados con amor.',
      image:
        'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80',
      buttonLabel: 'Ir a la tienda',
      buttonUrl: 'https://example.com/tienda',
    },
  ],
  featuredLinks: [
    {
      label: 'Reserva una sesion',
      url: 'https://example.com/reserva',
      note: 'Plazas semanales limitadas',
      emoji: '🧘',
      style: 'row',
    },
    {
      label: 'Canal de YouTube',
      url: 'https://youtube.com',
      note: 'Practicas y consejos',
      emoji: '▶️',
      style: 'banner',
      thumbnail:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      ctaLabel: 'Ver ahora',
    },
    {
      label: 'Instagram',
      url: 'https://instagram.com',
      note: 'Dia a dia y novedades',
      emoji: '📸',
      style: 'row',
    },
    {
      label: 'Podcast',
      url: 'https://spotify.com',
      note: 'Episodios semanales',
      emoji: '🎙️',
      style: 'row',
    },
  ],
  socials: [
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'TikTok', url: 'https://tiktok.com' },
    { label: 'Pinterest', url: 'https://pinterest.com' },
    { label: 'Email', url: 'mailto:hola@lascositasdesita.com' },
  ],
  seo: {
    title: 'Las Cositas de Sita | Todos mis enlaces',
    description:
      'Landing tipo Linktree de Las Cositas de Sita para centralizar redes, recursos, tienda y contacto.',
    favicon: '/favicon.svg',
  },
  sections: [
    {
      title: 'Destacado',
      links: [
        {
          label: 'Canal de YouTube',
          url: 'https://youtube.com',
          note: 'Practicas y consejos',
          style: 'banner',
          thumbnail:
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
          ctaLabel: 'Ver ahora',
        },
      ],
    },
    {
      title: 'Servicios',
      links: [
        {
          label: 'Reserva una sesion',
          url: 'https://example.com/reserva',
          note: 'Plazas semanales limitadas',
          emoji: '🧘',
          style: 'row',
        },
      ],
    },
    {
      title: 'Más enlaces',
      links: [
        {
          label: 'Instagram',
          url: 'https://instagram.com',
          note: 'Dia a dia y novedades',
          emoji: '📸',
          style: 'row',
        },
        {
          label: 'Podcast',
          url: 'https://spotify.com',
          note: 'Episodios semanales',
          emoji: '🎙️',
          style: 'row',
        },
      ],
    },
  ],
};
