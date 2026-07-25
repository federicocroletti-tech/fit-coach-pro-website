import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export type StructuredData = Record<string, unknown> | Record<string, unknown>[];

export interface SeoPageConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  structuredData?: StructuredData;
}

const SITE_URL = 'https://fitcoachpro.example';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80';
const STRUCTURED_DATA_ID = 'fit-coach-pro-structured-data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  updatePage(config: SeoPageConfig): void {
    const canonicalUrl = new URL(config.path, SITE_URL).toString();
    const image = config.image ?? DEFAULT_IMAGE;
    const type = config.type ?? 'website';

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.updateProperty('og:type', type);
    this.updateProperty('og:site_name', 'Fit Coach Pro');
    this.updateProperty('og:title', config.title);
    this.updateProperty('og:description', config.description);
    this.updateProperty('og:url', canonicalUrl);
    this.updateProperty('og:image', image);
    this.setCanonical(canonicalUrl);
    this.setStructuredData(config.structuredData);
  }

  private updateProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(href: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }

    link.href = href;
  }

  private setStructuredData(data: StructuredData | undefined): void {
    const existing = this.document.getElementById(STRUCTURED_DATA_ID);

    if (!data) {
      existing?.remove();
      return;
    }

    const script = (existing as HTMLScriptElement | null) ?? this.document.createElement('script');
    script.id = STRUCTURED_DATA_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);

    if (!script.parentNode) {
      this.document.head.appendChild(script);
    }
  }
}
