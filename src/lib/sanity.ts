import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SiteConfig } from './cms-types';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;
const apiVersion = import.meta.env.SANITY_API_VERSION ?? '2026-04-15';
const useCdn = String(import.meta.env.SANITY_USE_CDN ?? 'true') === 'true';
const token = import.meta.env.SANITY_API_READ_TOKEN;

const isSanityConfigured = Boolean(projectId && dataset);

const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token,
      perspective: 'published',
    })
  : null;

const imageBuilder = client ? createImageUrlBuilder(client) : null;

function imageUrl(source: unknown, fallback = '', width = 1200): string {
  if (!imageBuilder || !source) {
    return fallback;
  }

  try {
    return imageBuilder.image(source).width(width).quality(80).auto('format').url();
  } catch {
    return fallback;
  }
}

const homepageQuery = `*[_type == "homepage"][0]{
  profile,
  banners,
  featuredLinks,
  socials,
  sections,
  seo
}`;

function mapLink(link: Record<string, unknown>) {
  return {
    label: String(link.label ?? ''),
    url: String(link.url ?? ''),
    note: String(link.note ?? ''),
    emoji: link.emoji ? String(link.emoji) : undefined,
    style: link.style === 'banner' ? 'banner' : 'row',
    thumbnail: imageUrl(link.thumbnail, ''),
    ctaLabel: link.ctaLabel ? String(link.ctaLabel) : undefined,
  };
}

export async function getHomepageData(fallback: SiteConfig): Promise<SiteConfig> {
  if (!client) {
    return fallback;
  }

  try {
    const data = await client.fetch(homepageQuery);

    if (!data) {
      return fallback;
    }

    const legacyFeaturedLinks = Array.isArray(data.featuredLinks)
      ? data.featuredLinks.map((link: Record<string, unknown>) => mapLink(link))
      : fallback.featuredLinks;

    const legacyBanners = Array.isArray(data.banners)
      ? data.banners.map((banner: Record<string, unknown>) => ({
          label: String(banner.title ?? ''),
          url: String(banner.buttonUrl ?? ''),
          note: String(banner.subtitle ?? ''),
          style: 'banner' as const,
          thumbnail: imageUrl(banner.image, ''),
          ctaLabel: String(banner.buttonLabel ?? 'Ver'),
        }))
      : [];

    const hasCmsSections = Array.isArray(data.sections);
    const cmsSections = hasCmsSections
      ? data.sections
          .map((section: Record<string, unknown>) => ({
            title: String(section.title ?? '').trim() || 'Nueva sección',
            links: Array.isArray(section.links)
              ? section.links
                  .map((link: Record<string, unknown>) => mapLink(link))
                  .filter((link: { label: string; url: string }) => Boolean(link.label) && Boolean(link.url))
              : [],
          }))
      : [];

    const legacyBannerLinks = [...legacyBanners, ...legacyFeaturedLinks.filter((link: { style?: string }) => link.style === 'banner')];
    const legacyRowLinks = legacyFeaturedLinks.filter((link: { style?: string }) => link.style !== 'banner');
    const fallbackLegacySections = [
      { title: 'Destacado', links: legacyBannerLinks },
      { title: 'Servicios', links: legacyRowLinks.filter((link: { note?: string }) => /servicio|reserva|sesion/i.test(link.note ?? '')) },
      { title: 'Más enlaces', links: legacyRowLinks.filter((link: { note?: string }) => !/servicio|reserva|sesion/i.test(link.note ?? '')) },
    ].filter((section) => section.links.length > 0);

    return {
      profile: {
        name: data.profile?.name ?? fallback.profile.name,
        tagline: data.profile?.tagline ?? fallback.profile.tagline,
        description: data.profile?.description ?? fallback.profile.description,
        avatar: imageUrl(data.profile?.avatar, fallback.profile.avatar),
        location: data.profile?.location ?? fallback.profile.location,
      },
      banners: Array.isArray(data.banners)
        ? data.banners.map((banner: Record<string, unknown>) => ({
            title: String(banner.title ?? ''),
            subtitle: String(banner.subtitle ?? ''),
            image: imageUrl(banner.image, ''),
            buttonLabel: String(banner.buttonLabel ?? ''),
            buttonUrl: String(banner.buttonUrl ?? ''),
          }))
        : fallback.banners,
      featuredLinks: legacyFeaturedLinks,
      socials: Array.isArray(data.socials)
        ? data.socials.map((social: Record<string, unknown>) => ({
            label: String(social.label ?? ''),
            url: String(social.url ?? ''),
          }))
        : fallback.socials,
      seo: {
        title: data.seo?.title ?? fallback.seo.title,
        description: data.seo?.description ?? fallback.seo.description,
        favicon: imageUrl(data.seo?.favicon, fallback.seo.favicon ?? '/favicon.svg', 96),
      },
      sections: hasCmsSections
        ? cmsSections
        : fallbackLegacySections.length > 0
          ? fallbackLegacySections
          : fallback.sections,
    };
  } catch {
    return fallback;
  }
}

export { isSanityConfigured };
