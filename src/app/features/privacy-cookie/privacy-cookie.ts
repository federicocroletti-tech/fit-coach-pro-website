import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-privacy-cookie',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy-cookie.html'
})
export class PrivacyCookieComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updatePage({
      title: 'Privacy e Cookie Policy | Fit Coach Pro',
      description: 'Modello dimostrativo di informativa privacy e cookie per il sito Fit Coach Pro.',
      path: '/privacy-cookie',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy e Cookie Policy Fit Coach Pro',
        url: 'https://fitcoachpro.example/privacy-cookie'
      }
    });
  }
}
