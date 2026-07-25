import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { CookieConsentComponent } from './shared/cookie-consent/cookie-consent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CookieConsentComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly currentYear = new Date().getFullYear();

  protected openCookiePreferences(): void {
    window.dispatchEvent(new CustomEvent('fitcoach-cookie-settings'));
  }
}
