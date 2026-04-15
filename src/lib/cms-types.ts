export interface Profile {
  name: string;
  tagline: string;
  description: string;
  avatar: string;
  location: string;
}

export interface Banner {
  title: string;
  subtitle: string;
  image: string;
  buttonLabel: string;
  buttonUrl: string;
}

export interface FeaturedLink {
  label: string;
  url: string;
  note: string;
  emoji?: string;
  featured?: boolean;
}

export interface Social {
  label: string;
  url: string;
  short: string;
}

export interface Seo {
  title: string;
  description: string;
}

export interface SiteConfig {
  profile: Profile;
  banners: Banner[];
  featuredLinks: FeaturedLink[];
  socials: Social[];
  seo: Seo;
}
