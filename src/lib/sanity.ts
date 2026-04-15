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

function imageUrl(source: unknown, fallback = ''): string {
  if (!imageBuilder || !source) {
    return fallback;
  }

  try {
    return imageBuilder.image(source).width(1200).quality(80).auto('format').url();
  } catch {
    return fallback;
  }
}

const homepageQuery = `*[_type == "homepage"][0]{
  profile,
  banners,
  featuredLinks,
  socials,
  seo
}`;

export async function getHomepageData(fallback: SiteConfig): Promise<SiteConfig> {
  if (!client) {
    return fallback;
  }

  try {
    const data = await client.fetch(homepageQuery);

    if (!data) {
      return fallback;
    }

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
      featuredLinks: Array.isArray(data.featuredLinks)
        ? data.featuredLinks.map((link: Record<string, unknown>) => ({
            label: String(link.label ?? ''),
            url: String(link.url ?? ''),
            note: String(link.note ?? ''),
            emoji: link.emoji ? String(link.emoji) : undefined,
            featured: Boolean(link.featured),
          }))
        : fallback.featuredLinks,
      socials: Array.isArray(data.socials)
        ? data.socials.map((social: Record<string, unknown>) => ({
            label: String(social.label ?? ''),
            url: String(social.url ?? ''),
            short: String(social.short ?? ''),
          }))
        : fallback.socials,
      seo: {
        title: data.seo?.title ?? fallback.seo.title,
        description: data.seo?.description ?? fallback.seo.description,
      },
    };
  } catch {
    return fallback;
  }
}

export { isSanityConfigured };
