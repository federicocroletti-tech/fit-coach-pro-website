import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const COOKIE_CONSENT_KEY = 'fit-coach-pro-cookie-preferences';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cookie-consent.html'
})
export class CookieConsentComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly hasStoredPreferences = signal(false);
  protected readonly isPanelOpen = signal(false);
  protected readonly isVisible = computed(() => this.isPanelOpen() || !this.hasStoredPreferences());
  protected readonly preferencesForm = new FormGroup({
    necessary: new FormControl({ value: true, disabled: true }, { nonNullable: true }),
    analytics: new FormControl(false, { nonNullable: true }),
    marketing: new FormControl(false, { nonNullable: true })
  });

  ngOnInit(): void {
    this.loadPreferences();

    const openSettings = (): void => this.openSettings();
    window.addEventListener('fitcoach-cookie-settings', openSettings);
    this.destroyRef.onDestroy(() => window.removeEventListener('fitcoach-cookie-settings', openSettings));
  }

  protected acceptAll(): void {
    this.preferencesForm.patchValue({ analytics: true, marketing: true });
    this.savePreferences();
  }

  protected rejectOptional(): void {
    this.preferencesForm.patchValue({ analytics: false, marketing: false });
    this.savePreferences();
  }

  protected savePreferences(): void {
    const rawPreferences = this.preferencesForm.getRawValue();
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: rawPreferences.analytics,
      marketing: rawPreferences.marketing,
      updatedAt: new Date().toISOString()
    };

    this.persistPreferences(preferences);
    this.hasStoredPreferences.set(true);
    this.isPanelOpen.set(false);

    if (preferences.analytics) {
      this.allowAnalytics(preferences);
    }
  }

  protected closePanel(): void {
    this.isPanelOpen.set(false);
  }

  private openSettings(): void {
    this.isPanelOpen.set(true);
  }

  private loadPreferences(): void {
    const preferences = this.readPreferences();

    if (!preferences) {
      return;
    }

    this.preferencesForm.patchValue({
      analytics: preferences.analytics,
      marketing: preferences.marketing
    });
    this.hasStoredPreferences.set(true);

    if (preferences.analytics) {
      this.allowAnalytics(preferences);
    }
  }

  private readPreferences(): CookiePreferences | null {
    try {
      const storedPreferences = localStorage.getItem(COOKIE_CONSENT_KEY);

      if (!storedPreferences) {
        return null;
      }

      const parsedPreferences = JSON.parse(storedPreferences) as Partial<CookiePreferences>;

      return {
        necessary: true,
        analytics: parsedPreferences.analytics === true,
        marketing: parsedPreferences.marketing === true,
        updatedAt: typeof parsedPreferences.updatedAt === 'string' ? parsedPreferences.updatedAt : new Date().toISOString()
      };
    } catch {
      return null;
    }
  }

  private persistPreferences(preferences: CookiePreferences): void {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
  }

  private allowAnalytics(preferences: CookiePreferences): void {
    window.dispatchEvent(new CustomEvent('fitcoach-analytics-consent', { detail: preferences }));
  }
}
