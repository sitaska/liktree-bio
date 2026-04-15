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

export interface LinkItem {
  label: string;
  url: string;
  note: string;
  emoji?: string;
  style?: 'row' | 'banner';
  thumbnail?: string;
  ctaLabel?: string;
}

export interface LinkSection {
  title: string;
  links: LinkItem[];
}

export interface Social {
  label: string;
  url: string;
}

export interface Seo {
  title: string;
  description: string;
  favicon?: string;
}

export interface Sections {
  highlightedTitle: string;
  servicesTitle: string;
  moreLinksTitle: string;
}

export interface SiteConfig {
  profile: Profile;
  banners: Banner[];
  featuredLinks: LinkItem[];
  socials: Social[];
  seo: Seo;
  sections: LinkSection[];
}
